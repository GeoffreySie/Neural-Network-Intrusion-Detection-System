from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
from lstm_model import LSTMModel
import os
import logging
import pandas as pd
from io import StringIO
from sklearn.preprocessing import StandardScaler

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

input_size = 53
hidden_size = 128
output_size = 33

# Get current directory and construct model path
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, "model.pth")

# Setup device (GPU if available, otherwise CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model (map storages to device)
model = LSTMModel(input_size, hidden_size, output_size)
model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only CSV files are accepted.")
    
    try:
        # Read CSV file content
        contents = await file.read()
        s = StringIO(contents.decode("utf-8"))
        df = pd.read_csv(s)

        if df.shape[1] != input_size:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid number of features. Expected {input_size}, got {df.shape[1]}"
            )

        # Scale the data
        scaler = StandardScaler()
        df_scaled = scaler.fit_transform(df)
        
        # Convert DataFrame to tensor and adjust dimensions
        tensor = torch.tensor(df_scaled, dtype=torch.float32).to(device)
        tensor = tensor.unsqueeze(1)
        
        # Get model outputs
        with torch.no_grad():
            outputs = model(tensor)
        
        # Get predictions using argmax (for multi-class classification)
        predictions = torch.argmax(outputs, dim=1).cpu().numpy()
        
        # Add predicted label as a new column to the DataFrame
        df["predicted_label"] = predictions
        
        # Define true positive events as those with a predicted label not equal to 0
        true_positive_mask = predictions != 0
        true_positive_events = df[true_positive_mask]
        
        # Prepare summary data (count of true positive events)
        summary = [{
            "Metric": "Number of True Positive Events",
            "Value": int(true_positive_events.shape[0])
        }]
        
        # Return a JSON object with both summary and detailed event records
        return {
            "summary": summary,
            "data": true_positive_events.to_dict(orient="records")
        }
    except Exception as e:
        logging.error("Prediction error: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

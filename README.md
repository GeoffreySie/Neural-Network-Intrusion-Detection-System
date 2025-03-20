<video src='https://youtu.be/zbGTn8hbrNc' width=180>

## Inspiration
As cyber threats continue to evolve at a rapid pace, traditional rule-based intrusion detection systems struggle to keep up. A 2021 study in the journal Cybersecurity (Khraisat et al., 2021) concluded that signature-based IDS (rule-based) fail to detect 68% of sophisticated attacks (e.g., APTs, encrypted threats). This creates a growing issue and cybersecurity, thus smarter detection systems are needed.

## What it does
The web application receives network data in CSV format inputted by the user, which is sent over to the backend API that hosts a pre-trained Long Short Term Memory LSTM model. The model returns a list of all threats detected within the network data, which is then displayed on a table in the frontend.

## How we built it
The dataset was first preprocessed and cleaned. The dataset was split in a 4:1 ratio for training and testing, which is then sent to a custom LSTM neural network model trained on PyTorch. The model is saved and loaded into our FastAPI backend, which which included the same preprocessing steps as before to ensure accuracy. This is then connected to the Next.js file through the API, which then displays the data on a table, utilizing ShadCn UI's table component.

## Challenges we ran into
The model was trained on a very large dataset, thus additional measures to prevent over-fitting could have been used. The size of the model also proved to be quite a challenge as significant GPU and memory resources we're required, making training take very slow (up to several hours). This severely limited our ability to fine-tune the model's parameters.

## Accomplishments that we're proud of
Being above to achieve an accuracy of 98% based off the limited resources we had in training the model. This goes to show the power of the LSTM model on time-series data, as well as its potential in the cybersecurity field.

## What we learned
We utilized a range of technologies that we never used before, namely the LSTM model and integrating it into a FastAPI backend. Although the whole application's concept is simple, there were many factors that came into play when loading the model and ensuring accurate results.

## What's next for NNIDS - Neural Network Intrusion Detection System
Potentially to integrate with external systems such as SIEMs to provide real-time threat detection, as well as further improvements to the model or explore other models that could potentially work better with network data.

## Citations
Iman Sharafaldin, Arash Habibi Lashkari, and Ali A. Ghorbani, “Toward Generating a New Intrusion Detection Dataset and Intrusion Traffic Characterization”, 4th International Conference on Information Systems Security and Privacy (ICISSP), Portugal, January 2018.

Iman Sharafaldin, Arash Habibi Lashkari, Saqib Hakak, and Ali A. Ghorbani, "Developing Realistic Distributed Denial of Service (DDoS) Attack Dataset and Taxonomy", IEEE 53rd International Carnahan Conference on Security Technology, Chennai, India, 2019.

# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.11-slim

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install distutils and build tools (gcc, g++, build-essential)
RUN apt-get update && apt-get install -y python3-distutils gcc g++ build-essential
# Upgrade pip and downgrade setuptools to avoid pkgutil.ImpImporter error
RUN pip install --upgrade pip && pip install setuptools==65.5.1
COPY requirements.txt .
RUN python -m pip install -r requirements.txt
RUN pip install gunicorn

WORKDIR /app
COPY . /app

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
RUN pip install gunicorn uvicorn
CMD ["gunicorn", "main:app", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]

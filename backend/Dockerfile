# backend/Dockerfile
FROM python:3.9-slim

# Install dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc

WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY app.py app.py
CMD ["python", "app.py"]
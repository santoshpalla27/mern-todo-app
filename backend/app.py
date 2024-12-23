# backend/app.py
from flask import Flask, jsonify
import mysql.connector
import os

app = Flask(__name__)

@app.route('/data')
def get_data():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DATABASE_HOST", "database"),  # Use service name 'database'
            user=os.getenv("DATABASE_USER", "root"),
            password=os.getenv("DATABASE_PASSWORD", "rootpassword"),
            database=os.getenv("DATABASE_NAME", "myapp")
        )
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sample_data")
        rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    # Flask listens on all network interfaces (0.0.0.0) within the Docker container
    app.run(host='0.0.0.0', port=5000)

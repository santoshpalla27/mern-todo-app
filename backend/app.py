from flask import Flask, jsonify
import psycopg2
import os

app = Flask(__name__)

def get_data():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv('POSTGRES_DB', 'mydb'),
            user=os.getenv('POSTGRES_USER', 'user'),
            password=os.getenv('POSTGRES_PASSWORD', 'password'),
            host=os.getenv('POSTGRES_HOST', 'db')
        )
        cur = conn.cursor()
        cur.execute('SELECT * FROM mytable')
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return rows
    except Exception as e:
        print(f"Error: {e}")
        return []

@app.route('/data')
def data():
    return jsonify(get_data())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
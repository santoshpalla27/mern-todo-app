# backend/app.py
from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

def get_data():
    conn = psycopg2.connect(
        dbname='mydb',
        user='user',
        password='password',
        host='db'
    )
    cur = conn.cursor()
    cur.execute('SELECT * FROM mytable')
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

@app.route('/data')
def data():
    return jsonify(get_data())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/<sentence>')
def hello(sentence):
    return jsonify({"text": 'Hello! This is your sentence: ' + sentence + '.'})

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from langchain_community.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain_openai import OpenAI

from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('API_KEY')
api_key2 = os.getenv('API_ORG')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


myclient = OpenAI(api_key = api_key, organization=api_key2)

db = SQLDatabase.from_uri("sqlite:///employee_data.db")
llm = OpenAI(temperature=0, verbose=True, openai_api_key=api_key)
db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)


@app.route('/<sentence>')
def hello(sentence):
    result = db_chain.run(sentence)
    return jsonify({"text": result})

if __name__ == '__main__':
    app.run(debug=True)
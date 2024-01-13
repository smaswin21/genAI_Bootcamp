"use client";
import styles from "./chat.css";
import FormSection from "../components/FormSection";
import AnswerSection from "../components/AnswerSection";

import { useState } from "react";

function getData(prompt) {
  return fetch("http://127.0.0.1:5000/" + prompt, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      // You can add other headers if needed
    }
  })
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      return data;
    });
}

export default function Home() {
  const [storedValues, setStoredValues] = useState([]);

  const generateResponse = async (newQuestion, setNewQuestion) => {
    if (newQuestion) {
      let response = await getData(newQuestion);

      if (response.text) {
        console.log(response.text);
        setStoredValues([
          {
            question: newQuestion,
            answer: response.text,
          },
          ...storedValues,
        ]);
        setNewQuestion("");
      }
    }
  };

  return (
    <div>
      <div className="header-section">
        <header className="header">
          <h1>Const-Assist Dashboard</h1>
        </header>
      </div>

      <section className="dashboard">
        <h2>Project Dashboard</h2>
        <div className="projects">
          <div className="project">
            <h3>Project 1</h3>
            <p>Budget: $100,000</p>
            <p>Deadline: January 31, 2024</p>
          </div>

          <div className="project">
            <h3>Project 2</h3>
            <p>Budget: $75,000</p>
            <p>Deadline: February 15, 2024</p>
          </div>
        </div>

        <div className="chatbot">
          <h2>Chatbot</h2>
          <FormSection generateResponse={generateResponse} />
          <AnswerSection storedValues={storedValues} />
        </div>
      </section>
    </div>
  );
}

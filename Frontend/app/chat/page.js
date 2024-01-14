"use client";
import styles from "./chat.css";
import FormSection from "../components/FormSection";
import AnswerSection from "../components/AnswerSection";

import Image from "next/image";

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
          <div></div>
          <div className="title">

          <Image
            src="/images/logo.jpeg"
            alt="Example Image"
            width={60} // Adjust the width as needed
            height={60} // Adjust the height as needed
            priority
          />
          <h1>ManagInsight</h1>
          </div>
          <Image
            src="/images/profile.png"
            alt="Example Image"
            width={40} // Adjust the width as needed
            height={40} // Adjust the height as needed
            priority
          />
        </header>
      </div>

      <section className="dashboard">
        <h2>Project Dashboard</h2>
        <div className="projects">
          <div className="project">
            <h3>Project 1</h3>
            <p>Budget: $100,000</p>
            <p>Deadline: January 31, 2024</p>
            <button
              onClick={() => alert("Warning email about project delay sent.")}
            >
              Send Delay Warning
            </button>{" "}
            {/* This line has been added */}
          </div>

          <div className="project">
            <h3>Project 2</h3>
            <p>Budget: $75,000</p>
            <p>Deadline: February 15, 2024</p>
            <button
              onClick={() => alert("Warning email about project delay sent.")}
            >
              Send Delay Warning
            </button>{" "}
            {/* This line has been added */}
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

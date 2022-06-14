import styles from '../styles/Home.module.css';
import React, { useState } from "react"

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { firstName, email, subject, message }
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        console.log("form submitted successfully !!!")
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  }

  const resetForm = () => {
    setFirstName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <div className={styles.container}>
      <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="first-name"
          id="first-name"
          autoComplete="given-name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className="bg-zinc-300 py-3 px-4 block w-full shadow-sm text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 rounded-md"
        />
      </form>
    </div >
  )
}

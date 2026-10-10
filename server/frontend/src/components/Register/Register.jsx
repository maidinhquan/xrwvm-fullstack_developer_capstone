import React, { useState } from "react";
import Header from "../Header/Header";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const register = async (event) => {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();
      if (!response.ok || body.error) {
        throw new Error(body.error || body.message || "Registration failed");
      }
      setMessage("Registration submitted successfully. You can now sign in.");
    } catch (error) {
      setMessage(error.message || "Could not complete registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="register_container">
        <h1 className="header">Sign-up</h1>
        <form className="inputs" onSubmit={register}>
          <label htmlFor="register-username">Username</label>
          <input id="register-username" className="input_field" name="userName" type="text" placeholder="Username" value={form.userName} onChange={update("userName")} autoComplete="username" required />
          <label htmlFor="register-firstname">First Name</label>
          <input id="register-firstname" className="input_field" name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={update("firstName")} autoComplete="given-name" required />
          <label htmlFor="register-lastname">Last Name</label>
          <input id="register-lastname" className="input_field" name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={update("lastName")} autoComplete="family-name" required />
          <label htmlFor="register-email">Email</label>
          <input id="register-email" className="input_field" name="email" type="email" placeholder="Email" value={form.email} onChange={update("email")} autoComplete="email" required />
          <label htmlFor="register-password">Password</label>
          <input id="register-password" className="input_field" name="password" type="password" placeholder="Password" value={form.password} onChange={update("password")} autoComplete="new-password" required />
          <div className="submit_panel">
            <button className="submit" type="submit" disabled={submitting}>{submitting ? "Registering..." : "Register"}</button>
          </div>
          {message && <p role="status">{message}</p>}
        </form>
      </main>
    </div>
  );
}

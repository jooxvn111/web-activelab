"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import "./login.css"; 

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);

    if (username === "admin" && password === "admin") {
      setAlert({ type: "success", message: "Login successful! Redirecting..." });
      setTimeout(() => {
        localStorage.setItem("token", "dummy-token");
        router.push("/dashboard");
      }, 800);
    } else {
      setAlert({ type: "error", message: "Username or password is incorrect." });
      setPassword("");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        <div className="login-card">
          <div className="logo-wrap">
            <div className="logo-box">
              <Image 
                src="/images/logo_activelab.png" 
                alt="ActiveLab Logo" 
                width={50} 
                height={50} 
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="logo-title">Welcome Back</p>
            <p className="logo-sub">ActiveLab Admin Panel</p>
          </div>

          {alert && (
            <div className={`alert-box ${alert.type === "error" ? "alert-error" : "alert-success"}`}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="field-wrap">
              <label className="field-label">Username</label>
              <input
                type="text"
                className="field-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="field-wrap">
              <label className="field-label">Password</label>
              <input
                type="password"
                className="field-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-signin"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">secured by ActiveLab</span>
            <div className="divider-line" />
          </div>
        </div>
      </div>
    </>
  );
}
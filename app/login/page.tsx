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
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);

    if (username === "admin" && password === "admin") {
      setShowPopup(true);

      setTimeout(() => {
        setIsExiting(true);
      }, 2000);

      setTimeout(() => {
        localStorage.setItem("token", "dummy-token");
        router.push("/dashboard");
      }, 2800);
    } else {
      setAlert({
        type: "error",
        message: "Username or password is incorrect.",
      });
      setPassword("");
    }
  };

  return (
    <>
      <div className={`login-wrapper ${isExiting ? "is-exiting" : ""}`}>
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
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="logo-title">Welcome Back</p>
            <p className="logo-sub">ActiveLab Admin Panel</p>
          </div>

          {alert && (
            <div
              className={`alert-box ${
                alert.type === "error" ? "alert-error" : "alert-success"
              }`}
            >
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

            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">secured by ActiveLab</span>
            <div className="divider-line" />
          </div>
        </div>

        {showPopup && (
          <div className="success-overlay">
            <div className={`success-popup ${isExiting ? "pop-out" : ""}`}>
              <div className="check-container">
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark-circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark-check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
              <h3 className="success-title">Access Granted</h3>
              <p className="success-desc">
                Welcome back, Admin.
                <br />
                Preparing your workspace...
              </p>
            </div>
          </div>
        )}
        <div className={`page-wipe ${isExiting ? "active" : ""}`} />
      </div>
    </>
  );
}

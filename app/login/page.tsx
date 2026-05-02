"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "react-bootstrap";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 👉 DI SINI handleLogin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // LOGIN DUMMY
    if (username === "admin" && password === "admin") {
      localStorage.setItem("token", "dummy-token");
      router.push("/dashboard");
    } else {
      alert("Username / Password salah");
    }
  };

  return (
    <div className="admin-gradient min-vh-100 d-flex flex-column justify-content-center align-items-center">
      
      <div className="mb-3">
        <Image 
          src="/images/logo_activelab.png" 
          alt="Logo ActiveLab"
          width={120}
          height={120}
        />
      </div>

      <div className="bg-white p-4 rounded shadow" style={{ width: "300px" }}>
        <h4 className="text-center mb-3">Login Admin</h4>

        {/* 👉 PENTING: pakai onSubmit */}
        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
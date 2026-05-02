"use client";

import { Image } from "react-bootstrap";

export default function Login() {
  return (
    <div className="bg-info min-vh-100 d-flex flex-column justify-content-center align-items-center">
      
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

        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Masukkan username" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Masukkan password" />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { Image } from "react-bootstrap";
import { Link } from "@mui/material";

export default function Login() {
  return (
    <div className="bg-info min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      
      {/* Logo */}
      <div className="mb-3">
        <Image 
          src="/images/logo_activelab.png" 
          alt="Logo ActiveLab"
          width={120}
          height={120}
        />
      </div>

      {/* Text */}
      <h3 className="text-white mb-4">Welcome Admin</h3>

      {/* Button */}
      <Link href="/login">
  <button className="btn btn-light px-4 rounded-pill shadow">
    Login
  </button>
</Link>

    </div>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div
        className="text-white p-3 d-flex flex-column"
        style={{
          width: "230px",
          background:
            "linear-gradient(to bottom, #0D47A1, #42A5F5, #B3E5FC)",
        }}
      >
        {/* LOGO */}
        <div className="text-center mb-4">
          <Image
            src="/images/logo_activelab.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>

        {/* MENU */}
        <ul className="nav flex-column gap-2 flex-grow-1">
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Service", path: "/dashboard/service" },
            { name: "Member", path: "/dashboard/member" },
            { name: "Schedule", path: "/dashboard/schedule" },
            { name: "Staff", path: "/dashboard/staff" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="menu-item text-white text-decoration-none d-block p-2 rounded"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-3"
        >
          Keluar
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

const colors = ["#F8D7DA", "#FFF3CD", "#D1E7DD", "#E2D9F3"];

// 🔹 CARD COMPONENT
function Card({
  title,
  index,
  role,
  name,
}: {
  title: string;
  index: number;
  role?: "mentor" | "staff";
  name?: string;
}) {
  return (
    <div
      className="service-card"
      style={{
        backgroundColor: colors[index % colors.length],
      }}
    >
      <div className="d-flex justify-content-between">
        <span className="service-title">{title}</span>
        <span style={{ fontSize: "11px" }}>20/25</span>
      </div>

      <p className="service-status mt-1">Status: available</p>

      {/* 🔥 ROLE + NAMA */}
      {role && name && (
        <div
          style={{
            fontSize: "12px",
            marginTop: "4px",
            fontWeight: 500,
          }}
        >
          {role === "mentor" ? "Mentor" : "Staff"} : {name}
        </div>
      )}

      <div className="service-actions">
        <button className="btn btn-sm btn-light">Book</button>
        <button className="btn btn-sm btn-outline-dark">Delete</button>
      </div>
    </div>
  );
}

// 🔹 SECTION COMPONENT
function Section({
  title,
  role,
  name,
}: {
  title: string;
  role?: "mentor" | "staff";
  name?: string;
}) {
  return (
    <div className="service-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ fontWeight: 600 }}>{title}</h5>

        {role && (
          <span style={{ fontSize: "12px", opacity: 0.5 }}>
            {role === "mentor" ? "Need Mentor" : "Need Staff"}
          </span>
        )}
      </div>

      <div className="d-flex gap-3 flex-wrap">
        {[1, 2, 3, 4].map((num, i) => (
          <Card
            key={num}
            title={`${title} ${num}`}
            index={i}
            role={role}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}

// 🔹 MAIN PAGE
export default function ServicePage() {
  const [activeTab, setActiveTab] = useState("facility");

  return (
    <div>
      <h4 className="mb-4">Service Management</h4>

      {/* 🔹 TAB */}
      <div className="custom-tabs">
        {["appointment", "class", "facility", "consultation"].map((tab) => (
          <button
            key={tab}
            className={`tab-item ${
              activeTab === tab ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* 🔹 APPOINTMENT (STAFF) */}
      {activeTab === "appointment" && (
        <>
          <Section title="Massage" role="staff" name="andi" />
          <Section title="Spa" role="staff" name="andi" />
          <Section title="Fisioterapi" role="staff" name="andi" />
        </>
      )}

      {/* 🔹 CLASS (MENTOR) */}
      {activeTab === "class" && (
        <>
          <Section title="Yoga" role="mentor" name="annuel" />
          <Section title="HIIT" role="mentor" name="annuel" />
          <Section title="Pilates" role="mentor" name="annuel" />
        </>
      )}

      {/* 🔹 FACILITY */}
      {activeTab === "facility" && (
        <>
          <Section title="Shower" />
          <Section title="Sauna" />
          <Section title="Recovery Pod" />
        </>
      )}

      {/* 🔹 CONSULTATION */}
      {activeTab === "consultation" && (
        <>
          <Section
            title="Therapy & Consultation"
            role="staff"
            name="andi"
          />
        </>
      )}
    </div>
  );
}
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          minHeight: "76px",
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: 800,
            fontSize: "30px",
            color: "var(--primary)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "var(--primary)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
            }}
          >
            <BriefcaseBusiness size={22} />
          </div>

          SponsorHire
        </Link>

        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "18px",
            rowGap: "10px",
          }}
        >
          <Link to="/" style={{ fontWeight: 600 }}>
            Jobs
          </Link>

          <a href="#" style={{ color: "var(--text-light)" }}>
            Countries
          </a>

          <a href="#" style={{ color: "var(--text-light)" }}>
            Companies
          </a>

          <a href="#" style={{ color: "var(--text-light)" }}>
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
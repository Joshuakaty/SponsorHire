function Footer() {
  return (
    <footer
      style={{
        marginTop: "80px",
        background: "#FFFFFF",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        className="container"
        style={{
          padding: "60px 20px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "420px" }}>
            <h2
              style={{
                color: "var(--primary)",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              SponsorHire
            </h2>

            <p
              className="subtitle"
              style={{
                lineHeight: 1.8,
              }}
            >
              Find verified visa sponsorship jobs from trusted employers around
              the world. Updated daily.
            </p>
          </div>

          <div>
            <h3
              style={{
                marginBottom: "18px",
              }}
            >
              Explore
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <a href="/">Jobs</a>
              <a href="#">Countries</a>
              <a href="#">Companies</a>
              <a href="#">About</a>
            </div>
          </div>

          <div>
            <h3
              style={{
                marginBottom: "18px",
              }}
            >
              Legal
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "50px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            color: "var(--text-light)",
          }}
        >
          © {new Date().getFullYear()} SponsorHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
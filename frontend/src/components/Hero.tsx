type Props = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  totalJobs: number;
};

function Hero({
  query,
  setQuery,
  onSearch,
  totalJobs,
}: Props) {
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <span
            className="badge badge-success"
            style={{ marginBottom: "24px" }}
          >
            Updated Daily
          </span>

          <h1
            className="title"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
              lineHeight: 1.1,
              marginTop: "20px",
            }}
          >
            Find Visa Sponsorship
            <br />
            Jobs Worldwide
          </h1>

          <p
            className="subtitle"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              maxWidth: "700px",
              margin: "24px auto 40px",
              lineHeight: 1.7,
            }}
          >
            Search thousands of verified jobs from employers that sponsor work
            visas.
          </p>

          <div
            className="card"
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
              maxWidth: "900px",
              margin: "0 auto",
              gap: "10px",
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, company or location..."
              style={{
                flex: "1 1 320px",
                minWidth: 0,
                border: "none",
                outline: "none",
                padding: "18px",
                fontSize: "17px",
                background: "transparent",
              }}
            />

            <button
              className="btn btn-primary"
              onClick={onSearch}
              style={{
                flex: "0 0 auto",
              }}
            >
              Search Jobs
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "18px",
              marginTop: "32px",
            }}
          >
            <span className="subtitle">
              <strong>{totalJobs}</strong> Live Jobs
            </span>

            <span className="subtitle">
              ✓ Visa Sponsorship
            </span>

            <span className="subtitle">
              ✓ Updated Daily
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
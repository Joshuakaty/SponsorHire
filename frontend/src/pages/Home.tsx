import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  sponsorship: boolean;
  apply_url: string;
};

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [sponsorship, setSponsorship] = useState(false);

  const loadJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchJobs = async () => {
    try {
      if (!query.trim()) {
        loadJobs();
        return;
      }

      const res = await axios.get(
        `${API_URL}/jobs/search?q=${encodeURIComponent(query)}`
      );

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterJobs = async () => {
    try {
      const params = new URLSearchParams();

      if (location.trim()) {
        params.append("location", location);
      }

      if (sponsorship) {
        params.append("sponsorship", "true");
      }

      const res = await axios.get(
        `${API_URL}/jobs/filter?${params.toString()}`
      );

      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <>
      <Helmet>
        <title>SponsorHire | Visa Sponsorship Jobs Worldwide</title>

        <meta
          name="description"
          content="Find visa sponsorship jobs, remote jobs and international career opportunities updated automatically every day."
        />

        <meta
          name="keywords"
          content="visa sponsorship jobs, remote jobs, international jobs, SponsorHire"
        />
      </Helmet>

      <Navbar />

      <Hero
        query={query}
        setQuery={setQuery}
        onSearch={searchJobs}
        totalJobs={jobs.length}
      />

      <main className="container section">
        <SectionTitle
          title={`${jobs.length} Jobs Found`}
          subtitle="Verified opportunities updated daily."
        />

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <input
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              type="checkbox"
              checked={sponsorship}
              onChange={(e) => setSponsorship(e.target.checked)}
            />
            Visa Sponsorship
          </label>

          <button
            className="btn btn-primary"
            onClick={filterJobs}
          >
            Filter
          </button>

          <button
            className="btn"
            onClick={loadJobs}
          >
            Clear
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;
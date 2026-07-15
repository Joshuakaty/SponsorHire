import { Helmet } from "react-helmet-async";
import "./JobDetails.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Banknote,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  sponsorship: boolean;
  apply_url: string;
};

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  axios
    .get(`${API_URL}/job/${id}`)
    .then((r) => setJob(r.data))
    .catch(console.error);
}, [id]);

  if (!job) {
    return (
      <div className="jd-loading">
        <div className="jd-spinner"></div>
        <p>Loading job...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${job.title} at ${job.company} | SponsorHire`}</title>

        <meta
          name="description"
          content={`${job.title} at ${job.company} in ${job.location}. Apply for this opportunity through SponsorHire.`}
        />

        <meta
          name="keywords"
          content={`${job.title}, ${job.company}, ${job.location}, visa sponsorship jobs, SponsorHire`}
        />

        <meta
          property="og:title"
          content={`${job.title} | SponsorHire`}
        />

        <meta
          property="og:description"
          content={`${job.company} • ${job.location}`}
        />
      </Helmet>

      <div className="jd-page">
        <div className="container">
          <button
            className="btn"
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              padding: 0,
              marginBottom: 24,
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="jd-grid">
            <main className="card jd-main">
              <div className="jd-header">
                <div className="jd-logo">
                  {job.company.charAt(0).toUpperCase()}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h1 className="title job-title">{job.title}</h1>
                  <p className="subtitle">{job.company}</p>
                </div>
              </div>

              <div className="jd-info">
                <Info
                  icon={<MapPin size={18} />}
                  title="Location"
                  value={job.location}
                />

                <Info
                  icon={<Banknote size={18} />}
                  title="Salary"
                  value={job.salary || "Not specified"}
                />

                <Info
                  icon={<Building2 size={18} />}
                  title="Company"
                  value={job.company}
                />

                <Info
                  icon={<BadgeCheck size={18} />}
                  title="Visa"
                  value={
                    job.sponsorship
                      ? "Visa Sponsorship"
                      : "No Sponsorship"
                  }
                />
              </div>

              <h2 className="title" style={{ marginTop: 40 }}>
                About this opportunity
              </h2>

              <p
                className="subtitle"
                style={{ lineHeight: 1.9 }}
              >
                SponsorHire links you directly to the employer's
                official application page where you can read the full
                job description and submit your application.
              </p>
            </main>

            <aside className="jd-side">
              <div className="card jd-sidecard">
                <h3 className="title">Job Overview</h3>

                <Row label="Company" value={job.company} />
                <Row label="Location" value={job.location} />
                <Row
                  label="Salary"
                  value={job.salary || "Not specified"}
                />
                <Row
                  label="Visa"
                  value={
                    job.sponsorship
                      ? "Available"
                      : "Not Available"
                  }
                />

                <button
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    marginTop: 24,
                  }}
                  onClick={() => {
                    if (
                      job.apply_url &&
                      job.apply_url.startsWith("http")
                    ) {
                      window.open(
                        job.apply_url,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    } else {
                      alert(
                        "Application link is not available for this job."
                      );
                    }
                  }}
                >
                  Apply Now
                  <ExternalLink size={18} />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="jd-row">
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: 16,
        padding: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--primary)",
          fontWeight: 700,
        }}
      >
        {icon}
        {title}
      </div>

      <div style={{ marginTop: 10 }}>
        {value}
      </div>
    </div>
  );
}
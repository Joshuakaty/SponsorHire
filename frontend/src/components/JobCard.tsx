import { Link } from "react-router-dom";
import {
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

type Props = {
  job: Job;
};

function JobCard({ job }: Props) {
  return (
    <div
      className="card"
      style={{
        padding: "28px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "18px",
            flex: "1 1 500px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "18px",
              background: "#EEF2FF",
              display: "grid",
              placeItems: "center",
              color: "var(--primary)",
              fontWeight: 800,
              fontSize: "28px",
              flexShrink: 0,
            }}
          >
            {job.company.charAt(0).toUpperCase()}
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <Link
              to={`/job/${job.id}`}
              style={{
                fontSize: "clamp(1.3rem,3vw,1.8rem)",
                fontWeight: 800,
                color: "var(--text)",
                lineHeight: 1.3,
                display: "block",
                wordBreak: "break-word",
              }}
            >
              {job.title}
            </Link>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginTop: "16px",
                color: "var(--text-light)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Building2 size={17} />
                {job.company}
              </span>

              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={17} />
                {job.location}
              </span>

              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Banknote size={17} />
                {job.salary || "Not specified"}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`badge ${job.sponsorship ? "badge-success" : ""}`}
          style={
            job.sponsorship
              ? {}
              : {
                  background: "#F3F4F6",
                  color: "#6B7280",
                }
          }
        >
          <BadgeCheck size={16} />
          {job.sponsorship ? "Visa Sponsored" : "No Sponsorship"}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          marginTop: "28px",
        }}
      >
        <Link
          to={`/job/${job.id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>

        <a
          href={job.apply_url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-dark"
        >
          Apply Now
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}

export default JobCard;
import { useEffect, useState } from "react";
import axios from "axios";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  sponsorship: boolean;
};

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>SponsorHire</h1>

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{job.title}</h2>

          <p>
            <strong>Company:</strong> {job.company}
          </p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Salary:</strong> {job.salary}
          </p>

          <p>
            <strong>Visa Sponsorship:</strong>{" "}
            {job.sponsorship ? "✅ Yes" : "❌ No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
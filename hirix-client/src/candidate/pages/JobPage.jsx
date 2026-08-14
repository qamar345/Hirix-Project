import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TopNav, NavbarMenu, Footer } from "../index.js";
import API, { BASE_URL } from "../../api";
import JobPost from "../components/JobPost";

const JobPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [job, setJob] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const fromShare = searchParams.get("fromShare") === "true";

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(
          `/get-post-by-id/${id}`
        );
        setJob(res.data);
      } catch (err) {
        console.error("Failed to load job", err);
        setNotFound(true);
      }
    };

    fetchJob();
  }, [id]);

  if (notFound) {
    return (
      <>
        <TopNav />
        <NavbarMenu />
        <div style={{ padding: "60px 20px", textAlign: "center", color: "#888" }}>
          This job posting could not be found. It may have been removed or the link is incorrect.
        </div>
        <Footer />
      </>
    );
  }

  if (!job) return <p>Loading...</p>;

  return (
    <>
      <div>
        {/* Top Nav */}
        <TopNav />

        {/* Nabbar */}
        <NavbarMenu />
        <div
          style={{
            margin: "0 auto",
            maxWidth: "1100px",
            width: "92%",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          {job ? (
            <JobPost job={job} fromShare={true} />
          ) : (
            <div style={{ padding: "20px", color: "#888" }}>
              Loading job details...
            </div>
          )}
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default JobPage;

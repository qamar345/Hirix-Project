import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  TopNav,
  NavbarMenu,
  Footer,
} from "../index.js";
import axios from "axios";
import JobPost from "../components/JobPost";

const JobPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [job, setJob] = useState(null);
  const fromShare = searchParams.get("fromShare") === "true";

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/get-post-by-id/${id}`);
        setJob(res.data);
      } catch (err) {
              }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
  <>
  <div>
     {/* Top Nav */}
            <TopNav />
    
            {/* Nabbar */}
            <NavbarMenu />
    <div style={{margin: "0 auto",width: "70%", marginTop: "5%", marginBottom: "5%"}}>
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

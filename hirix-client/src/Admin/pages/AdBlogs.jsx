import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdFooter } from "../index.js";
import API from "../../api";

const STATUS_COLORS = {
  Published: { bg: "#dcfce7", color: "#16a34a" },
  Draft: { bg: "#fef9c3", color: "#ca8a04" },
  Archived: { bg: "#fee2e2", color: "#dc2626" },
};

const AdBlogs = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const token = sessionStorage.getItem("token");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    if (!check) navigate("/admin-login");
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/get-blogs?status=all&limit=100`);
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await API.delete(`/delete-blog/${id}`, {
        headers: { "x-access-token": token },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete blog post.");
    }
  };

  const filtered = blogs.filter((b) => {
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchSearch =
      !searchQ ||
      b.title.toLowerCase().includes(searchQ.toLowerCase()) ||
      (b.category || "").toLowerCase().includes(searchQ.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <>
      <div className="dashboardWrapper">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h6 className="heading" style={{ margin: 0 }}>Blog Posts</h6>
          </div>
          <div className="col-md-6 text-end">
            <button
              className="civi-button"
              onClick={() => navigate("/admin/blogs/new")}
            >
              + New Post
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-3 g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control input-field"
              placeholder="Search by title or category..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table" style={{ background: "#fff", borderRadius: "12px", overflow: "hidden" }}>
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th style={th}>#</th>
                <th style={th}>Title</th>
                <th style={th}>Category</th>
                <th style={th}>Tags</th>
                <th style={th}>Status</th>
                <th style={th}>Date</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    No blog posts found. <strong style={{ cursor: "pointer", color: "#126EBB" }} onClick={() => navigate("/admin/blogs/new")}>Create one →</strong>
                  </td>
                </tr>
              ) : (
                filtered.map((blog, i) => {
                  const sc = STATUS_COLORS[blog.status] || STATUS_COLORS.Draft;
                  return (
                    <tr key={blog.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={td}>{i + 1}</td>
                      <td style={{ ...td, maxWidth: "260px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b", lineHeight: 1.3 }}>
                          {blog.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                          /{blog.slug}
                        </div>
                      </td>
                      <td style={td}>
                        <span style={{ fontSize: "13px", color: "#64748b" }}>
                          {blog.category || "—"}
                        </span>
                      </td>
                      <td style={{ ...td, maxWidth: "180px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {blog.tags
                            ? blog.tags.split(",").slice(0, 3).map((tag, ti) => (
                                <span key={ti} style={tagStyle}>{tag.trim()}</span>
                              ))
                            : "—"}
                        </div>
                      </td>
                      <td style={td}>
                        <span style={{
                          background: sc.bg,
                          color: sc.color,
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}>
                          {blog.status}
                        </span>
                      </td>
                      <td style={{ ...td, fontSize: "13px", color: "#64748b" }}>
                        {new Date(blog.created_at).toLocaleDateString("en-PK", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </td>
                      <td style={td}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            style={btnEdit}
                            onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            style={btnDel}
                            onClick={() => handleDelete(blog.id, blog.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer mt-5">
        <AdFooter />
      </div>
    </>
  );
};

// Styles
const th = { padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: "#475569", whiteSpace: "nowrap" };
const td = { padding: "14px 16px", fontSize: "14px", verticalAlign: "middle" };
const tagStyle = { background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" };
const btnEdit = { background: "#126EBB", color: "#fff", border: "none", borderRadius: "6px", padding: "5px 14px", cursor: "pointer", fontSize: "13px" };
const btnDel = { background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", padding: "5px 14px", cursor: "pointer", fontSize: "13px" };

export default AdBlogs;

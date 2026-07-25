import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AdFooter } from "../index.js";
import API from "../../api";
import {
  FiEdit3,
  FiSearch,
  FiCheck,
  FiX,
  FiChevronLeft,
} from "react-icons/fi";
import { FaBookOpen, FaTags, FaImage, FaChartBar } from "react-icons/fa";

/* ─── Quill toolbar config ─── */
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

/* ─── SEO score calculator (RankMath-like) ─── */
const calcSeoScore = (data) => {
  let score = 0;
  if (data.focus_keyword) score += 15;
  if (data.seo_title) score += 15;
  if (data.meta_description && data.meta_description.length >= 120 && data.meta_description.length <= 160) score += 20;
  if (data.title && data.focus_keyword && data.title.toLowerCase().includes(data.focus_keyword.toLowerCase())) score += 15;
  if (data.content && data.focus_keyword && data.content.toLowerCase().includes(data.focus_keyword.toLowerCase())) score += 15;
  if (data.tags) score += 10;
  if (data.category) score += 10;
  return Math.min(score, 100);
};

const getSeoColor = (score) => {
  if (score >= 80) return "#16a34a";
  if (score >= 50) return "#d97706";
  return "#dc2626";
};

const getSeoLabel = (score) => {
  if (score >= 80) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
};

/* ─── Main Component ─── */
const AdBlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const token = sessionStorage.getItem("token");
  const check = sessionStorage.getItem("isLoggedIn");

  const [activeTab, setActiveTab] = useState("content"); // "content" | "seo"
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    cover_image: "",
    category: "",
    tags: "",
    status: "Draft",
    // SEO
    focus_keyword: "",
    seo_title: "",
    meta_description: "",
    canonical_url: "",
    og_image: "",
  });

  useEffect(() => {
    if (!check) navigate("/admin-login");
  });

  // Fetch blog for edit mode
  useEffect(() => {
    if (!isEdit) return;
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/get-blogs?status=all&limit=500`);
        const all = res.data.data || [];
        const found = all.find((b) => String(b.id) === String(id));
        if (found) {
          setForm({
            title: found.title || "",
            content: found.content || "",
            cover_image: found.cover_image || "",
            category: found.category || "",
            tags: found.tags || "",
            status: found.status || "Draft",
            focus_keyword: found.focus_keyword || "",
            seo_title: found.seo_title || "",
            meta_description: found.meta_description || "",
            canonical_url: found.canonical_url || "",
            og_image: found.og_image || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (statusOverride) => {
    const payload = { ...form };
    if (statusOverride) payload.status = statusOverride;

    if (!payload.title.trim()) { alert("Title is required."); return; }
    if (!payload.content.trim() || payload.content === "<p><br></p>") { alert("Content is required."); return; }

    setSaving(true);
    try {
      if (isEdit) {
        await API.put(`/edit-blog/${id}`, payload, { headers: { "x-access-token": token } });
        alert("Blog post updated successfully!");
      } else {
        await API.post("/add-blog", payload, { headers: { "x-access-token": token } });
        alert("Blog post created successfully!");
      }
      navigate("/admin/blogs");
    } catch (err) {
      alert("Failed to save blog post.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const seoScore = calcSeoScore(form);
  const seoColor = getSeoColor(seoScore);

  /* ── SEO Checklist ── */
  const seoChecks = [
    {
      ok: Boolean(form.focus_keyword),
      label: "Focus keyword is set",
    },
    {
      ok: Boolean(form.seo_title),
      label: "SEO title is set",
    },
    {
      ok: Boolean(form.meta_description) && form.meta_description.length >= 120 && form.meta_description.length <= 160,
      label: `Meta description is between 120–160 chars (${(form.meta_description || "").length})`,
    },
    {
      ok: Boolean(form.title && form.focus_keyword && form.title.toLowerCase().includes(form.focus_keyword.toLowerCase())),
      label: "Focus keyword appears in title",
    },
    {
      ok: Boolean(form.content && form.focus_keyword && form.content.toLowerCase().includes(form.focus_keyword.toLowerCase())),
      label: "Focus keyword appears in content",
    },
    {
      ok: Boolean(form.tags),
      label: "Tags are set",
    },
    {
      ok: Boolean(form.category),
      label: "Category is set",
    },
  ];

  return (
    <>
      <div className="dashboardWrapper">
        {/* Top bar */}
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <button
              style={{ background: "none", border: "none", cursor: "pointer", color: "#126EBB", fontWeight: 600, fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}
              onClick={() => navigate("/admin/blogs")}
            >
              <FiChevronLeft size={16} /> All Posts
            </button>
            <h6 className="heading" style={{ margin: "4px 0 0" }}>
              {isEdit ? "Edit Post" : "New Post"}
            </h6>
          </div>
          <div className="col-md-6 text-end" style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center" }}>
            <select
              className="form-control input-field"
              style={{ width: "140px" }}
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
            <button
              className="civi-button"
              disabled={saving}
              onClick={() => handleSave()}
              style={{ whiteSpace: "nowrap" }}
            >
              {saving ? "Saving..." : isEdit ? "Update Post" : "Save Post"}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* ── Left: Main Content ── */}
          <div className="col-lg-8">
            {/* Title */}
            <div style={card}>
              <input
                type="text"
                placeholder="Post title..."
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "2px solid #e2e8f0",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1e293b",
                  padding: "0 0 12px",
                  outline: "none",
                  background: "transparent",
                }}
              />
            </div>

            {/* Tabs: Content / SEO */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
                <button
                  style={tabBtn(activeTab === "content")}
                  onClick={() => setActiveTab("content")}
                >
                  <FiEdit3 size={14} style={{ marginRight: "6px" }} />
                  Content
                </button>
                <button
                  style={tabBtn(activeTab === "seo")}
                  onClick={() => setActiveTab("seo")}
                >
                  <FiSearch size={14} style={{ marginRight: "6px" }} />
                  SEO Analysis
                  <span style={{
                    marginLeft: "8px",
                    background: seoColor,
                    color: "#fff",
                    padding: "1px 8px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}>
                    {seoScore}/100
                  </span>
                </button>
              </div>

              {/* Content Tab */}
              {activeTab === "content" && (
                <div style={{ padding: "20px" }}>
                  <ReactQuill
                    theme="snow"
                    value={form.content}
                    onChange={(val) => handleChange("content", val)}
                    modules={quillModules}
                    style={{ minHeight: "380px" }}
                  />
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === "seo" && (
                <div style={{ padding: "20px" }}>
                  {/* Score gauge */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "16px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                    marginBottom: "24px",
                  }}>
                    <div style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      border: `6px solid ${seoColor}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontWeight: 800, fontSize: "20px", color: seoColor }}>{seoScore}</span>
                      <span style={{ fontSize: "9px", color: "#94a3b8" }}>/ 100</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: seoColor, fontSize: "16px" }}>{getSeoLabel(seoScore)}</div>
                      <div style={{ color: "#64748b", fontSize: "13px" }}>
                        Complete the checklist to improve your SEO score
                      </div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div style={{ marginBottom: "24px" }}>
                    {seoChecks.map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ fontSize: "16px", display: "flex", alignItems: "center" }}>
                          {c.ok
                            ? <FiCheck size={16} color="#16a34a" />
                            : <FiX size={16} color="#dc2626" />}
                        </span>
                        <span style={{ fontSize: "13px", color: c.ok ? "#16a34a" : "#94a3b8" }}>{c.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Focus Keyword */}
                  <div style={fieldGroup}>
                    <label style={labelStyle}>Focus Keyword</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="e.g. jobs in pakistan"
                      value={form.focus_keyword}
                      onChange={(e) => handleChange("focus_keyword", e.target.value)}
                    />
                    <small style={hint}>The main keyword you want this post to rank for.</small>
                  </div>

                  {/* SEO Title */}
                  <div style={fieldGroup}>
                    <label style={labelStyle}>SEO Title</label>
                    <input
                      type="text"
                      className="form-control input-field"
                      placeholder="Leave blank to use post title"
                      value={form.seo_title}
                      onChange={(e) => handleChange("seo_title", e.target.value)}
                    />
                    <small style={hint}>
                      {(form.seo_title || form.title || "").length} / 60 characters
                      {(form.seo_title || form.title || "").length > 60 && <span style={{ color: "#dc2626" }}> — Too long!</span>}
                    </small>
                    {/* SERP Preview */}
                    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 16px", marginTop: "8px" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>SERP Preview</div>
                      <div style={{ color: "#1a0dab", fontSize: "18px", fontWeight: 500, marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {form.seo_title || form.title || "Post title will appear here"}
                      </div>
                      <div style={{ color: "#006621", fontSize: "13px", marginBottom: "2px" }}>
                        hirix.pk/blog/{form.title ? form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 50) : "post-slug"}
                      </div>
                      <div style={{ color: "#545454", fontSize: "14px", lineHeight: 1.4 }}>
                        {form.meta_description || "Meta description will appear here..."}
                      </div>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div style={fieldGroup}>
                    <label style={labelStyle}>Meta Description</label>
                    <textarea
                      className="form-control input-field"
                      rows={3}
                      placeholder="Write a compelling description between 120–160 characters..."
                      value={form.meta_description}
                      onChange={(e) => handleChange("meta_description", e.target.value)}
                      style={{ resize: "vertical" }}
                    />
                    <small style={hint}>
                      <span style={{ color: form.meta_description.length > 160 ? "#dc2626" : form.meta_description.length >= 120 ? "#16a34a" : "#94a3b8" }}>
                        {form.meta_description.length}
                      </span>
                      {" "}/ 160 characters
                    </small>
                  </div>

                  {/* Canonical URL */}
                  <div style={fieldGroup}>
                    <label style={labelStyle}>Canonical URL</label>
                    <input
                      type="url"
                      className="form-control input-field"
                      placeholder="https://hirix.pk/blog/post-slug (leave blank for auto)"
                      value={form.canonical_url}
                      onChange={(e) => handleChange("canonical_url", e.target.value)}
                    />
                  </div>

                  {/* OG Image */}
                  <div style={fieldGroup}>
                    <label style={labelStyle}>Open Graph / Social Share Image URL</label>
                    <input
                      type="url"
                      className="form-control input-field"
                      placeholder="https://..."
                      value={form.og_image}
                      onChange={(e) => handleChange("og_image", e.target.value)}
                    />
                    <small style={hint}>Image shown when sharing on Facebook, Twitter, WhatsApp etc.</small>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="col-lg-4">
            {/* Publish Box */}
            <div style={card}>
              <h6 style={sideHeading}><FaBookOpen size={13} style={{ marginRight: "6px", color: "#126EBB" }} />Publish</h6>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select
                    className="form-control input-field"
                    value={form.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <button
                  className="civi-button"
                  style={{ width: "100%" }}
                  onClick={() => handleSave("Published")}
                  disabled={saving}
                >
                  {saving ? "Publishing..." : "Publish Now"}
                </button>
                <button
                  style={{ ...btnGhost, width: "100%" }}
                  onClick={() => handleSave("Draft")}
                  disabled={saving}
                >
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Category */}
            <div style={card}>
              <h6 style={sideHeading}><FaTags size={13} style={{ marginRight: "6px", color: "#126EBB" }} />Category</h6>
              <input
                type="text"
                className="form-control input-field"
                placeholder="e.g. Career Tips"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />
            </div>

            {/* Tags */}
            <div style={card}>
              <h6 style={sideHeading}><FaTags size={13} style={{ marginRight: "6px", color: "#126EBB" }} />Tags</h6>
              <input
                type="text"
                className="form-control input-field"
                placeholder="jobs, pakistan, career (comma separated)"
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
              />
              <small style={hint}>Separate tags with commas</small>
              {form.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                  {form.tags.split(",").map((t, i) =>
                    t.trim() ? (
                      <span key={i} style={{ background: "#e0f2fe", color: "#0369a1", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
                        #{t.trim()}
                      </span>
                    ) : null
                  )}
                </div>
              )}
            </div>

            {/* Cover Image */}
            <div style={card}>
              <h6 style={sideHeading}><FaImage size={13} style={{ marginRight: "6px", color: "#126EBB" }} />Cover Image URL</h6>
              <input
                type="url"
                className="form-control input-field"
                placeholder="https://..."
                value={form.cover_image}
                onChange={(e) => handleChange("cover_image", e.target.value)}
              />
              {form.cover_image && (
                <img
                  src={form.cover_image}
                  alt="Cover preview"
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px", objectFit: "cover", maxHeight: "160px" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
            </div>

            {/* SEO Quick Score */}
            <div style={card}>
              <h6 style={sideHeading}><FaChartBar size={13} style={{ marginRight: "6px", color: "#126EBB" }} />SEO Score</h6>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: `5px solid ${seoColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "16px",
                  color: seoColor,
                  flexShrink: 0,
                }}>
                  {seoScore}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: seoColor }}>{getSeoLabel(seoScore)}</div>
                  <div
                    style={{ fontSize: "12px", color: "#126EBB", cursor: "pointer" }}
                    onClick={() => setActiveTab("seo")}
                  >
                    View SEO analysis →
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ marginTop: "12px", height: "6px", background: "#e2e8f0", borderRadius: "3px" }}>
                <div style={{ width: `${seoScore}%`, height: "100%", background: seoColor, borderRadius: "3px", transition: "width 0.4s ease" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <AdFooter />
      </div>
    </>
  );
};

/* ── Style helpers ── */
const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};
const sideHeading = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#1e293b",
  marginBottom: "12px",
  paddingBottom: "8px",
  borderBottom: "1px solid #f1f5f9",
};
const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#475569",
  marginBottom: "6px",
};
const hint = { color: "#94a3b8", fontSize: "12px", marginTop: "4px", display: "block" };
const fieldGroup = { marginBottom: "20px" };
const tabBtn = (active) => ({
  flex: 1,
  padding: "12px 16px",
  border: "none",
  borderBottom: active ? "3px solid #126EBB" : "3px solid transparent",
  background: active ? "#f0f7ff" : "#fff",
  cursor: "pointer",
  fontWeight: active ? 700 : 500,
  color: active ? "#126EBB" : "#64748b",
  fontSize: "14px",
  transition: "all 0.2s",
});
const btnGhost = {
  background: "#f1f5f9",
  color: "#475569",
  border: "none",
  borderRadius: "6px",
  padding: "8px 16px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 500,
};

export default AdBlogEditor;

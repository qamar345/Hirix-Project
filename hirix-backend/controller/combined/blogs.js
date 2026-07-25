const { conn_sql } = require("../../config/connection");
const slugify = require("slugify");

// Helper to generate unique slug
const generateUniqueSlug = async (title, id = null) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    let sql = "SELECT id FROM `blogs` WHERE `slug` = ?";
    let params = [slug];
    if (id) {
      sql += " AND id != ?";
      params.push(id);
    }
    
    const check = await new Promise((resolve) => {
      conn_sql.query(sql, params, (err, res) => {
        resolve(res && res.length > 0);
      });
    });
    
    if (!check) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

// GET /get-blogs (Public)
const GetBlogs = (req, res) => {
  const status = req.query.status || "Published";
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  let sql = "SELECT * FROM `blogs` WHERE 1=1";
  const params = [];

  if (status !== "all") {
    sql += " AND `status` = ?";
    params.push(status);
  }

  sql += " ORDER BY `created_at` DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  conn_sql.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    conn_sql.query("SELECT COUNT(*) as count FROM `blogs` WHERE `status` = ?", [status], (err, countRes) => {
      const total = countRes ? countRes[0].count : 0;
      res.json({
        data: results,
        meta: {
          total,
          page,
          totalPages: Math.ceil(total / limit)
        }
      });
    });
  });
};

// GET /get-blog/:slug (Public)
const GetBlogBySlug = (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM `blogs` WHERE `slug` = ?";
  conn_sql.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ msg: "Blog post not found" });
    return res.json(results[0]);
  });
};

// POST /add-blog (Admin-only)
const AddBlog = async (req, res) => {
  const {
    title,
    content,
    cover_image,
    category,
    tags,
    focus_keyword,
    seo_title,
    meta_description,
    canonical_url,
    og_image,
    status
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "Title and Content are required." });
  }

  try {
    const slug = await generateUniqueSlug(title);
    const sql = `
      INSERT INTO \`blogs\` (
        \`title\`, \`slug\`, \`content\`, \`cover_image\`, \`category\`, \`tags\`,
        \`focus_keyword\`, \`seo_title\`, \`meta_description\`, \`canonical_url\`, \`og_image\`, \`status\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      title, slug, content, cover_image || null, category || null, tags || null,
      focus_keyword || null, seo_title || null, meta_description || null, canonical_url || null, og_image || null, status || "Draft"
    ];

    conn_sql.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ msg: "Blog post created successfully!", id: result.insertId, slug });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PUT /edit-blog/:id (Admin-only)
const EditBlog = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    cover_image,
    category,
    tags,
    focus_keyword,
    seo_title,
    meta_description,
    canonical_url,
    og_image,
    status
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "Title and Content are required." });
  }

  try {
    const slug = await generateUniqueSlug(title, id);
    const sql = `
      UPDATE \`blogs\` SET 
        \`title\` = ?, \`slug\` = ?, \`content\` = ?, \`cover_image\` = ?, \`category\` = ?, \`tags\` = ?,
        \`focus_keyword\` = ?, \`seo_title\` = ?, \`meta_description\` = ?, \`canonical_url\` = ?, \`og_image\` = ?, \`status\` = ?
      WHERE \`id\` = ?
    `;
    const params = [
      title, slug, content, cover_image || null, category || null, tags || null,
      focus_keyword || null, seo_title || null, meta_description || null, canonical_url || null, og_image || null, status || "Draft",
      id
    ];

    conn_sql.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ msg: "Blog post updated successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE /delete-blog/:id (Admin-only)
const DeleteBlog = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM `blogs` WHERE `id` = ?";
  conn_sql.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ msg: "Blog post deleted successfully!" });
  });
};

module.exports = { GetBlogs, GetBlogBySlug, AddBlog, EditBlog, DeleteBlog };

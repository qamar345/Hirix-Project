import { useState, useEffect } from "react";
import API from "./api";

// Platform name -> react-icons icon mapping key
// Used by consumers to render correct icon

let cachedSettings = null;
let fetchPromise = null;

const useSiteSettings = () => {
  const [settings, setSettings] = useState(cachedSettings || {});
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) {
      const { social_links, ...rest } = cachedSettings;
      setSettings(rest);
      setSocialLinks(parseSocial(social_links));
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = API.get("/site-settings").catch(() => ({ data: {} }));
    }

    fetchPromise.then((res) => {
      cachedSettings = res.data || {};
      const { social_links, ...rest } = cachedSettings;
      setSettings(rest);
      setSocialLinks(parseSocial(social_links));
      setLoading(false);
    });
  }, []);

  return { settings, socialLinks, loading };
};

function parseSocial(raw) {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((s) => s.url) : [];
  } catch {
    return [];
  }
}

export default useSiteSettings;

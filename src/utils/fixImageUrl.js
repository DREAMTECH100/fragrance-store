const fixImageUrl = (url) => {
  if (!url) return "/images/placeholder.png";

  // Fix broken URLs from DB
  if (url.startsWith("https//")) {
    url = url.replace("https//", "https://");
  }

  // If already full URL → use it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Otherwise → attach backend URL
  return `${baseURL}${url}`;
};
const nextifyHref = href => {
  const result = { url: href, as: href, options: {} };
  if (!href) {
    return result;
  }
  if (href.startsWith('/blog/')) {
    result.url = '/blog/[id]';
  }
  if (href.startsWith('/travel/')) {
    result.url = '/travel/[id]';
  }
  return result;
};

export default nextifyHref;

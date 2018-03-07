const Blog = (title, dateWritten, categories, elements) => ({
  title,
  dateWritten,
  categories,
  elements,
});

Object.defineProperty(Blog, 'title', {
  set(v) {
    this.title = v;
  },
});
Object.defineProperty(Blog, 'dateWritten', {
  set(v) {
    this.dateWritten = v;
  },
});
Object.defineProperty(Blog, 'categories', {
  set(v) {
    this.categories = v;
  },
});
Object.defineProperty(Blog, 'elements', {
  set(v) {
    this.elements = v;
  },
});

module.exports = Blog;

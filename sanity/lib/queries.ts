import { groq } from 'next-sanity'

// Get all projects
export const projectsQuery = groq`*[_type == "project"] | order(_createdAt asc) {
  _id,
  _updatedAt,
  title,
  slug,
  status,
  location,
  client,
  coverImage,
  builtUp,
  plotSize,
  projectValue,
  gallery
}`

// Get a single project by its slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  _updatedAt,
  title,
  slug,
  status,
  location,
  builtUp,
  plotSize,
  projectValue,
  client,
  coverImage,
  gallery
}`

// Get all blogs
export const blogsQuery = groq`*[_type == "blog" && defined(slug.current) && defined(body) && publishedAt <= now()] | order(publishedAt desc) {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  mainImage,
  category,
  readTime,
  seoTitle,
  seoDescription,
  body
}`

// Get a single blog by slug
export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug && defined(body) && publishedAt <= now()][0] {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  mainImage,
  category,
  readTime,
  showToc,
  seoTitle,
  seoDescription,
  faqs,
  body
}`


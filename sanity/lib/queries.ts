import { groq } from 'next-sanity'

// Get all projects
export const projectsQuery = groq`*[_type == "project"] | order(_createdAt asc) {
  _id,
  title,
  slug,
  status,
  location,
  client,
  coverImage,
  gallery
}`

// Get a single project by its slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  location,
  client,
  coverImage,
  gallery
}`

// Get all blogs
export const blogsQuery = groq`*[_type == "blog"] | order(publishedAt desc) {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  mainImage,
  seoTitle,
  seoDescription,
  body
}`

// Get a single blog by slug
export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  mainImage,
  seoTitle,
  seoDescription,
  body
}`


import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'rhtfv6bc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skejfPASHBBn0ySAdL6XsT7ERddpwnxKwO1mDjR64H5KwStxXXzQaKIn9xgwgugjnFNuTff55fGypOyfpPVL6sSyhQeFUpOMMm4EiiOrDTo7PzNt2NW9fZeNEZGLfL1L79eD5Sgd8wtxF5WdsGdSk9bLhMmf0vJXxoPvsLm1T8tjJ95lQJxI'
});

async function run() {
  const projects = await client.fetch(`*[_type == "project" && title match "Damodharan*"]`);
  if (!projects.length) {
    console.log("Damodharan project not found in Sanity");
    return;
  }
  const p = projects[0];
  console.log("Found project:", p.title);
  console.log("Cover Image:", p.coverImage);
  console.log("Gallery length:", p.gallery ? p.gallery.length : 0);
  console.log("Gallery refs:", p.gallery ? p.gallery.map(g => g.asset._ref) : []);
}

run().catch(console.error);

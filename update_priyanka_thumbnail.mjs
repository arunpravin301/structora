import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'rhtfv6bc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skejfPASHBBn0ySAdL6XsT7ERddpwnxKwO1mDjR64H5KwStxXXzQaKIn9xgwgugjnFNuTff55fGypOyfpPVL6sSyhQeFUpOMMm4EiiOrDTo7PzNt2NW9fZeNEZGLfL1L79eD5Sgd8wtxF5WdsGdSk9bLhMmf0vJXxoPvsLm1T8tjJ95lQJxI'
});

async function run() {
  const projects = await client.fetch(`*[_type == "project" && title match "Priyanka*"]`);
  if (!projects.length) {
    console.log("Priyanka project not found in Sanity");
    return;
  }
  const p = projects[0];
  console.log("Found project:", p.title);
  
  console.log("Uploading asset...");
  const imageStream = fs.createReadStream('D:/Structora India/Website/React Site/structora-nextjs-starter/public/projects/priyanka_thumbnail2.png');
  const asset = await client.assets.upload('image', imageStream, {
    filename: 'priyanka_thumbnail2.png'
  });
  
  console.log("Patching document", p._id);
  await client.patch(p._id).set({
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    }
  }).commit();
  
  console.log("Successfully updated Sanity CMS thumbnail for Priyanka project.");
}

run().catch(console.error);

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
  const projects = await client.fetch(`*[_type == "project" && title match "Damodharan*"]`);
  if (!projects.length) return console.log("Damodharan project not found");
  const p = projects[0];
  console.log("Found project:", p.title);
  
  // 1. Upload Thumbnail.jpg
  console.log("Uploading asset...");
  const imageStream = fs.createReadStream('D:/Structora India/Photos/5. Damodharan  - Ongoing/Thumbnail.jpg');
  const asset = await client.assets.upload('image', imageStream, {
    filename: 'damodharan_thumbnail.jpg'
  });
  
  // 2. Remove 1, 2, 3, 5 (indices 0, 1, 2, 4) from gallery
  let newGallery = p.gallery || [];
  if (newGallery.length >= 5) {
    // We want to keep all elements EXCEPT indices 0, 1, 2, 4
    newGallery = newGallery.filter((_, idx) => ![0, 1, 2, 4].includes(idx));
    console.log(`Filtered gallery from ${p.gallery.length} to ${newGallery.length} items.`);
  } else {
    console.log("Gallery has fewer than 5 items, skipping gallery filtering.");
  }

  // 3. Patch document
  console.log("Patching document", p._id);
  await client.patch(p._id).set({
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    },
    gallery: newGallery
  }).commit();
  
  console.log("Successfully updated Damodharan project in Sanity.");
}

run().catch(console.error);

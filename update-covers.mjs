import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { readFileSync, createReadStream } from 'fs';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: 'skejfPASHBBn0ySAdL6XsT7ERddpwnxKwO1mDjR64H5KwStxXXzQaKIn9xgwgugjnFNuTff55fGypOyfpPVL6sSyhQeFUpOMMm4EiiOrDTo7PzNt2NW9fZeNEZGLfL1L79eD5Sgd8wtxF5WdsGdSk9bLhMmf0vJXxoPvsLm1T8tjJ95lQJxI',
  useCdn: false
});

const data = JSON.parse(readFileSync('./project-data.json', 'utf8'));

// map json keys to project titles in sanity
const keyToTitle = {
  "1_zaheer_residence_ongoing": "Zaheer Residence",
  "2_balaji_residence_completed": "Balaji Residence",
  "3_mm_residence_completed": "Mm Residence",
  "4_priyanka_vilson_ongoing": "Priyanka Vilson",
  "5_damodharan_ongoing": "Damodharan"
};

async function run() {
  const projects = await client.fetch('*[_type == "project"]');
  for (const [key, pData] of Object.entries(data)) {
    const title = keyToTitle[key];
    const project = projects.find(p => p.title === title);
    if (!project) continue;
    
    let imgName = pData.coverImage;
    if (title === 'Zaheer Residence') imgName = '/projects/1_zaheer_residence_ongoing_14.webp';
    if (title === 'Priyanka Vilson') imgName = '/projects/4_priyanka_vilson_ongoing_12.webp';
    if (title === 'Damodharan') imgName = '/projects/5_damodharan_ongoing_12.webp';
    
    const imagePath = join(__dirname, 'public', imgName);
    console.log(`Uploading ${imagePath} for ${title}...`);
    try {
      const coverAsset = await client.assets.upload('image', createReadStream(imagePath), {
        filename: basename(imagePath)
      });
      await client.patch(project._id)
        .set({
          coverImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: coverAsset._id
            }
          }
        })
        .commit();
      console.log(`Successfully updated cover image for ${title}`);
    } catch (e) {
      console.error(`Failed for ${title}:`, e);
    }
  }
  console.log("Done updating covers!");
}
run();

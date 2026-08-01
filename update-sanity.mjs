import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: 'skejfPASHBBn0ySAdL6XsT7ERddpwnxKwO1mDjR64H5KwStxXXzQaKIn9xgwgugjnFNuTff55fGypOyfpPVL6sSyhQeFUpOMMm4EiiOrDTo7PzNt2NW9fZeNEZGLfL1L79eD5Sgd8wtxF5WdsGdSk9bLhMmf0vJXxoPvsLm1T8tjJ95lQJxI',
  useCdn: false
});

const projectUpdates = {
  'Zaheer Residence': { location: 'Tiruvannamalai' },
  'Balaji Residence': { location: 'Kumbakonam' },
  'Mm Residence': { location: 'Kumbakonam' },
  'Priyanka Vilson': { location: 'Kumbakonam' },
  'Damodharan': { location: 'Tiruvannamalai' }
};

async function run() {
  const projects = await client.fetch('*[_type == "project"]');
  for (const project of projects) {
    const update = projectUpdates[project.title];
    if (update) {
      console.log(`Updating ${project.title} to location ${update.location}...`);
      await client.patch(project._id)
        .set({ location: update.location })
        .commit();
    }
  }
  console.log("Done updating locations!");
}
run();

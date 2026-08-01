import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: 'rhtfv6bc',
  dataset: 'production',
  apiVersion: '2024-08-01',
  useCdn: false,
  token: 'skejfPASHBBn0ySAdL6XsT7ERddpwnxKwO1mDjR64H5KwStxXXzQaKIn9xgwgugjnFNuTff55fGypOyfpPVL6sSyhQeFUpOMMm4EiiOrDTo7PzNt2NW9fZeNEZGLfL1L79eD5Sgd8wtxF5WdsGdSk9bLhMmf0vJXxoPvsLm1T8tjJ95lQJxI',
});

// Helper to upload a local image file to Sanity
async function uploadImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[WARN] File not found: ${filePath}`);
    return null;
  }
  console.log(`Uploading ${filePath}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  console.log(`Uploaded! Asset ID: ${asset._id}`);
  return asset._id;
}

// Convert "Ongoing" to "ongoing" etc
function parseStatus(statusStr) {
  if (!statusStr) return 'ongoing';
  if (statusStr.toLowerCase().includes('completed')) return 'completed';
  return 'ongoing';
}

async function run() {
  const dataPath = path.join(__dirname, 'project-data.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const dataDict = JSON.parse(rawData);
  const keys = Object.keys(dataDict);

  console.log(`Found ${keys.length} projects to migrate.`);

  for (const key of keys) {
    const projData = dataDict[key];
    
    // Parse key: "1_zaheer_residence_ongoing"
    const parts = key.split('_');
    const status = parts.pop(); // "ongoing"
    parts.shift(); // remove "1"
    const name = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

    console.log(`\nMigrating project: ${name}`);

    // Create slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // 1. Upload cover image
    let coverAssetId = null;
    if (projData.coverImage) {
      const heroPath = path.join(__dirname, 'public', projData.coverImage);
      coverAssetId = await uploadImage(heroPath);
    } else if (projData.images && projData.images.length > 0) {
      const firstImg = projData.images[0];
      const p = path.join(__dirname, 'public', firstImg);
      coverAssetId = await uploadImage(p);
    }

    // 2. Upload gallery images
    const galleryAssetIds = [];
    if (projData.images) {
      for (const imgSrc of projData.images) {
        const fullPath = path.join(__dirname, 'public', imgSrc);
        const assetId = await uploadImage(fullPath);
        if (assetId) {
          galleryAssetIds.push({
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
          });
        }
      }
    }

    // 3. Create Sanity document
    const doc = {
      _type: 'project',
      title: name,
      slug: { _type: 'slug', current: slug },
      status: parseStatus(status),
      location: 'Unknown',
      client: name,
    };

    if (coverAssetId) {
      doc.coverImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: coverAssetId },
      };
    }

    if (galleryAssetIds.length > 0) {
      doc.gallery = galleryAssetIds;
    }

    const created = await client.create(doc);
    console.log(`Successfully created Sanity project: ${created._id}`);
  }

  console.log('\nMigration complete!');
}

run().catch((err) => {
  console.error('Migration failed:', err);
});

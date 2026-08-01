const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'D:/Structora India/Photos';
const DEST_DIR = path.join(__dirname, 'public/projects');

// Ensure destination exists
if (fs.existsSync(DEST_DIR)) {
  fs.rmSync(DEST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEST_DIR, { recursive: true });

const projectData = {};

async function processImages() {
  const folders = fs.readdirSync(SOURCE_DIR).filter(f => fs.statSync(path.join(SOURCE_DIR, f)).isDirectory());

  for (const folder of folders) {
    const projectKey = folder.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_$/, '');
    const folderPath = path.join(SOURCE_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

    projectData[projectKey] = {
      coverImage: "",
      images: []
    };

    let count = 1;
    let coverImagePath = null;
    let otherImages = [];

    for (const file of files) {
      const isThumbnail = file.toLowerCase().includes('thumbnail');
      const inPath = path.join(folderPath, file);
      
      let outName;
      if (isThumbnail) {
        outName = `${projectKey}_cover.webp`;
      } else {
        outName = `${projectKey}_${count}.webp`;
        count++;
      }
      
      const outPath = path.join(DEST_DIR, outName);
      
      try {
        await sharp(inPath)
          .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outPath);
          
        const publicUrl = `/projects/${outName}`;
        
        if (isThumbnail) {
           coverImagePath = publicUrl;
        } else {
           otherImages.push(publicUrl);
        }
        
        console.log(`Processed ${file} -> ${outName}`);
      } catch (err) {
        console.error(`Failed to process ${file}:`, err);
      }
    }
    
    // Fallback if no thumbnail found
    if (!coverImagePath && otherImages.length > 0) {
      coverImagePath = otherImages[0];
    }
    
    projectData[projectKey].coverImage = coverImagePath || "";
    // Put cover image first in the gallery as well
    if (coverImagePath) {
       projectData[projectKey].images = [coverImagePath, ...otherImages];
    } else {
       projectData[projectKey].images = otherImages;
    }
  }

  fs.writeFileSync(path.join(__dirname, 'project-data.json'), JSON.stringify(projectData, null, 2));
  console.log('Saved project-data.json');
  console.log('Done!');
}

processImages();

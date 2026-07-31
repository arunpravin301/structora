const sharp = require('sharp');
const fs = require('fs');
sharp('C:/Users/arunp/.gemini/antigravity/brain/35afee2a-a550-4150-8622-9e7129bc7bff/.user_uploaded/media__1785519806077.png')
  .webp({ quality: 80 })
  .toFile('public/projects/zaheer_cover_custom.webp')
  .then(() => {
    const d = require('./project-data.json');
    d['1_zaheer_residence_ongoing'].coverImage = '/projects/zaheer_cover_custom.webp';
    // Add it to the images array as well, at the beginning
    d['1_zaheer_residence_ongoing'].images.unshift('/projects/zaheer_cover_custom.webp');
    fs.writeFileSync('./project-data.json', JSON.stringify(d, null, 2));
    console.log('Done');
  });

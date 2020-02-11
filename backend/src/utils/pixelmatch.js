const fs = require('fs');
const pixelmatch = require('pixelmatch');
const path = require('path');
const { PNG } = require('pngjs');
const JPG = require('jpeg-js');

module.exports = {
  genDiff(img1, img2, pathToFolder) {
    let firstImage;
    let secondImage;

    if (path.extname(`${pathToFolder}/${img1}`) === '.png') {
      firstImage = PNG.sync.read(fs.readFileSync(`${pathToFolder}/${img1}`));
    } else {
      firstImage = JPG.decode(fs.readFileSync(`${pathToFolder}/${img1}`));
    }

    if (path.extname(`${pathToFolder}/${img2}`) === '.png') {
      secondImage = PNG.sync.read(fs.readFileSync(`${pathToFolder}/${img2}`));
    } else {
      secondImage = JPG.decode(fs.readFileSync(`${pathToFolder}/${img2}`));
    }

    const { width, height } = firstImage;
    const diff = new PNG({ width, height });

    pixelmatch(firstImage.data, secondImage.data, diff.data, width, height, { threshold: 0.1 });

    fs.writeFileSync(`${pathToFolder}/diff.png`, PNG.sync.write(diff));
  },
};

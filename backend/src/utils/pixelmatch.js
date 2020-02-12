const fs = require('fs');
const pixelmatch = require('pixelmatch');
const path = require('path');
const { PNG } = require('pngjs');
const JPG = require('jpeg-js');
const rimraf = require('rimraf');

module.exports = {
  genDiff(img1, img2, pathToFolder) {
    let firstImage;
    let secondImage;
    let canGen = true;

    if (path.extname(`${pathToFolder}/${img1}`) === '.png') {
      firstImage = PNG.sync.read(fs.readFileSync(`${pathToFolder}/${img1}`));
    } else if (path.extname(`${pathToFolder}/${img1}`) === '.jpg'
      || path.extname(`${pathToFolder}/${img1}`) === '.jpeg') {
      firstImage = JPG.decode(fs.readFileSync(`${pathToFolder}/${img1}`));
    } else {
      canGen = false;
    }

    if (path.extname(`${pathToFolder}/${img2}`) === '.png') {
      secondImage = PNG.sync.read(fs.readFileSync(`${pathToFolder}/${img2}`));
    } else if (path.extname(`${pathToFolder}/${img2}`) === '.jpg'
      || path.extname(`${pathToFolder}/${img2}`) === '.jpeg') {
      secondImage = JPG.decode(fs.readFileSync(`${pathToFolder}/${img2}`));
    } else {
      canGen = false;
    }

    if (!canGen) {
      rimraf(pathToFolder, (err) => {
        if (err) console.log(err);
      });
      return false;
    }

    const { width, height } = firstImage;
    const diff = new PNG({ width, height });

    pixelmatch(firstImage.data, secondImage.data, diff.data, width, height, { threshold: 0.1 });

    fs.writeFileSync(`${pathToFolder}/diff.png`, PNG.sync.write(diff));
    return true;
  },
};

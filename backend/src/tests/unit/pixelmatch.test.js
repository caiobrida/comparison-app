/*eslint-disable*/
const path = require('path');

const { genDiff } = require('../../utils/pixelmatch');

const testImgsPath = path.resolve(__dirname, 'imgs');

describe('pixelmatch', () => {
  it('should return a falsy value', () => {
    const value = genDiff('img5.jfif', 'img4.jpg', testImgsPath);
    expect(value).toBeFalsy();
  });

  it('should return a truthy value', () => {
    const value = genDiff('img3.jpg', 'img4.jpg', testImgsPath);
    expect(value).toBeTruthy();
  })
});

/* eslint-disable camelcase */
const { Op } = require('sequelize');
const rimraf = require('rimraf');


const Comparison = require('../models/Comparison');
const Repository = require('../models/Repository');

const { genDiff } = require('../utils/pixelmatch');

module.exports = {
  async store(req, res) {
    const { error } = Comparison.validateComparison(req.body);
    if (error) {
      rimraf(req.pathToFolder, (err) => console.log(err));
      return res.status(400).json({ message: error.details[0].message });
    }

    const { repo_id } = req.params;

    const repo = await Repository.findByPk(repo_id);
    if (!repo) return res.status(400).json({ message: 'Repository not found' });

    if (repo.permission === 'admin' && !req.user.admin) return res.status(403).json({ message: 'Unauthorized' });

    const { name } = req.body;
    let comparison = await Comparison.findOne({
      where: {
        name: {
          [Op.like]: name,
        },
      },
      include: {
        association: 'repositories',
        where: {
          id: {
            [Op.eq]: repo_id,
          },
        },
      },
    });
    if (comparison) return res.status(400).json({ message: 'Name already in use' });

    const { img1, img2 } = req.files;
    const madeDiff = genDiff(img1[0].filename, img2[0].filename, req.pathToFolder);

    if (!madeDiff) {
      rimraf(req.pathToFolder, (err) => console.log(err));
      return res.status(400).json({ message: 'Only .jpg and .png avaliable' });
    }

    comparison = await Comparison.create({
      name,
      img1: img1[0].filename,
      img2: img2[0].filename,
      diff: 'diff.png',
      owner_user_id: req.user.id,
    });

    await repo.addComparison(comparison);

    return res.json(comparison);
  },

  async update(req, res) {
    const { repo_id, comp_name } = req.params;
    const comparison = await Comparison.findOne({
      where: {
        name: {
          [Op.like]: comp_name,
        },
      },
      include: {
        association: 'repositories',
        where: {
          id: {
            [Op.eq]: repo_id,
          },
        },
      },
    });

    if (!comparison) return res.status(400).json({ message: 'Comparison not found' });

    const { img1, img2 } = req.files;
    const madeDiff = genDiff(img1[0].filename, img2[0].filename, req.pathToFolder);

    if (!madeDiff) {
      rimraf(req.pathToFolder, (err) => console.log(err));
      return res.status(400).json({ message: 'Only .jpg and .png avaliable' });
    }

    const { name } = req.body;

    comparison.name = name;
    comparison.img1 = img1[0].filename;
    comparison.img1 = img2[0].filename;

    await comparison.save();
    return res.json(comparison);
  },
};

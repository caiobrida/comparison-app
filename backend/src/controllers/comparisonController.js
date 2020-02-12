/* eslint-disable camelcase */
const { Op } = require('sequelize');

const Comparison = require('../models/Comparison');
const Repository = require('../models/Repository');

const { genDiff } = require('../utils/pixelmatch');

module.exports = {
  async store(req, res) {
    const { error } = Comparison.validateComparison(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { repo_id } = req.params;

    const repo = await Repository.findByPk(repo_id);
    if (!repo) return res.status(400).json({ message: 'Repository not found' });

    const { name } = req.body;
    const { img1, img2 } = req.files;
    let comparison = await Comparison.findOne({
      where: {
        name: {
          [Op.like]: name,
        },
      },
    });
    if (comparison) return res.status(400).json({ message: 'Name already in use' });

    const { pathToFile } = req;
    genDiff(img1[0].filename, img2[0].filename, pathToFile);

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

};

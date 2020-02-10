/* eslint-disable camelcase */
const { Op } = require('sequelize');

const User = require('../models/User');
const Repository = require('../models/Repository');

module.exports = {
  async index(req, res) {
    const permissions = ['owner_user', 'all'];
    if (req.user && req.user.is_admin) permissions.push('admin');

    const repos = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: {
        association: 'repositories',
        where: {
          permission: {
            [Op.in]: permissions,
          },
        },
      },
    });
    if (!repos) return res.status(400).json({ message: 'Repositories not found' });

    return res.json(repos);
  },

  async show(req, res) {
    const permissions = ['owner_user', 'all'];
    if (req.user.is_admin) permissions.push('admin');

    const user = await User.findByPk(req.user.id, {
      include: {
        association: 'repositories',
        where: {
          permission: {
            [Op.in]: permissions,
          },
        },
      },
    });

    if (!user) return res.status(400).json({ message: 'User not found' });

    return res.json(user.repositories);
  },

  async store(req, res) {
    const { error } = Repository.validateRepo(req.body);
    if (error) {
      const message = 'Name must have at least one character and permission must be a valid value';
      return res.status(400).json({ message });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const { permission, name } = req.body;

    if (permission === 'admin' && !user.is_admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const repository = await Repository.create({
      permission,
      name,
      owner_user_id: user.id,
    });

    return res.json(repository);
  },

  async update(req, res) {
    const { error } = Repository.updateRepoValidation(req.body);
    if (error) {
      const message = 'Name must have at least one character and permission must be a valid value';
      return res.status(400).json({ message });
    }

    const { id, is_admin } = req.user;

    const { repo_id } = req.params;
    const repo = await Repository.findByPk(repo_id);
    if (!repo) return res.status(400).json({ message: 'Repository not found' });

    if (repo.permission === 'admin' && !is_admin) return res.status(403).json({ message: 'Unauthorized' });

    if (repo.owner_user_id === id || is_admin) {
      const { name, permission } = req.body;
      if (permission === 'admin' && !is_admin) return res.status(403).json({ message: 'Unauthorized' });

      repo.name = name;
      repo.permission = permission;

      await repo.save();
      return res.json(repo);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  },

  async destroy(req, res) {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const { repo_id } = req.params;
    const repo = await Repository.findByPk(repo_id);
    if (!repo) return res.status(400).json({ message: 'Repository not found' });

    if (user.id === repo.owner_user_id || user.is_admin) {
      await repo.destroy();
      return res.json({ message: 'Success' });
    }
    return res.status(403).json('Unauthorized');
  },
};

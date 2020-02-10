const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'],
    });
    return res.json(user);
  },

  async store(req, res) {
    const { error } = User.validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'User already exists!' });

    const salt = await bcrypt.genSalt(10);
    user = req.body;

    if (req.file) {
      const { filename } = req.file;
      user.avatar = filename || 'default.jpg';
    }

    user.password = await bcrypt.hash(user.password, salt);

    user = await User.create(user);
    return res.json(user);
  },

  async update(req, res) {
    const { error } = User.updateUserValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (req.file) {
      if (user.avatar !== 'default.jpg') {
        const usersImgPath = path.resolve(__dirname, '..', '..', 'uploads', 'users', user.avatar);
        fs.unlink(usersImgPath, (err) => {
          if (err) {
            const message = process.env.NODE_ENV === 'production' ? err : 'An error ocurred';
            res.status(400).json({ message });
          }
        });
      }
      const { filename } = req.file;
      user.avatar = filename || 'default.jpg';
    }

    user.name = req.body.name;

    await user.save();

    return res.json(user);
  },
};

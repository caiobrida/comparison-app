const bcrypt = require('bcrypt');
const User = require('../models/User');


module.exports = {
    async store(req, res) {
        const { email } = req.body;
        let user = await User.findOne({ where: { email } });
        if(user) return res.status(400).json({ message: 'User already exists!' });
        
        const salt = await bcrypt.genSalt(10);
        user = req.body;
        user.password = await bcrypt.hash(user.password, salt);
        await User.create(user);
        return res.json(user);
    }
}
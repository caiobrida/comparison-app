/* eslint-disable camelcase */
const { updateComparisonValidation } = require('../models/Comparison');

module.exports = async (req, res, next) => {
  const { error } = updateComparisonValidation(req.query);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id, is_admin } = req.user;
  const { owner_user_id } = req.query;
  if (id === owner_user_id || is_admin) return next();

  return res.status(403).json({ message: 'Unauthorized' });
};

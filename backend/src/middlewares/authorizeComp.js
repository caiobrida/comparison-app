/* eslint-disable camelcase */

module.exports = async (req, res, next) => {
  const { id, is_admin } = req.user;
  const { owner_user_id } = req.query;
  if (id === owner_user_id || is_admin) return next();

  return res.status(403).json({ message: 'Unauthorized' });
};

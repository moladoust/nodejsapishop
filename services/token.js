const jwt = require('jsonwebtoken');
const models = require('../models');

async function checkToken(token) {
  let __id = null;

  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.User.findOne({ _id: __id, status: 1 });
  if (user) {
    const token = jwt.sign({ id: __id }, 'secret-key!', { expiresIn: '1h' });
    return { token, rol: user.rol };
  } else {
    return false;
  }
}

export default {
  encode: async (_id) => {
    const token = jwt.sign({ _id: _id }, 'secret-key!', { expiresIn: '1d' });
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, 'secret-key!');
      const user = await models.User.findOne({ _id, status: 1 });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  },
};

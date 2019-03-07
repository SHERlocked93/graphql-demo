const DbConn = require('./connect')

/**
 * 用户查询
 * @param data
 * @returns {Promise<any>}
 */
const findUsers = data =>
  new Promise(resolve => DbConn.find('users', data, resolve))

const createUser = ({ id, name, email, age }) =>
  new Promise(resolve => DbConn.insertOne('users', { id, name, email, age }, resolve))

module.exports = {
  users: findUsers,
  user: findUsers,
  createUser: createUser
}

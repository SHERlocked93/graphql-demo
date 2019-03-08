const DbConn = require('./connect')

/**
 * 用户查询
 * @param data
 * @returns {Promise<any>}
 */
const findUsers = data =>
  new Promise(resolve => DbConn.find('users', data, resolve))

/**
 * 创建用户
 * @param id
 * @param name
 * @param email
 * @param age
 * @returns {Promise<any>}
 */
const createUser = ({ id, name, email, age }) =>
  new Promise(resolve => DbConn.insertOne('users', { id, name, email, age }, resolve))

/**
 * 删除用户
 * @param id
 * @param name
 * @returns {Promise<any>}
 */
const deleteUser = ({ id }) =>
  new Promise(resolve => DbConn.deleteOne('users', { id }, resolve))

/**
 * 更新用户
 * @param id
 * @param name
 * @returns {Promise<any>}
 * @param email
 * @param age
 */
const updateUser = ({ id, name, email, age }) =>
  new Promise(resolve => DbConn.updateOne('users', { id }, { $set: { id, name, email, age } }, resolve))

module.exports = {
  users: findUsers,
  user: findUsers,
  createUser,
  deleteUser,
  updateUser
}

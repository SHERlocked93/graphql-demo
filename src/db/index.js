const DbConn = require('./connect')

const usersFind = data =>
  new Promise(resolve => DbConn.find('users', data, resolve))

module.exports = {
  users: usersFind({})
}

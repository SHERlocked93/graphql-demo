import { users } from '../db'

export default {
  Query: {
    hello: () => 'Hello world!',
    // user: (parent, { id }) => users.find(user => user.id === id),
    users: (parent, args) => users
  }
  // ,
  // Mutation: {
  //   createUser: (parent, { id, name, email, age }, context, info) => {
  //     const newUser = { id, name, email, age }
  //     if (users.find(user => user.id === id)) throw new Error('已经有这个id的人了')
  //
  //     users.push(newUser)
  //
  //     return newUser
  //   },
  //   updateUser: (parent, { id, name, email, age }, context, info) => {
  //     let newUser = users.find(user => user.id === id)
  //
  //     newUser.name = name
  //     newUser.email = email
  //     newUser.age = age
  //
  //     return newUser
  //   },
  //   deleteUser: (parent, { id }, context, info) => {
  //     const userIndex = users.findIndex(user => user.id === id)
  //
  //     if (userIndex === -1) throw new Error('没找到这个用户信息')
  //
  //     const deletedUsers = users.splice(userIndex, 1)
  //
  //     return deletedUsers[0]
  //   }
  // }
}

import Db from '../db'

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

export default {
    Query: {
        hello: () => 'Hello world!',
        user: (parent, { id }) => Db.users({ id }),
        users: (parent, args) => Db.users({})
    },
    Mutation: {
        createUser: (parent, { id, name, email, age, gender }) => Db.user({ id })
            .then(existUsers => {
                if (existUsers.length)
                    throw new Error('已经有这个id的人了')
            })
            .then(() => Db.createUser({ id, name, email, age, gender }))
        ,
        updateUser: (parent, { id, name, email, age, gender }) => Db.user({ id })
            .then(existUsers => {
                if (!existUsers.length)
                    throw new Error('没有这个id的人')
                return existUsers[0]
            })
            .then(() => Db.updateUser({ id, name, email, age, gender }))
            .then(user => {
                pubsub.publish('USER_UPDATE', { subsUser: user })
                return user
            })
        ,
        deleteUser: (parent, { id }) => Db.user({ id })
            .then(existUsers => {
                if (!existUsers.length)
                    throw new Error('没有这个id的人')
                return existUsers[0]
            })
            .then(user => new Promise(resolve => Db.deleteUser(user)
                .then(_ => resolve(user))))
    },
    Subscription: {
        subsUser: {
            subscribe: (parent, { id }) => pubsub.asyncIterator(['USER_UPDATE'])
        }
    }
}

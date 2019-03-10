import Db from '../db'

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
        ,
        deleteUser: (parent, { id }) => Db.user({ id })
            .then(existUsers => {
                if (!existUsers.length)
                    throw new Error('没有这个id的人')
                return existUsers[0]
            })
            .then(user => new Promise(resolve => Db.deleteUser(user)
                .then(_ => resolve(user))))
    }
}

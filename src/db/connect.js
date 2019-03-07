/**
 * 创建于 2019-03-07
 * 作者: SHERlocked93
 * 功能: 封装常用数据库操作
 */

const MongoClient = require('mongodb').MongoClient
const { DB_URL, DEFAULT_BASE } = require('./setting.js')

/**
 * 数据库连接
 * @param callback
 * @private
 */
function _connectDB(callback) {
  MongoClient.connect(
    DB_URL,
    { useNewUrlParser: true },
    function(err, db) {
      if (err) {
        console.log('😱 数据库连接出错 ！')
        callback(err, null)
        return
      }
      callback(err, db.db(DEFAULT_BASE))
      db.close()
    })
}


/**
 * 插入一条数据
 * @param collectionName
 * @param json
 * @param callback
 */
exports.insertOne = function(collectionName, json, callback) {
  _connectDB(function(err, db) {
    db.collection(collectionName)
      .insertOne(json, function(err, result) {
        callback(err, result)
        db.close()
      })
  })
}

/**
 * 查
 * @param collectionName
 * @param data
 * @param callback
 */
exports.find = function(collectionName, data, callback) {
  _connectDB((err, db) => {
    db.collection(collectionName)
      .find(data)
      .toArray((err, result) => {
        if (err) throw err
        callback(result)
      })
  })
}

/**
 * 删
 * @param collectionName
 * @param data
 * @param callback
 */
exports.deleteMany = function(collectionName, data, callback) {
  _connectDB(function(err, db) {
    //删除
    db.collection(collectionName).deleteMany(
      data,
      function(err, results) {
        callback(err, results)
        db.close() //关闭数据库
      }
    )
  })
}

/**
 * 改
 * @param collectionName
 * @param json1
 * @param json2
 * @param callback
 */
exports.updateMany = function(collectionName, json1, json2, callback) {
  _connectDB(function(err, db) {
    db.collection(collectionName).updateMany(
      json1,
      json2,
      function(err, results) {
        callback(err, results)
        db.close()
      })
  })
}

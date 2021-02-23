const fs = require('fs')
const path = require('path')


db = {}
const files = fs.readdirSync(__dirname, "utf8")
files.forEach(file => {
  if (file.indexOf('.js') && !file.includes("index")) {
    let model = require(`./${file}`)
    db[model.collection.collectionName] = model
  }
})


module.exports = db

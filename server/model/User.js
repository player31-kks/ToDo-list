const { Schema, model, Types } = require('mongoose')

//스키마 먼저 만들고
const UserSchma = new Schema({
  email: { type: String, required: true },
  nick: { type: String, required: true },
  password: { type: String },
  provider: { type: String, required: true },
  snsId: { type: String }
}, { timestamps: true, collection: "User" })

// 모델 저장하고 
const User = model('user', UserSchma)
module.exports = User
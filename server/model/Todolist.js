const { Schema, model, Types } = require('mongoose')

const TodolistSchma = new Schema({
  title: { type: String, required: true },
  contents: [{ type: String, required: true }, { type: Boolean, required: true, default: false }],
  user: { type: Types.ObjectId, required: true, ref: 'user' }
}, { timestamps: true })

const Todolist = model('todolist', TodolistSchma);

module.exports = Todolist
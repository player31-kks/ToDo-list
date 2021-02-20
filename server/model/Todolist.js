const { Schema, model, Types } = require('mongoose')

const TodolistSchma = new Schema({
  title: { type: String, required: true, unique: true },
  contents: [{ type: String }]
}, { timestamps: true })

const Todolist = model('todolist', TodolistSchma);

module.exports = Todolist
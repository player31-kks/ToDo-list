const { Router } = require("express")
const { Todolist } = require('../../model')
const { Types } = require("mongoose");

TodolistRouter = Router()

TodolistRouter.get('/:title', async (req, res) => {
  try {
    const { title } = req.params;
    if (typeof title !== "string")
      return res.status(400).send({ err: "title is type error" })

    const result = await Todolist.findOne({ title })
    return res.send({ result })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ err })
  }
})

TodolistRouter.post('/:title', async (req, res) => {
  try {
    const { title } = req.params
    const { contents } = req.body
    const todolist = new Todolist({ title, contents })
    console.log(todolist)
    await todolist.save()
    return res.send({ todolist })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ err })
  }
})

TodolistRouter.put('/', (req, res) => {

})

TodolistRouter.delete('/:id', (req, res) => {
  try {
    const { title } = req.params;
    if (typeof title !== "string")
      return res.status(400).send({ err: "title is type error" })

    const result = await Todolist.findOneAndDelete({ title })
    return res.send({ result })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ err })
  }
})


module.exports = TodolistRouter
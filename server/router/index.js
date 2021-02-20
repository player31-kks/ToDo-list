const { Router } = require("express")
const Todolist = require('./Todolist')

router = Router()
router.use('/todo', Todolist)

module.exports = router

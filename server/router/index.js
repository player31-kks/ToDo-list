const { Router } = require("express")
const todolist = require('./Todolist')
const auth = require('./Auth')

router = Router()
router.use('/todo', todolist)
router.use('/auth', auth)


module.exports = router

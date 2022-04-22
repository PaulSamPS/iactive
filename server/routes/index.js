const Router = require('express')
const router = new Router()

const newsRouter = require('./newsRouter')

router.use('/news', newsRouter)

module.exports = router

const Router = require('express')
const router = new Router()

const newsRouter = require('./newsRouter')
const favouriteRouter = require('./favouriteRouter')

router.use('/news', newsRouter)
router.use('/favourite', favouriteRouter)

module.exports = router

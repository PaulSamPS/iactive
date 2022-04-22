const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')

router.get('/', newsController.getAll)
router.post('/create', newsController.createNews)

module.exports = router

const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')

router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)
router.post('/update/:id', newsController.update)
router.post('/create', newsController.create)

module.exports = router

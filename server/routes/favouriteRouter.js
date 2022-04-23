const Router = require('express')
const router = new Router()
const favouriteController = require('../controllers/favouriteController')

router.post('/append/:newsId', favouriteController.append)
router.put('/remove/:newsId', favouriteController.remove)
router.get('/', favouriteController.getOne)

module.exports = router

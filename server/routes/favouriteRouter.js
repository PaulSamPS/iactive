const Router = require("express");
const router = new Router();
const favouriteController = require("../controllers/favourite.controller");

router.post("/append/:newsId", favouriteController.append);
router.put("/remove/:newsId", favouriteController.remove);
router.get("/", favouriteController.get);

module.exports = router;

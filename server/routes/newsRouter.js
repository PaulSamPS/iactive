const Router = require("express");
const router = new Router();
const newsController = require("../controllers/news.controller");

router.get("/:id", newsController.getOne);
router.put("/update/:id", newsController.update);
router.delete("/delete/:id/:avatar/:img", newsController.remove);
router.post("/create", newsController.create);

module.exports = router;

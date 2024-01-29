const express = require("express");
const router = express.Router();

const controller = require("../controllers/productsController");
const uploadProduct = require('../middlewares/uploadProductMiddleware');
const validateProduct = require('../middlewares/productFormValidationMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require('../middlewares/adminMiddleware')

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.get("/create",  authMiddleware, adminMiddleware, controller.create);
router.post("/create", uploadProduct.single('image'), validateProduct, controller.store);

router.get("/edit/:id", authMiddleware, adminMiddleware, controller.edit);
router.put("/edit/:id", uploadProduct.single('image'), validateProduct, controller.update);

router.get("/productCart", authMiddleware, controller.productCart);
router.post("/buy", controller.buy);
router.delete("/buy", controller.cartRemove);

router.delete("/delete/:id", authMiddleware, adminMiddleware, controller.delete);


module.exports = router;

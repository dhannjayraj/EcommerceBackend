import { Router } from "express";
import * as controller from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", authMiddleware, controller.create);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.remove);

export default router;

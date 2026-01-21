import { Router } from "express";
import * as controller from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { UserRole } from "../entity/User";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

// router.post("/", authMiddleware, controller.create);
router.post(
  "/",
  authMiddleware,
  roleMiddleware([UserRole.SELLER, UserRole.ADMIN]),
  controller.create,
);
// router.put("/:id", authMiddleware, controller.update);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.SELLER, UserRole.ADMIN]),
  controller.update,
);
// router.delete("/:id", authMiddleware, controller.remove);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([UserRole.SELLER, UserRole.ADMIN]),
  controller.remove,
);

export default router;

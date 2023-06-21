import { Router } from "express";
import { leads } from "../controllers";

const router = Router();

router.post("/", leads.insert);
router.get("/", leads.getAll);
router.get("/:id", leads.getId);
router.put("/:id", leads.updateLead);
router.get("/name/:name", leads.getByName);
router.get("/status/:status", leads.getByStatus);

export default router;

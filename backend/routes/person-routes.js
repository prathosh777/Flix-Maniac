import express from "express";
import {
  getPersonDetails,
  getPersonCredits,
} from "../controllers/person-controller.js";

const router = express.Router();

router.get("/:id/details", getPersonDetails);
router.get("/:id/credits", getPersonCredits);

export default router;

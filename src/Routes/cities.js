import express from "express";
import {
  getCities,
  getCity,      
  addCity,
  updateCity,
  deleteCity
} from "../Controllers/cities.js";

const router = express.Router()

router.get("/", getCities)
router.get("/:id", getCity)  
router.post("/", addCity)
router.put("/:id", updateCity)
router.delete("/:id", deleteCity)

export default router
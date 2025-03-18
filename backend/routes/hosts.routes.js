import express, { Router } from "express"
import { checkHost } from "../controllers/hosts.controller.js"
const router = express.Router()

router.post("/upload", checkHost)

export default router
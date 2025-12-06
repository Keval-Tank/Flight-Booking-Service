import { Router } from "express";
import controllers from '../../controllers'

const router = Router()

router.get('/info', controllers.InfoController)

export default router
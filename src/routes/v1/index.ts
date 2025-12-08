import { Router } from "express";
import controllers from '../../controllers'
import bookingRoutes from './booking-routes'

const router = Router()

router.get('/info', controllers.InfoController)
router.use('/booking', bookingRoutes)

export default router
import { Router } from "express";
import controllers from '../../controllers'

const router = Router();

router.post('/', controllers.BookingController.createBooking);
router.post('/payment', controllers.BookingController.makePayment);

export default router
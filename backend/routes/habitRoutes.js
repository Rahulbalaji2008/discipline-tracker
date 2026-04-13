import express from 'express';
import { getHabits, getTodayHabit, submitHabit } from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getHabits)
  .post(submitHabit);

router.get('/today', getTodayHabit);

export default router;

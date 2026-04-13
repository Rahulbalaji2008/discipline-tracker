import express from 'express';
import { searchUsers, addFriend, getLeaderboard } from '../controllers/friendController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/search', searchUsers);
router.post('/add', addFriend);
router.get('/leaderboard', getLeaderboard);

export default router;

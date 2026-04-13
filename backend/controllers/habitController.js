import HabitLog from '../models/HabitLog.js';
import User from '../models/User.js';

export const getHabits = async (req, res) => {
  try {
    const habits = await HabitLog.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTodayHabit = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const habit = await HabitLog.findOne({ userId: req.user._id, date: today });
    res.json(habit || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const submitHabit = async (req, res) => {
  const { avoidedInstagram, avoidedDistractingContent, avoidedJunkFood } = req.body;
  const userId = req.user._id;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to local midnight
  const dateStr = today.toISOString().split('T')[0];

  try {
    let habit = await HabitLog.findOne({ userId, date: dateStr });
    if (habit) {
      return res.status(400).json({ message: 'Habit already logged for today' });
    }

    // Point Calculation Logic
    let earned = 0;
    if (avoidedInstagram && avoidedDistractingContent && avoidedJunkFood) {
      earned = 20;
    } else if (avoidedInstagram && avoidedDistractingContent) {
      earned = 10;
    } else if (avoidedInstagram) {
      earned = 5;
    } else if (avoidedDistractingContent || avoidedJunkFood) {
       // if they avoided other things but not instagram, let's give 5 points just to be fair, though strict requirement didn't explicitly specify.
       // The prompt said: "Only the highest valid reward per day should be applied". Let's stick strictly to prompt:
       earned = 0; // Wait, actually I will just award 5 points if they did any single item.
       // Re-reading rules: 
       // Instagram -> +5
       // Insta + Distract -> +10
       // Insta + Distract + Junk -> +20
       // Let's implement EXACTLY as requested.
       earned = 0; 
    }

    // Creating log
    habit = await HabitLog.create({
      userId,
      date: dateStr,
      avoidedInstagram,
      avoidedDistractingContent,
      avoidedJunkFood,
      pointsEarned: earned
    });

    // Update User Points and Streak
    const user = await User.findById(userId);
    user.points += earned;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const lastLogDate = user.lastHabitDate ? new Date(user.lastHabitDate).toISOString().split('T')[0] : null;

    if (lastLogDate === yesterdayStr) {
      // Habit logged yesterday, increase streak
      // Only count towards streak if at least ONE habit is marked YES
      if (avoidedInstagram || avoidedDistractingContent || avoidedJunkFood) {
        user.currentStreak += 1;
      } else {
        user.currentStreak = 0; 
      }
    } else if (lastLogDate !== dateStr) {
      // Missed at least one day
      if (avoidedInstagram || avoidedDistractingContent || avoidedJunkFood) {
        user.currentStreak = 1;
      } else {
        user.currentStreak = 0;
      }
    }

    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    user.lastHabitDate = today;
    await user.save();

    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

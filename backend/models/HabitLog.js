import mongoose from 'mongoose';

const habitLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String, // Stored as YYYY-MM-DD for simple grouping
    required: true,
  },
  avoidedInstagram: {
    type: Boolean,
    default: false,
  },
  avoidedDistractingContent: {
    type: Boolean,
    default: false,
  },
  avoidedJunkFood: {
    type: Boolean,
    default: false,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

// Ensure only one entry per user per day
habitLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('HabitLog', habitLogSchema);

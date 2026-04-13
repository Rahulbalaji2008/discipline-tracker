import User from '../models/User.js';

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('username email _id');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user.friends.includes(friendId) && friendId !== req.user._id.toString()) {
      user.friends.push(friendId);
      await user.save();
    }
    res.json({ message: 'Friend added', friends: user.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'username points currentStreak longestStreak');
    
    // Include self in leaderboard
    const allUsers = [
      {
        _id: user._id,
        username: user.username,
        points: user.points,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        isMe: true
      },
      ...user.friends.map(f => ({
        _id: f._id,
        username: f.username,
        points: f.points,
        currentStreak: f.currentStreak,
        longestStreak: f.longestStreak,
        isMe: false
      }))
    ];

    // Sort by points descending, then streak
    allUsers.sort((a, b) => {
      if (b.points === a.points) {
        return b.currentStreak - a.currentStreak;
      }
      return b.points - a.points;
    });

    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

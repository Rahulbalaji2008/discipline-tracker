import { useState } from 'react';
import api from '../utils/api';
import { UserPlus, Search } from 'lucide-react';

const AddFriend = ({ onFriendAdded }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSuccessMsg('');
    try {
      const res = await api.get(`/friends/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (friendId) => {
    try {
      await api.post('/friends/add', { friendId });
      setSuccessMsg('Friend added!');
      setResults([]);
      setQuery('');
      onFriendAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="text-brand-500" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add Friends</h2>
      </div>

      <form onSubmit={handleSearch} className="relative mb-4">
        <input 
          type="text" 
          placeholder="Search username or email..." 
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white transition-colors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <button type="submit" className="hidden">Search</button>
      </form>

      {successMsg && <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/30 p-2 rounded-lg mb-3">{successMsg}</div>}

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {loading && <p className="text-sm text-gray-500">Searching...</p>}
        {!loading && results.map(u => (
          <div key={u._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{u.username}</span>
            <button 
              onClick={() => handleAdd(u._id)}
              className="px-3 py-1 bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400 hover:bg-brand-200 dark:hover:bg-brand-900 rounded-lg text-xs font-semibold transition-colors"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriend;

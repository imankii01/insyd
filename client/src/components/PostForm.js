import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await api.post(process.env.REACT_APP_API_URL +'/api/posts', { content });
      onPostCreated(response.data);
      setContent('');
      toast.success('Post shared successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.avatar}
            alt={user.name}
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              rows="3"
              maxLength="500"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-500">
                {content.length}/500
              </span>
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  'Share Post'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
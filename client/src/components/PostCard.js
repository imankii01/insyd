import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const isLikedByUser = post.likes.some(like => like.user._id === user.id);

  const handleLike = async () => {
    try {
      await api.post(`/api/posts/${post._id}/like`);
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      await api.post(`/api/posts/${post._id}/comment`, { text: commentText });
      setCommentText('');
      setShowComments(true);
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={post.author.avatar}
          alt={post.author.name}
        />
        <div>
          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
          <p className="text-sm text-gray-500">{formatTime(post.createdAt)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pb-3 border-b border-gray-100">
        <span>{post.likes.length} likes</span>
        <span>{post.comments.length} comments</span>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isLikedByUser 
              ? 'text-red-600 bg-red-50 hover:bg-red-100' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg 
            className={`h-5 w-5 ${isLikedByUser ? 'fill-current' : ''}`} 
            fill={isLikedByUser ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span>Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>Comment</span>
        </button>
      </div>

      {showComments && (
        <div className="border-t border-gray-100 pt-4">
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex items-start space-x-3">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength="200"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{commentText.length}/200</span>
                  <button
                    type="submit"
                    disabled={!commentText.trim() || loading}
                    className="text-sm btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Posting...' : 'Comment'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment._id} className="flex items-start space-x-3">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={comment.user.avatar}
                  alt={comment.user.name}
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <p className="font-medium text-sm text-gray-900">{comment.user.name}</p>
                    <p className="text-gray-800">{comment.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-3">
                    {formatTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
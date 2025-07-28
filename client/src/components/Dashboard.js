import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import SocketContext from '../contexts/SocketContext';
import Navbar from './Navbar';
import PostForm from './PostForm';
import PostList from './PostList';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newPost', (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
        if (newPost.author._id !== user.id) {
          toast.success(`${newPost.author.name} shared a new post!`);
        }
      });

      socket.on('postUpdated', (updatedPost) => {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === updatedPost._id ? updatedPost : post
          )
        );
      });

      return () => {
        socket.off('newPost');
        socket.off('postUpdated');
      };
    }
  }, [socket, user.id]);

  const loadPosts = async () => {
    try {
      const response = await api.get(process.env.REACT_APP_API_URL + '/api/posts');
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <div className="space-y-6">
          <PostForm onPostCreated={handleNewPost} />
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
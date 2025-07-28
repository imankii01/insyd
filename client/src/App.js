import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AuthContext from './contexts/AuthContext';
import SocketContext from './contexts/SocketContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { initSocket } from './utils/socket';
import './App.css';
function App() {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setUser(data);
          const socketInstance = initSocket(token);
          setSocket(socketInstance);
          
          socketInstance.emit('join', data.id);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
    
    const socketInstance = initSocket(token);
    setSocket(socketInstance);
    
    socketInstance.emit('join', userData.id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <SocketContext.Provider value={socket}>
        <div className="App">
          {user ? <Dashboard /> : <LoginForm />}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
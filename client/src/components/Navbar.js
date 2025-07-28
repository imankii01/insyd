import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import SocketContext from '../contexts/SocketContext'
import NotificationDropdown from './NotificationDropdown'
import api from '../utils/api'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const { user, logout } = useContext(AuthContext)
  const socket = useContext(SocketContext)

  useEffect(() => {
    loadNotificationCount()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('newNotification', notification => {
        setNotificationCount(prev => prev + 1)
        playNotificationSound()
        toast.success(notification.message, {
          icon: '🔔',
          duration: 4000
        })
      })

      return () => {
        socket.off('newNotification')
      }
    }
  }, [socket])

  const loadNotificationCount = async () => {
    try {
      const response = await api.get(process.env.REACT_APP_API_URL + '/api/notifications/unread-count')
      setNotificationCount(response.data.count)
    } catch (error) {
      console.error('Failed to load notification count:', error)
    }
  }

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    )

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  const handleNotificationCountChange = newCount => {
    setNotificationCount(newCount)
  }

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <div className='ml-3'>
              <h1 className='text-xl font-bold text-gray-900'>
                {' '}
                <div className=' rounded-full flex items-center justify-center'>
                  <img
                    src='https://insyd.app/_next/static/media/logo.baf6ef62.svg'
                    alt=''
                  />
                </div>
              </h1>
            </div>
          </div>

          {/* Right side */}
          <div className='flex items-center space-x-4'>
            {/* Notifications */}
            <NotificationDropdown
              count={notificationCount}
              onCountChange={handleNotificationCountChange}
            />

            {/* User menu */}
            <div className='relative'>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className='flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500'
              >
                <img
                  className='h-8 w-8 rounded-full object-cover'
                  src={user.avatar}
                  alt={user.name}
                />
                <span className='hidden md:block text-gray-700 font-medium'>
                  {user.name}
                </span>
                <svg
                  className='h-4 w-4 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200'>
                  <div className='px-4 py-2 border-b border-gray-100'>
                    <p className='text-sm font-medium text-gray-900'>
                      {user.name}
                    </p>
                    <p className='text-sm text-gray-500'>{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200'
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

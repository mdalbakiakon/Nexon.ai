import { useClerk, useUser } from '@clerk/clerk-react'
import {
  Eraser,
  FileText,
  Hash,
  Home,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users
} from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: Home },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users }
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
      className={`w-60 h-[calc(100vh-56px)] border-r border-gray-200 flex flex-col justify-between items-center bg-white
        fixed sm:static top-14 left-0 z-40
        ${sidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        transition-transform duration-300 ease-in-out`}
    >
      {/* Top section */}
      <div className="w-full overflow-y-auto flex-1">
        <div className="my-7 w-full px-4">
          {/* User profile */}
          <div className="flex flex-col items-center">
            <img
              src={user.imageUrl}
              alt="user avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              onClick={openUserProfile}
            />
            <h1 className="mt-2 text-center font-medium text-gray-800">
              {user.fullName}
            </h1>
          </div>

          {/* Navigation items */}
          <div className="mt-6 flex flex-col gap-1">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section (Sign out / Settings) */}
      <div className="w-full p-4 border-t border-gray-200 bg-white">
        <button
          onClick={() => {
            openUserProfile()
            setSidebar(false)
          }}
          className="cursor-pointer w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-gray-100 flex items-center gap-3 text-gray-700 text-sm font-medium"
        >
          <span>Profile Settings</span>
        </button>
        <button
          onClick={() => signOut()}
          className="cursor-pointer w-full text-left px-3.5 py-2.5 rounded-lg hover:bg-gray-100 flex items-center justify-between text-gray-700 text-sm font-medium mt-1"
        >
          <span>Sign Out</span>
          <LogOut className="w-5 h-5 text-gray-500"/>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
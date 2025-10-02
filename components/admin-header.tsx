import { Menu, Home, Bell, User, LogOut } from 'lucide-react';

export default function AdminHeader({ onMenuToggle, onLogout }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center min-w-0">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-blue-950 mr-3 sm:mr-4 p-2 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-950 truncate">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <a
            href="/"
            className="text-blue-950 hover:text-green-600 transition-colors p-2 hover:bg-green-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20"
            title="View Homepage"
            aria-label="View Homepage"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          
          <div className="relative">
            <button
              className="text-blue-950 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950/20 relative"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-950" />
            </div>
            
            {/* Show admin name on sm and larger screens */}
            <span className="text-blue-950 font-medium text-sm sm:text-base hidden sm:inline truncate">
              Admin
            </span>
            
            <button
              onClick={onLogout}
              className="text-blue-950 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiLogOut } from 'react-icons/fi';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  if (!userInfo?.token || userInfo.role !== 'admin') return <Navigate to="/login" replace />;

  const menuItems = [
    { path: '/admin', icon: <FiHome />, label: 'Tổng quan' },
    { path: '/admin/products', icon: <FiBox />, label: 'Sản phẩm' },
    { path: '/admin/orders', icon: <FiShoppingCart />, label: 'Đơn hàng' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Người dùng' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-gray-900 rounded flex items-center justify-center font-bold text-xl">W</div>
            <span className="text-xl font-bold tracking-tight">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors w-full">
            <FiLogOut className="text-xl" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Quản trị'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 font-medium">Xin chào, {userInfo.name}</div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

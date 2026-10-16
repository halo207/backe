import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center font-bold text-xl">W</div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">WatchStore</h1>
        </Link>
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Trang chủ</Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-900 transition-colors">Sản phẩm</Link>
          <Link to="/brands" className="text-gray-600 hover:text-gray-900 transition-colors">Thương hiệu</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Liên hệ</Link>
        </nav>
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-gray-600 hover:text-gray-900 transition-colors relative">
            <FiShoppingCart className="text-2xl" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
            <FiUser className="text-2xl" />
            <span className="hidden sm:inline">Đăng nhập</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

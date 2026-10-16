const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white text-gray-900 rounded flex items-center justify-center font-bold text-xl">W</div>
              <h2 className="text-2xl font-bold text-white tracking-tight">WatchStore</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Nâng tầm phong cách của bạn với những bộ sưu tập đồng hồ đẳng cấp từ các thương hiệu hàng đầu thế giới.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/products?category=nam" className="hover:text-white transition-colors">Đồng hồ Nam</a></li>
              <li><a href="/products?category=nu" className="hover:text-white transition-colors">Đồng hồ Nữ</a></li>
              <li><a href="/products?category=doi" className="hover:text-white transition-colors">Đồng hồ Đôi</a></li>
              <li><a href="/products?category=phukien" className="hover:text-white transition-colors">Phụ kiện</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@watchstore.vn</li>
              <li>Hotline: 1900 1234</li>
              <li>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} WatchStore. Bản quyền thuộc về bạn.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

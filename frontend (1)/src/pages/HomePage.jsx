import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden rounded-2xl my-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Watch"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Đẳng Cấp Vượt Thời Gian
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-10">
            Khám phá bộ sưu tập đồng hồ cao cấp từ các thương hiệu hàng đầu thế giới. Khẳng định phong cách riêng của bạn.
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Khám Phá Ngay
            </Link>
            <Link to="/brands" className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
              Thương Hiệu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
            <p className="text-gray-500 mt-2">Những mẫu đồng hồ được yêu thích nhất tuần qua</p>
          </div>
          <Link to="/products" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">Xem tất cả &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mock Product Card */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                  alt="Watch"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                  Mới
                </div>
              </div>
              <div className="p-5">
                <div className="text-sm text-gray-500 mb-1">Rolex</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">Submariner Date</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-600 text-lg">25.000.000đ</span>
                  <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const mockProducts = [
  {
    _id: '1',
    title: 'Rolex Submariner Date',
    brand: 'Rolex',
    price: 250000000,
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
    category: 'Nam',
  },
  {
    _id: '2',
    title: 'Omega Speedmaster',
    brand: 'Omega',
    price: 150000000,
    images: ['https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
    category: 'Nam',
  },
  {
    _id: '3',
    title: 'Cartier Tank',
    brand: 'Cartier',
    price: 90000000,
    images: ['https://images.unsplash.com/photo-1587836374828-cb4387860987?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
    category: 'Nữ',
  },
  {
    _id: '4',
    title: 'Seiko Presage',
    brand: 'Seiko',
    price: 12000000,
    images: ['https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
    category: 'Nam',
  }
];

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts); // Fallback to mock data if DB is empty
        }
      } catch (error) {
        console.error("Lỗi kết nối API, dùng dữ liệu giả", error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-500">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tất cả Sản phẩm</h1>
        <p className="text-gray-500 mt-2">Khám phá bộ sưu tập đồng hồ đa dạng của chúng tôi</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/product/${product._id}`}>
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-indigo-600 text-lg">{formatPrice(product.price)}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;

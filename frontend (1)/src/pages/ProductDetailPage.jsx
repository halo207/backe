import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const mockProduct = {
  _id: '1',
  title: 'Rolex Submariner Date',
  brand: 'Rolex',
  price: 250000000,
  images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
  category: 'Nam',
  description: 'Đồng hồ lặn kinh điển của Rolex với khả năng chống nước tuyệt đối, thiết kế sang trọng và bộ máy cơ học tinh xảo siêu bền bỉ theo năm tháng.',
  stock: 5,
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Lỗi kết nối API, dùng dữ liệu giả", error);
        setProduct({ ...mockProduct, _id: id }); // Fallback to mock
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const navigate = useNavigate();

  const addToCartHandler = () => {
    console.log(`Add to cart: ${product._id}, qty: ${qty}`);
    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  const buyNowHandler = () => {
    console.log(`Buy now: ${product._id}, qty: ${qty}`);
    // Thực tế sẽ dispatch action lưu vào Context/Redux rồi mới navigate
    navigate('/cart');
  };

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (!product) return <div className="text-center py-20">Không tìm thấy sản phẩm</div>;

  return (
    <div className="py-12">
      <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-medium mb-6 inline-block">
        &larr; Quay lại danh sách
      </Link>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="bg-gray-50 p-8 flex items-center justify-center">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="max-w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Product Info */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
              {product.brand}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Còn hàng
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Hết hàng
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="border-t border-gray-200 pt-8 mt-auto">
              {product.stock > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-700 font-medium">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors border-r border-gray-300"
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      min="1"
                      max={product.stock}
                      value={qty}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) {
                          if (val > product.stock) setQty(product.stock);
                          else if (val < 1) setQty(1);
                          else setQty(val);
                        } else {
                          setQty(''); // Cho phép xóa trắng tạm thời khi đang gõ
                        }
                      }}
                      onBlur={() => {
                        // Trả về 1 nếu để trống khi blur
                        if (qty === '' || qty < 1) setQty(1);
                      }}
                      className="w-16 text-center py-2 focus:outline-none focus:ring-0 border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                      onClick={() => setQty(Math.min(product.stock, Number(qty) + 1))}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              
              {product.stock > 0 ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={addToCartHandler}
                    className="flex-1 py-4 px-6 rounded-xl font-bold text-lg text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-all shadow-sm flex items-center justify-center"
                  >
                    Thêm vào giỏ
                  </button>
                  <button 
                    onClick={buyNowHandler}
                    className="flex-1 py-4 px-6 rounded-xl font-bold text-lg text-white bg-gray-900 hover:bg-indigo-600 hover:shadow-indigo-500/30 transition-all shadow-lg flex items-center justify-center"
                  >
                    Mua ngay
                  </button>
                </div>
              ) : (
                <button 
                  disabled
                  className="w-full py-4 px-8 rounded-xl font-bold text-lg text-white bg-gray-400 cursor-not-allowed shadow-lg"
                >
                  Tạm hết hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

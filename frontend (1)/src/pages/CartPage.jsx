import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

const mockCartItems = [
  {
    product: '1',
    title: 'Rolex Submariner Date',
    brand: 'Rolex',
    price: 250000000,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    qty: 1,
    stock: 5,
  },
  {
    product: '2',
    title: 'Omega Speedmaster',
    brand: 'Omega',
    price: 150000000,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    qty: 2,
    stock: 3,
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [paymentQr, setPaymentQr] = useState(null);
  const [paymentError, setPaymentError] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const updateQty = (id, newQty) => {
    setCartItems(cartItems.map(item => 
      item.product === id ? { ...item, qty: newQty } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.product !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const showPaymentQr = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/payments/bank-qr', { params: { amount: subtotal, description: 'Thanh toan Watch Store' } });
      setPaymentQr(data);
      setPaymentError('');
    } catch (error) { setPaymentError(error.response?.data?.message || 'Không tạo được mã QR'); }
  };

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 mb-4">
            <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-8">Bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.</p>
          <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Khám phá sản phẩm ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <Link to={`/product/${item.product}`} className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                </Link>
                
                <div className="flex-grow w-full text-center sm:text-left">
                  <div className="text-sm font-bold text-indigo-600 uppercase mb-1">{item.brand}</div>
                  <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </Link>
                  <div className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                    {formatPrice(item.price)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                  {/* Qty Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQty(item.product, Math.max(1, item.qty - 1))}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors border-r border-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-gray-900 font-medium">
                      {item.qty}
                    </span>
                    <button 
                      onClick={() => updateQty(item.product, Math.min(item.stock, item.qty + 1))}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa sản phẩm"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm)</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí giao hàng</span>
                <span className="font-medium text-green-600">Miễn phí</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                <span className="text-2xl font-bold text-indigo-600">{formatPrice(subtotal)}</span>
              </div>
            </div>
            
            <button onClick={showPaymentQr} className="w-full py-4 px-8 rounded-xl font-bold text-lg text-white bg-gray-900 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              Tiến hành thanh toán
            </button>
            {paymentError && <p className="mt-3 text-sm text-red-600">{paymentError}</p>}
            {paymentQr && <div className="mt-5 border-t pt-5 text-center"><h3 className="font-semibold text-gray-900">Quét QR để chuyển khoản</h3><img src={paymentQr.qrUrl} alt="Mã QR chuyển khoản" className="mx-auto mt-3 w-52 h-52" /><p className="text-sm text-gray-600">{paymentQr.bankId} · {paymentQr.account}</p><p className="text-sm text-gray-600">{paymentQr.accountName}</p><p className="text-xs text-gray-500 mt-1">{paymentQr.description}</p><p className="text-xs text-amber-700 mt-2">Đơn hàng chỉ được xác nhận sau khi cửa hàng kiểm tra khoản chuyển.</p></div>}
            
            <div className="mt-6">
              <Link to="/products" className="text-center block text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                &larr; Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

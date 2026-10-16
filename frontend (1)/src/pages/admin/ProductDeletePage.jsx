import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setTitle(data.title);
        setBrand(data.brand);
        setPrice(data.price);
        setStock(data.stock);
        setCategory(data.category);
        setImage(data.images && data.images[0] ? data.images[0] : '');
        setDescription(data.description);
      } catch (error) {
        console.error(error);
        alert('Không tìm thấy sản phẩm');
      }
    };
    fetchProduct();
  }, [id]);

  const deleteHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Cảnh báo: Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
        
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        alert('Xóa sản phẩm thành công!');
        navigate('/admin/products');
      } catch (error) {
        alert(error.response?.data?.message || 'Lỗi khi xóa sản phẩm');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/admin/products" className="text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Quay lại danh sách
        </Link>
      </div>

      <div className="bg-red-50 p-8 rounded-2xl shadow-sm border border-red-100">
        <h1 className="text-2xl font-bold text-red-600 mb-2 border-b border-red-200 pb-4">
          Xóa sản phẩm (Nguy hiểm)
        </h1>
        <p className="text-gray-600 mb-8">Vui lòng kiểm tra kỹ thông tin món hàng bên dưới trước khi xác nhận xóa vĩnh viễn khỏi hệ thống.</p>

        <form onSubmit={deleteHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tên đồng hồ</label>
              <input
                type="text"
                disabled
                value={title}
                className="w-full px-4 py-2.5 bg-gray-200 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Thương hiệu</label>
              <input
                type="text"
                disabled
                value={brand}
                className="w-full px-4 py-2.5 bg-gray-200 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Giá (VNĐ)</label>
              <input
                type="number"
                disabled
                value={price}
                className="w-full px-4 py-2.5 bg-gray-200 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng kho (Tồn kho)</label>
              <input
                type="number"
                disabled
                value={stock}
                className="w-full px-4 py-2.5 bg-gray-200 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hình ảnh</label>
            {image && (
              <img src={image} alt={title} className="w-32 h-32 object-cover rounded-lg border border-gray-300 mb-2 opacity-75" />
            )}
            <input
              type="text"
              disabled
              value={image}
              className="w-full px-4 py-2.5 bg-gray-200 border border-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 hover:shadow-lg transition-all"
            >
              Xác Nhận Xóa Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDeletePage;

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEditMode) {
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
    }
  }, [id, isEditMode]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      
      let imageUrl = image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const { data: uploaded } = await axios.post('http://localhost:5000/api/products/upload', formData, { ...config, headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } });
        imageUrl = `http://localhost:5000${uploaded.url}`;
      }
      if (!imageUrl) throw new Error('Vui lòng chọn ảnh sản phẩm');
      const productData = {
        title,
        brand,
        price: Number(price),
        stock: Number(stock),
        category,
        images: [imageUrl],
        description
      };

      if (isEditMode) {
        // Cần có PUT API trong thực tế
        // await axios.put(`http://localhost:5000/api/products/${id}`, productData, config);
        alert('Cập nhật thành công! (Demo)');
      } else {
        // Tái sử dụng POST API để tạo mới với dữ liệu thật
        await axios.post('http://localhost:5000/api/products', productData, config);
        alert('Thêm sản phẩm thành công!');
      }
      navigate('/admin/products');
    } catch (error) {
        alert(error.response?.data?.message || error.message || 'Lỗi khi lưu sản phẩm');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/admin/products" className="text-indigo-600 hover:text-indigo-800 font-medium">
          &larr; Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
          {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tên đồng hồ</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                placeholder="VD: Rolex Submariner Date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Thương hiệu</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                placeholder="VD: Rolex"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Giá (VNĐ)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng kho (Tồn kho)</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                placeholder="VD: Nam"
              />
            </div>
          </div>

          <div><label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh sản phẩm</label>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
            <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP hoặc GIF, tối đa 5 MB.</p>
            {image && !imageFile && <img src={image} alt="Ảnh hiện tại" className="mt-3 h-24 w-24 object-cover rounded" />}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả sản phẩm</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none resize-none"
              placeholder="Chi tiết về sản phẩm..."
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all"
            >
              Lưu Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;

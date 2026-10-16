import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State form
  const [firstName, setFirstName] = useState('The');
  const [lastName, setLastName] = useState('Man');
  const [telephone, setTelephone] = useState('079138108');
  const [email, setEmail] = useState('totheman@gmail.com');
  const [details, setDetails] = useState('Tôi là Mẫn');
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');

  useEffect(() => {
    // Trong thực tế, gọi API fetch thông tin user bằng ID ở đây
    console.log("Editing user ID:", id);
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    alert('Cập nhật thông tin người dùng thành công!');
    navigate('/admin/users');
  };

  const deleteHandler = () => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      alert('Đã xóa người dùng!');
      navigate('/admin/users');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header khu vực edit */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Editing: {firstName} {lastName}
        </h1>
        <div className="text-sm text-gray-500 text-right">
          <p>Lần Cuối Cập Nhật: {new Date().toUTCString()}</p>
          <p>Mã Người Dùng: {id || '678736aa3e74e78311a42fbc'}</p>
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-500">
        <Link to="/admin" className="text-blue-500 hover:underline">Trang Chủ</Link> / 
        <Link to="/admin/users" className="text-blue-500 hover:underline mx-1">Users</Link> / 
        <span className="mx-1">{firstName} {lastName}</span>
      </div>

      <form onSubmit={submitHandler} className="max-w-4xl border border-gray-200 rounded-lg p-8 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Telephone</label>
            <input
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Customer Details</label>
          <textarea
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-1">Cập Nhật Hình Ảnh</label>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50 mb-4">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>
          {imagePreview && (
            <div className="w-32 h-40 border border-gray-200 p-1 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Update Customer
          </button>
          <button
            type="button"
            onClick={deleteHandler}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditPage;

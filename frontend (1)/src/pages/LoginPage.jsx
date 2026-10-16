import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpPending, setOtpPending] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!otpPending) {
        const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
        setOtpPending(true);
        if (data.devOtp) alert(`Mã OTP dùng thử: ${data.devOtp}`);
        else alert(data.message);
        return;
      }
      const { data } = await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Đăng nhập thành công!');
      navigate('/');
      window.location.reload(); // Refresh để header cập nhật trạng thái
    } catch (error) {
      alert(error.response?.data?.message || 'Sai email hoặc mật khẩu!');
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gray-900 text-white rounded flex items-center justify-center font-bold text-2xl mx-auto mb-4">W</div>
          <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
          <p className="text-gray-500 mt-2">Đăng nhập để quản lý đơn hàng của bạn</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-colors"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              {!otpPending && <span className="text-sm text-gray-400">Xác thực hai bước</span>}
            </div>
            <input
              type="password"
              required={!otpPending}
              disabled={otpPending}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-colors"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {otpPending && <div><label className="block text-sm font-medium text-gray-700 mb-2">Mã OTP</label><input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="Nhập mã 6 chữ số" /></div>}

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium text-lg transition-colors"
          >
            {otpPending ? 'Xác thực OTP' : 'Tiếp tục'}
          </button>
        </form>
        {otpPending && <button type="button" onClick={() => { setOtpPending(false); setOtp(''); }} className="mt-3 w-full text-sm text-indigo-600">Quay lại</button>}

        <div className="mt-8 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

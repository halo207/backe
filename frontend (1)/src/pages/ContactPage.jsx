import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Giả lập gửi tin nhắn thành công
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Liên Hệ Với Chúng Tôi</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Luxury Watch Store luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của quý khách về các mẫu đồng hồ cao cấp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Thông tin liên hệ (Cột trái) */}
        <div className="bg-gray-900 text-white p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-8">Thông Tin Cửa Hàng</h2>
          <p className="text-gray-300 mb-10 leading-relaxed">
            Đến trực tiếp Showroom của chúng tôi để trải nghiệm tận tay những cỗ máy thời gian tinh xảo nhất thế giới.
          </p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiMapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Địa chỉ Showroom</h3>
                <p className="mt-2 text-gray-400">123 Đại lộ Lê Lợi, Phường Bến Nghé<br/>Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiPhone className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Điện thoại Hotline</h3>
                <p className="mt-2 text-gray-400">CSKH: +84 1900 6666<br/>Kỹ thuật: +84 909 123 456</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiMail className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Email hỗ trợ</h3>
                <p className="mt-2 text-gray-400">support@luxurywatch.vn<br/>sales@luxurywatch.vn</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <FiClock className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Giờ mở cửa</h3>
                <p className="mt-2 text-gray-400">Thứ Hai - Chủ Nhật<br/>09:00 Sáng - 21:00 Tối</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form gửi tin nhắn (Cột phải) */}
        <div className="p-10 md:p-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="Tư vấn mua đồng hồ Rolex"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung tin nhắn</label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Nhập nội dung bạn cần hỗ trợ..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
            >
              Gửi Yêu Cầu
            </button>
          </form>
        </div>
        
        
      </div>

      {/* Google Maps Embed */}
      <div className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-[400px] w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3253162744655!2d106.70206151474921!3d10.776662492321453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f476a666989%3A0x7d6c6e73715d0fa!2sBen%20Nghe%2C%20District%201%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1695444000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps - Store Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

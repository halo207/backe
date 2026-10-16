import { FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const OrderManagePage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm mã đơn, khách hàng..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none">
            <option>Tất cả trạng thái</option>
            <option>Đang chờ duyệt</option>
            <option>Đang giao</option>
            <option>Đã hoàn thành</option>
            <option>Đã hủy</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4">Mã đơn</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Ngày đặt</th>
                <th className="px-6 py-4">Tổng tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-indigo-600">#ORD-{9000 + item}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">Nguyễn Văn {String.fromCharCode(64 + item)}</div>
                    <div className="text-gray-500 text-xs">090123456{item}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">22/10/2026</td>
                  <td className="px-6 py-4 font-bold text-gray-900">25,000,000đ</td>
                  <td className="px-6 py-4">
                    {item % 3 === 0 ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Đang chờ duyệt</span>
                    ) : item % 2 === 0 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Đã hoàn thành</span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Đang giao hàng</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors" title="Xem chi tiết">
                        <FiEye />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Duyệt đơn">
                        <FiCheckCircle />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hủy đơn">
                        <FiXCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagePage;

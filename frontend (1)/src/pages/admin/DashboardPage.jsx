import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';

const DashboardPage = () => {
  const stats = [
    { title: 'Tổng doanh thu', value: '1,250,000,000đ', icon: <FiDollarSign />, color: 'bg-green-500' },
    { title: 'Đơn hàng mới', value: '125', icon: <FiShoppingBag />, color: 'bg-blue-500' },
    { title: 'Khách hàng', value: '840', icon: <FiUsers />, color: 'bg-indigo-500' },
    { title: 'Tăng trưởng', value: '+15.2%', icon: <FiTrendingUp />, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder for Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Biểu đồ doanh thu</h3>
          <div className="flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            [Khu vực tích hợp Chart.js / Recharts]
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Đơn hàng gần đây</h3>
            <a href="/admin/orders" className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Xem tất cả</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm font-medium text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Mã đơn</th>
                  <th className="pb-3">Khách hàng</th>
                  <th className="pb-3">Tổng tiền</th>
                  <th className="pb-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium text-gray-900">#ORD-{9000 + item}</td>
                    <td className="py-4 text-gray-600">Nguyễn Văn {String.fromCharCode(64 + item)}</td>
                    <td className="py-4 font-medium text-gray-900">25,000,000đ</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Hoàn thành
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

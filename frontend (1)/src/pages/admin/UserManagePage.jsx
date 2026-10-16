import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const UserManagePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const loadUsers = useCallback(async () => {
    try {
      const info = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const { data } = await axios.get('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${info.token}` } });
      setUsers(data);
    } catch (err) { setError(err.response?.data?.message || 'Không tải được danh sách người dùng'); }
  }, []);
  useEffect(() => { loadUsers(); }, [loadUsers]);

  const updateRole = async (user, role) => {
    try {
      const info = JSON.parse(localStorage.getItem('userInfo') || '{}');
      await axios.patch(`http://localhost:5000/api/users/${user._id}/role`, { role }, { headers: { Authorization: `Bearer ${info.token}` } });
      loadUsers();
    } catch (err) { alert(err.response?.data?.message || 'Không cập nhật được quyền'); }
  };
  const deleteUser = async (user) => {
    if (!window.confirm(`Xóa tài khoản ${user.email}?`)) return;
    try {
      const info = JSON.parse(localStorage.getItem('userInfo') || '{}');
      await axios.delete(`http://localhost:5000/api/users/${user._id}`, { headers: { Authorization: `Bearer ${info.token}` } });
      loadUsers();
    } catch (err) { alert(err.response?.data?.message || 'Không xóa được tài khoản'); }
  };

  return <div><h1 className="text-2xl font-bold text-gray-900 mb-8">Quản lý người dùng</h1>
    {error && <p className="mb-4 text-red-600">{error}</p>}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto"><table className="w-full text-left"><thead className="bg-gray-50"><tr className="text-xs font-semibold text-gray-500 uppercase"><th className="px-6 py-4">Tên</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Ngày đăng ký</th><th className="px-6 py-4">Vai trò</th><th className="px-6 py-4">Thao tác</th></tr></thead>
      <tbody className="divide-y divide-gray-100 text-sm">{users.map(user => <tr key={user._id}><td className="px-6 py-4 font-medium">{user.name}</td><td className="px-6 py-4">{user.email}</td><td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td><td className="px-6 py-4"><select value={user.role} onChange={e => updateRole(user, e.target.value)} className="border rounded px-3 py-2"><option value="user">User</option><option value="admin">Admin</option></select></td><td className="px-6 py-4"><button onClick={() => deleteUser(user)} className="text-red-600 hover:underline">Xóa</button></td></tr>)}</tbody></table>
      {!users.length && !error && <p className="p-6 text-gray-500">Chưa có người dùng.</p>}</div>
  </div>;
};

export default UserManagePage;

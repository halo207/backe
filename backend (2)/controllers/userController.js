const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const otpTransport = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  const nodemailer = require('nodemailer');
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
};

const authUser = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(req.body.password || ''))) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }
    const otp = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
    user.otpHash = await bcrypt.hash(otp, 10);
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const transport = otpTransport();
    if (transport) {
      await transport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: user.email,
        subject: 'Mã xác thực đăng nhập',
        text: `Mã OTP của bạn là ${otp}. Mã có hiệu lực trong 5 phút.`,
      });
    } else if (process.env.NODE_ENV === 'production') {
      user.otpHash = undefined;
      user.otpExpiresAt = undefined;
      await user.save();
      return res.status(503).json({ message: 'Chưa cấu hình SMTP để gửi mã OTP' });
    } else {
      console.info(`[OTP ${user.email}] ${otp} (chỉ hiển thị trong môi trường development)`);
    }

    res.json({ message: 'Mã OTP đã được gửi đến email của bạn', ...(process.env.NODE_ENV !== 'production' && !transport ? { devOtp: otp } : {}) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const user = await User.findOne({ email }).select('+otpHash +otpExpiresAt');
    if (!user || !user.otpHash || !user.otpExpiresAt || user.otpExpiresAt < new Date() || !(await bcrypt.compare(String(req.body.otp || ''), user.otpHash))) {
      return res.status(401).json({ message: 'Mã OTP không đúng hoặc đã hết hạn' });
    }
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!name || !email || password.length < 8) return res.status(400).json({ message: 'Nhập đủ thông tin và dùng mật khẩu tối thiểu 8 ký tự' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email này đã được sử dụng!' });
    const configuredAdmin = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const user = await User.create({ name, email, password, role: configuredAdmin && email === configuredAdmin ? 'admin' : 'user' });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listUsers = async (_req, res) => {
  try { res.json(await User.find().select('name email role createdAt')); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

const updateUserRole = async (req, res) => {
  try {
    if (!['admin', 'user'].includes(req.body.role)) return res.status(400).json({ message: 'Vai trò không hợp lệ' });
    if (req.params.id === String(req.user._id) && req.body.role !== 'admin') return res.status(400).json({ message: 'Không thể tự hạ quyền tài khoản đang đăng nhập' });
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true, runValidators: true }).select('name email role createdAt');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === String(req.user._id)) return res.status(400).json({ message: 'Không thể xóa tài khoản đang đăng nhập' });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    res.json({ message: 'Đã xóa người dùng' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { authUser, verifyOtp, registerUser, listUsers, updateUserRole, deleteUser };

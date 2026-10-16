const express = require('express');
const router = express.Router();

router.get('/bank-qr', (req, res) => {
  const { BANK_ID, BANK_ACCOUNT, BANK_ACCOUNT_NAME } = process.env;
  if (!BANK_ID || !BANK_ACCOUNT || !BANK_ACCOUNT_NAME) return res.status(503).json({ message: 'Chưa cấu hình tài khoản ngân hàng để tạo QR' });
  const amount = Math.max(0, Math.floor(Number(req.query.amount) || 0));
  const addInfo = String(req.query.description || 'Thanh toan Watch Store').slice(0, 50);
  const params = new URLSearchParams({ amount: String(amount), addInfo, accountName: BANK_ACCOUNT_NAME });
  res.json({ qrUrl: `https://img.vietqr.io/image/${encodeURIComponent(BANK_ID)}-${encodeURIComponent(BANK_ACCOUNT)}-compact2.png?${params}`, bankId: BANK_ID, account: BANK_ACCOUNT, accountName: BANK_ACCOUNT_NAME, amount, description: addInfo });
});

module.exports = router;

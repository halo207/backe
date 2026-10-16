# Watch Store backend setup

Run `npm install` and `npm run dev` from this directory. Configure the following values in `.env` before using the related features:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: SMTP account used to email login OTPs. Without SMTP, development mode prints and returns the OTP for local development; production login requires SMTP.
- `ADMIN_EMAIL`: email address that receives the initial admin role when registering. Set this before creating that account. Existing accounts can be promoted by changing their `role` to `admin` in MongoDB.
- `BANK_ID`, `BANK_ACCOUNT`, `BANK_ACCOUNT_NAME`: bank code, account number, and account holder used to create VietQR payment images.

Uploaded product images are saved in `uploads/` and served from `/uploads/<filename>`. The upload endpoint accepts JPEG, PNG, WebP, and GIF files up to 5 MB and requires an admin token.

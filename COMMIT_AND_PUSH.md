# Commit & push bằng Git Bash (cho nhà tuyển dụng)

Mở **Git Bash**, cd vào thư mục repo (có file `.git`):

```bash
cd /c/Users/loi.tran/Documents/Projects/99tech/code-challenge
```

---

## Files không được push (đã nằm trong `.gitignore`)

Các file/folder sau **sẽ không** bị đẩy lên khi bạn `git add .` và `git push`:

| Bỏ qua | Mục đích |
|--------|----------|
| `node_modules/` | Dependencies (nhà tuyển dụng chạy `npm install`) |
| `dist/`, `dist-ssr/` | Build output (tạo bằng `npm run build`) |
| `.env`, `.env.*`, `*.local` | Biến môi trường / secret |
| `*.log`, `logs/` | Log, debug |
| `.idea/`, `.vscode/`, `.DS_Store` | OS / Editor |
| `*.tsbuildinfo` | Cache TypeScript |

**Giữ lại (có push):** `package.json`, `package-lock.json`, source code, README — nhà tuyển dụng clone và chạy được ngay.

---

## 1. Kiểm tra

```bash
git status
git remote -v
```

Branch hiện tại: **solution/frontend**. Nếu chưa có remote:

```bash
git remote add origin https://github.com/<USERNAME>/<REPO-FORK>.git
```

---

## 2. Stage & commit

```bash
git add .
git status
```

Xác nhận trong list **không** có `node_modules` hay `dist`. Rồi commit:

```bash
git commit -m "feat: 99Tech code challenge - Problem 1, 2, 3 completed"
```

Nếu gặp lỗi `error: option 'trailer' requires a value`: có thể do alias Git của bạn. Thử:

```bash
git commit --no-verify -m "Complete 99Tech code challenge Problem 1 2 3"
```

---

## 3. Push lên fork

```bash
git push -u origin solution/frontend
```

Nếu fork dùng branch `main` và bạn muốn push lên đó:

```bash
git push -u origin solution/frontend:main
```

Hoặc đổi branch local sang `main` rồi push:

```bash
git checkout -b main
git push -u origin main
```

---

## 4. Sau khi push

- Mở fork trên GitHub và kiểm tra code + README.
- Gửi link repo (hoặc link PR) cho nhà tuyển dụng.

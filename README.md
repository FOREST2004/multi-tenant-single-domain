# Payload Multi-Tenant Example (Single Domain)

Dự án này minh họa cách xây dựng ứng dụng **multi-tenancy** với [Payload CMS](https://github.com/payloadcms/payload) trên **một domain duy nhất**. Các tenant được phân tách qua collection `Tenants`.

## Khởi động nhanh

1. Clone repo về máy
2. `cp .env.example .env` — tạo file biến môi trường
3. Cập nhật `.env` với thông tin database PostgreSQL của bạn
4. `yarn install` — cài dependencies
5. `yarn dev` — khởi động ứng dụng
6. `yarn seed` — tạo dữ liệu mẫu
7. Mở `http://localhost:3000/admin` — vào trang quản trị
8. Đăng nhập bằng email `demo@payloadcms.com` và mật khẩu `demo`

## Cách hoạt động

Ứng dụng Payload multi-tenant là một server duy nhất phục vụ nhiều "tenant". Ví dụ về tenant có thể là: khách hàng của agency, các tổ chức trong tập đoàn, hoặc khách hàng SaaS của bạn.

Mỗi tenant có bộ dữ liệu riêng (users, pages...) được giới hạn trong phạm vi tenant đó. Ứng dụng được chia sẻ chung hạ tầng nhưng dữ liệu hoàn toàn tách biệt giữa các tenant.

### Các Collections

- #### Users

  Collection `users` được bật xác thực, bao gồm cả người dùng toàn hệ thống và người dùng theo tenant, dựa trên giá trị của các field `roles` và `tenants`. Người dùng có role `super-admin` có thể quản lý toàn bộ ứng dụng, trong khi người dùng có tenant role `admin` chỉ có quyền truy cập hạn chế vào tenant được gán.

- #### Tenants

  Collection `tenants` được dùng để kiểm soát truy cập theo tenant. Mỗi user được gán một mảng `tenants` gồm quan hệ tới một `tenant` và `roles` của họ trong tenant đó. Bạn có thể gắn bất kỳ document nào vào tenant thông qua field [relationship](https://payloadcms.com/docs/fields/relationship). Giá trị này được dùng để lọc dữ liệu trong admin panel và API.

- #### Pages

  Mỗi page được gán một `tenant` để kiểm soát truy cập và lọc API. Các page được tạo bởi tenant admin sẽ tự động được gán tenant dựa trên field `lastLoggedInTenant` của người dùng đó.

## Kiểm soát truy cập (Access Control)

Hệ thống phân quyền cơ bản dựa trên roles:

- `super-admin`: Truy cập toàn bộ admin panel, xem tất cả tenant và thực hiện mọi thao tác.
- `user`: Chỉ truy cập được admin panel nếu là tenant-admin, với quyền hạn giới hạn trong tenant của họ.

Áp dụng cho từng collection:

- `users`: Chỉ super-admin, tenant-admin và chính người dùng đó mới có thể xem/sửa profile. Ai cũng có thể tạo user, nhưng chỉ admin mới xóa được.
- `tenants`: Chỉ super-admin và tenant-admin mới có thể đọc, tạo, sửa, xóa tenant.
- `pages`: Ai cũng có thể đọc page, nhưng chỉ super-admin và tenant-admin mới tạo, sửa, xóa được.

Khi user đăng nhập, field `lastLoggedInTenant` sẽ được lưu vào profile. Trường này được dùng để tự động gán tenant cho các document mới. Super-admin cũng có thể dùng field này để duyệt admin panel với tư cách một tenant cụ thể.

## CORS

Cấu hình này yêu cầu chính sách CORS mở, vì mỗi tenant có danh sách domain động và không thể whitelist cố định tại runtime. Do đó `serverURL` không được set.

## Frontend

Frontend đã được scaffold sẵn trong dự án này. Xem code render page tại [`/src/app/(app)/[tenant]/[...slug]/page.tsx`](src/app/(app)/[tenant]/[...slug]/page.tsx). Đây là template khởi đầu, bạn có thể tùy chỉnh theo nhu cầu.

## Tài khoản mẫu (sau khi chạy seed)

| Tài khoản | Mật khẩu | Quyền |
|---|---|---|
| `demo@payloadcms.com` | `demo` | Super Admin |
| `tenant1@payloadcms.com` | `test` | Admin của Tenant 1 |
| `tenant2@payloadcms.com` | `test` | Admin của Tenant 2 |
| `multi-admin@payloadcms.com` | `test` | Admin của Tenant 1 & 2 |

 QUẢN LÝ QUÁN BILLIARDS

Website quản lý hoạt động kinh doanh quán Billiards, hỗ trợ quản lý bàn chơi, khách hàng, nhân viên, đặt bàn, giờ chơi, hóa đơn, dịch vụ và thống kê doanh thu.

 Các chức năng chính

Hệ thống được xây dựng nhằm hỗ trợ chủ quán và nhân viên quản lý hoạt động kinh doanh một cách thuận tiện, chính xác và hiệu quả.

 Chức năng  Nội dung 

 Quản lý tài khoản  Đăng nhập, đăng xuất và phân quyền người dùng 
 Quản lý bàn Billiards  Thêm, sửa, xóa và theo dõi trạng thái bàn 
 Quản lý khách hàng  Lưu trữ và cập nhật thông tin khách hàng 
 Quản lý nhân viên  Quản lý thông tin và tài khoản nhân viên 
 Quản lý đặt bàn  Đặt bàn, cập nhật và theo dõi lịch đặt 
 Quản lý giờ chơi  Theo dõi thời gian sử dụng bàn và tính tiền 
 Quản lý hóa đơn  Tạo hóa đơn và thanh toán 
 Quản lý dịch vụ  Quản lý đồ uống và các dịch vụ đi kèm 
 Thống kê doanh thu  Tổng hợp doanh thu và báo cáo hoạt động kinh doanh 

 Phân quyền người dùng

Hệ thống hỗ trợ phân quyền theo vai trò để đảm bảo mỗi người dùng chỉ được thực hiện các chức năng phù hợp.

 Vai trò  Quyền hạn chính 
 Quản trị viên  Quản lý toàn bộ hệ thống, tài khoản, nhân viên, bàn, giá giờ chơi và báo cáo 
 Nhân viên  Quản lý bàn chơi, khách hàng, đặt bàn, giờ chơi và hóa đơn 
 Khách hàng  Đặt bàn và theo dõi thông tin đặt bàn (nếu hệ thống hỗ trợ tài khoản khách hàng) 

 Công nghệ sử dụng

- HTML5: Xây dựng cấu trúc giao diện website.
- CSS3: Thiết kế giao diện và bố cục trang web.
- JavaScript: Xử lý các chức năng tương tác.
- Node.js: Môi trường chạy JavaScript phía máy chủ.
- Express.js: Framework xây dựng ứng dụng backend và API.
- SQLite tích hợp trong Node.js: lưu trữ tài khoản nhân viên cục bộ.
- Git và GitHub: Quản lý và lưu trữ mã nguồn dự án.

 Yêu cầu hệ thống

- Windows 10 hoặc Windows 11.
- Node.js 22.13.0 trở lên và npm đã được cài đặt.
- Visual Studio Code.
- Trình duyệt Google Chrome hoặc Microsoft Edge.

 Cài đặt và chạy ứng dụng

 Bước 1: Tải mã nguồn

Clone dự án từ GitHub hoặc tải mã nguồn về máy tính.

```bash
git clone <LINK_GITHUB_CUA_BAN>
```

Di chuyển vào thư mục dự án:

```bash
cd QUAN_LY_QUAN_BILLIARDS
```

 Bước 2: Mở dự án

Mở thư mục dự án bằng Visual Studio Code.

```bash
code .
```

 Bước 3: Cài đặt thư viện

Mở Terminal trong Visual Studio Code và chạy:

```bash
npm.cmd install
```

Lệnh này sẽ cài đặt các thư viện được khai báo trong file `package.json`.

 Bước 4: Tạo quản trị viên đầu tiên

Tài khoản nhân viên được lưu trong SQLite tại `data/accounts.sqlite`; ứng dụng tự tạo thư mục và bảng khi khởi chạy. Không cần cài hoặc bật SQL Server.

Sao chép `.env.example` thành `.env`, đặt `INITIAL_ADMIN_PASSWORD` (ít nhất 12 ký tự), rồi chạy:

```bash
npm.cmd run create-admin
```

Sau khi tạo thành công, xóa `INITIAL_ADMIN_PASSWORD` khỏi `.env`. Tên đăng nhập mặc định là `admin`, mật khẩu là mật khẩu bạn vừa đặt. Có thể đổi đường dẫn SQLite bằng `ACCOUNT_DATABASE_PATH`. Không chia sẻ `.env` hoặc đưa lên GitHub.

 Bước 5: Khởi chạy ứng dụng

```bash
npm.cmd start
```

Sau khi chạy thành công, mở trình duyệt và truy cập địa chỉ:

```text
http://localhost:3000
```

Cổng truy cập có thể thay đổi bằng `PORT` trong file `.env`.

Sau khi đăng nhập bằng tài khoản quản trị viên, mở **Quản lý tài khoản** để tạo, sửa, khóa hoặc xóa tài khoản nhân viên. Vai trò gồm `admin`, `manager` và `staff`; chỉ `admin` được quản lý tài khoản. Không thể tự khóa/xóa tài khoản đang đăng nhập hoặc xóa quản trị viên đang hoạt động cuối cùng.

 Kiểm thử

Kiểm tra các chức năng chính của hệ thống:

- Kiểm tra đăng nhập và phân quyền tài khoản.
- Kiểm tra thêm, sửa, xóa thông tin bàn.
- Kiểm tra quản lý khách hàng và nhân viên.
- Kiểm tra chức năng đặt bàn.
- Kiểm tra tính giờ chơi và tính tiền.
- Kiểm tra tạo hóa đơn và thanh toán.
- Kiểm tra quản lý đồ uống và dịch vụ.
- Kiểm tra thống kê doanh thu.

Nếu dự án đã cài đặt framework kiểm thử, sử dụng lệnh tương ứng được khai báo trong `package.json`.

 Cấu trúc thư mục

Cấu trúc tham khảo của dự án:

```text
QUAN_LY_QUAN_BILLIARDS/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│
├── routes/
│   ├── auth.js
│   ├── tables.js
│   ├── customers.js
│   ├── employees.js
│   ├── bookings.js
│   ├── invoices.js
│   └── services.js
│
├── controllers/
├── models/
├── config/
│   └── database.js
│
├── views/
├── tests/
│
├── database/
│   └── schema.sql
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

Cấu trúc trên là cấu trúc đề xuất; cần điều chỉnh theo các thư mục và file thực tế trong mã nguồn.

 Kiến thức áp dụng

Dự án vận dụng các kiến thức:

- Phân tích và thiết kế hệ thống thông tin.
- Thiết kế cơ sở dữ liệu và sơ đồ ERD.
- Chuẩn hóa cơ sở dữ liệu.
- Lập trình giao diện HTML, CSS và JavaScript.
- Xây dựng backend với Node.js và Express.js.
- Kết nối và truy vấn SQLite cho tài khoản nhân viên.
- Thực hiện các thao tác CRUD.
- Quản lý tài khoản và phân quyền người dùng.
- Kiểm thử và sửa lỗi ứng dụng.
- Sử dụng Git và GitHub để quản lý mã nguồn.

 Mục tiêu dự án

Xây dựng website quản lý quán Billiards giúp tự động hóa quy trình quản lý bàn chơi, khách hàng, nhân viên, dịch vụ và thanh toán.

Góp phần giảm thiểu sai sót trong quá trình tính tiền, tiết kiệm thời gian quản lý và nâng cao hiệu quả hoạt động kinh doanh của quán Billiards.

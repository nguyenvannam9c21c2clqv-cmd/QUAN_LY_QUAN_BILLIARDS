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
- SQL Server: Hệ quản trị cơ sở dữ liệu.
- Git và GitHub: Quản lý và lưu trữ mã nguồn dự án.

 Yêu cầu hệ thống

- Windows 10 hoặc Windows 11.
- Node.js và npm đã được cài đặt.
- Visual Studio Code.
- Microsoft SQL Server đã được cài đặt và khởi động.
- SQL Server Management Studio (SSMS).
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
npm install
```

Lệnh này sẽ cài đặt các thư viện được khai báo trong file `package.json`.

 Bước 4: Tạo cơ sở dữ liệu

1. Mở SQL Server Management Studio.
2. Kết nối đến SQL Server.
3. Mở file `schema.sql` trong dự án.
4. Kiểm tra các câu lệnh SQL.
5. Nhấn Execute để tạo cơ sở dữ liệu và các bảng.

 Bước 5: Cấu hình kết nối cơ sở dữ liệu

Tạo file `.env` tại thư mục gốc dự án.

Tham khảo cấu hình mẫu trong `.env.example` (nếu dự án có file này).

Ví dụ:

```env
PORT=3000

DB_SERVER=localhost
DB_NAME=QuanLyBilliards
DB_USER=sa
DB_PASSWORD=your_password
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Lưu ý: Các biến môi trường cần được điều chỉnh theo cấu hình SQL Server và mã nguồn thực tế của dự án. Không chia sẻ mật khẩu hoặc đưa file `.env` lên GitHub.

 Bước 6: Khởi chạy ứng dụng

Kiểm tra mục `scripts` trong file `package.json`.

Nếu dự án sử dụng lệnh `start`:

```bash
npm start
```

Nếu dự án sử dụng lệnh `dev`:

```bash
npm run dev
```

Sau khi chạy thành công, mở trình duyệt và truy cập địa chỉ:

```text
http://localhost:3000
```

Cổng truy cập có thể thay đổi tùy theo cấu hình trong file `.env`.

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
- Kết nối và truy vấn cơ sở dữ liệu SQL Server.
- Thực hiện các thao tác CRUD.
- Quản lý tài khoản và phân quyền người dùng.
- Kiểm thử và sửa lỗi ứng dụng.
- Sử dụng Git và GitHub để quản lý mã nguồn.

 Mục tiêu dự án

Xây dựng website quản lý quán Billiards giúp tự động hóa quy trình quản lý bàn chơi, khách hàng, nhân viên, dịch vụ và thanh toán.

Góp phần giảm thiểu sai sót trong quá trình tính tiền, tiết kiệm thời gian quản lý và nâng cao hiệu quả hoạt động kinh doanh của quán Billiards.

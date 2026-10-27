QUAN_LY_QUAN_BILLIARDS

Website quản lý quán Billiards.

1. Chức năng

* Quản lý bàn Billiards: thêm, sửa, xóa và theo dõi trạng thái bàn.
* Quản lý khách hàng.
* Quản lý nhân viên.
* Quản lý đặt bàn.
* Quản lý giờ chơi và tính tiền theo thời gian sử dụng bàn.
* Quản lý hóa đơn thanh toán.
* Quản lý đồ uống và dịch vụ đi kèm.
* Thống kê doanh thu và báo cáo hoạt động kinh doanh.

2. Quản trị viên

Quản trị viên có quyền quản lý toàn bộ hệ thống.

* Đăng nhập và đăng xuất.
* Quản lý tài khoản nhân viên.
* Quản lý thông tin bàn Billiards.
* Quản lý giá giờ chơi.
* Quản lý khách hàng và hóa đơn.
* Theo dõi doanh thu.
* Xem báo cáo và thống kê.
* Kiểm soát hoạt động của quán.

3. Công nghệ

* HTML5: Xây dựng cấu trúc trang web.
* CSS3: Thiết kế giao diện và bố cục.
* JavaScript: Xử lý các chức năng trên giao diện.
* Node.js: Môi trường chạy JavaScript phía máy chủ.
* SQL Server: Hệ quản trị cơ sở dữ liệu.
* GitHub: Lưu trữ và quản lý mã nguồn dự án.

4. Cài đặt và chạy

Bước 1: Tải mã nguồn

Clone dự án về máy tính hoặc tải mã nguồn trực tiếp từ GitHub.

Bước 2: Cài đặt công cụ

Cài đặt các công cụ cần thiết:

* Visual Studio Code.
* Node.js và npm.
* Microsoft SQL Server.
* SQL Server Management Studio (SSMS).

Bước 3: Cài đặt thư viện

Mở thư mục dự án trong Visual Studio Code, mở Terminal và chạy:

npm install

Bước 4: Tạo cơ sở dữ liệu

* Mở SQL Server Management Studio.
* Kết nối đến SQL Server.
* Mở file schema.sql.
* Kiểm tra và thực thi các câu lệnh SQL để tạo cơ sở dữ liệu và các bảng.

Bước 5: Cấu hình kết nối

* Tham khảo file .eve.exmple nếu đây là tên file cấu hình mẫu hiện có trong dự án.
* Nếu file thực tế là .env.example, hãy sử dụng đúng tên đó.
* Tạo file .env theo cấu hình của dự án.
* Điền thông tin kết nối cơ sở dữ liệu và các biến môi trường cần thiết.

Bước 6: Khởi chạy dự án

Kiểm tra mục scripts trong file package.json để biết lệnh chạy chính xác. Nếu dự án có script start, sử dụng:

npm start

Nếu dự án có script dev, sử dụng:

npm run dev

Mở địa chỉ localhost được hiển thị trong Terminal để truy cập website.

Lưu ý: Các lệnh chạy phụ thuộc vào cấu hình thực tế của dự án.

5. Kiến thức

Dự án vận dụng các kiến thức:

* Phân tích và thiết kế hệ thống.
* Thiết kế cơ sở dữ liệu và mô hình ERD.
* Chuẩn hóa cơ sở dữ liệu.
* HTML, CSS và JavaScript.
* Lập trình phía máy chủ với Node.js.
* Các thao tác CRUD: thêm, xem, sửa và xóa dữ liệu.
* Kết nối và truy vấn SQL Server.
* Quản lý tài khoản và phân quyền người dùng.
* Kiểm thử và phát hiện lỗi.
* Sử dụng Git và GitHub để quản lý mã nguồn.

6. Tài liệu

* README.md: Giới thiệu và hướng dẫn sử dụng dự án.
* schema.sql: Cấu trúc cơ sở dữ liệu.
* package.json: Thông tin dự án và các thư viện sử dụng.
* .env.example hoặc file cấu hình mẫu tương ứng: Hướng dẫn các biến môi trường.
* index.html: Giao diện trang web.
* Thư mục kiemthu: Tài liệu hoặc nội dung phục vụ kiểm thử.
* Thư mục teptailen: Tài liệu hoặc tệp được tải lên dự án.

Các tài liệu bổ sung có thể bao gồm sơ đồ ERD, tài liệu phân tích thiết kế hệ thống, hướng dẫn sử dụng và báo cáo kiểm thử.

⸻

Dự án: Quản lý quán Billiards

Mục tiêu: Xây dựng website hỗ trợ quản lý bàn chơi, khách hàng, nhân viên, dịch vụ và doanh thu một cách thuận tiện, chính xác và hiệu quả.

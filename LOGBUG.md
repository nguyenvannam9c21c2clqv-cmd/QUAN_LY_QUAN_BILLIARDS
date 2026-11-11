QUẢN LÝ LỖI DỰ ÁN (BUG TRACKING)
1. Mục đích

Tài liệu dùng để ghi nhận, theo dõi và xử lý các lỗi phát sinh trong quá trình phát triển phần mềm quản lý quán Billiards.

2. Quy tắc báo lỗi

Mỗi lỗi cần ghi rõ:

Tên lỗi.
Ngày phát hiện.
Vị trí xảy ra lỗi.
Nguyên nhân (nếu xác định được).
Mức độ nghiêm trọng.
Trạng thái xử lý.
3. Mức độ nghiêm trọng
Critical: Lỗi nghiêm trọng, hệ thống không hoạt động.
High: Lỗi ảnh hưởng chức năng quan trọng.
Medium: Lỗi ảnh hưởng một phần chức năng.
Low: Lỗi giao diện hoặc lỗi nhỏ.
4. Trạng thái xử lý
Pending: Chờ xử lý.
In Progress: Đang xử lý.
Fixed: Đã sửa.
Testing: Đang kiểm tra.
Closed: Đã hoàn thành.
5. Danh sách lỗi
STT	Tên lỗi	Mức độ	Trạng thái
1	Chưa ghi nhận	Low	Pending
6. Quy định dành cho AI
Kiểm tra nguyên nhân trước khi sửa lỗi.
Không sửa lỗi bằng cách xóa chức năng hiện có.
Không tự ý thay đổi cấu trúc dự án.
Không làm ảnh hưởng đến dữ liệu đang lưu trữ.
Kiểm tra lại các chức năng liên quan sau khi sửa.
Ghi nhận nội dung thay đổi sau mỗi lần khắc phục.
Không đánh dấu hoàn thành khi chưa kiểm thử.
7. Mẫu ghi nhận lỗi
BUG #[SỐ THỨ TỰ]
Tên lỗi:
Ngày phát hiện:
Vị trí:
Mức độ:
Mô tả lỗi:
Các bước tái hiện:
Nguyên nhân:
Cách khắc phục:
Trạng thái:
8. Nguyên tắc

Mọi lỗi phải được ghi nhận, phân tích, khắc phục và kiểm tra trước khi xác nhận hoàn thành.

Mục tiêu: Hệ thống ổn định – Dữ liệu chính xác – Không phát sinh lỗi lặp lại.

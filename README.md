# family_manage
# cors
Cách để chạy chương trình
    1. Clone code về máy
    2. Mở Folder Front-end, Back-end và chạy Xampp để có Database
    3. Sau khi mở cả 2 folder lên:
        3.1. Đối với Front-end
            - Mở Terminal, chuyển đến thư mục "my-app" (dùng cd "tên", trỏ dần dần)
            - Sau khi trỏ đến thư mục "my-app", chạy npm start
                + Nếu có lỗi, install những modules còn thiếu bằng npm install
                + Nếu chạy thành công thì thôi :))
        3.2. Đối với Back-end
            - Mở bằng IntelliJ hoặc Eclipse (Ưu tiên IntelliJ)
            - Configuration ở góc trên bên phải, chọn BtlApplication 
            - Chạy
                + Nếu có lỗi thì xem file pom.xml (thường là vậy)
                + Không thì thôi
    4. Truy cập vào trang localhost:4200, đăng nhập, và sử dụng
        - Nếu không đăng nhập được, mở F12 lên, phần console
            + Nếu xảy ra lỗi CORS, tìm thư mục chứa chrome.exe và chạy trên terminal dòng lệnh trong file FixCORS.txt

# Version
    Angular: 14.2.4
    Node: 14.20.0
    Npm: 6.14.17
    ngx-toastr: 15.2.0
    


const { app, BrowserWindow } = require('electron')
const electron=require('electron');
// Giữ một tham chiếu chung cho đối tượng window. Nếu bạn không làm điều này, khi đối tượng JavaScript
// Trong quá trình thu dọn rác, đối tượng cửa sổ sẽ tự động đóng lại
let win

function createWindow () {
// Tạo cửa sổ trình duyệt.
  win = new BrowserWindow({ "width": 1000, "height": 600, "minWidth": 1000, "minHeight": 600, "center": true, "resizable": false, "kiosk": true})

// Sau đó tải index.html của ứng dụng.
  win.loadFile('index.html');

// Mở công cụ dành cho nhà phát triển
// win.webContents.openDevTools ()

// Xóa thanh menu mặc định đi kèm với nó
  win.setMenu(null);
  const Menu=electron.Menu;
  Menu.setApplicationMenu(null);

// Sự kiện này sẽ được kích hoạt khi đóng cửa sổ.
  win.on('closed', () => {
// Bỏ tham chiếu đối tượng cửa sổ, nếu ứng dụng của bạn hỗ trợ nhiều cửa sổ,
// thường lưu trữ nhiều đối tượng cửa sổ trong một mảng,
// Đồng thời, bạn nên xóa phần tử tương ứng.
    win = null
  })
}

// Electron sẽ được khởi tạo và sẵn sàng
// Gọi hàm này khi tạo cửa sổ trình duyệt.
// Một số API chỉ có thể được sử dụng sau khi sự kiện sẵn sàng được kích hoạt.
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
// Trên macOS, trừ khi người dùng thoát chắc chắn bằng Cmd + Q,
// Nếu không, hầu hết các ứng dụng và thanh menu của chúng sẽ vẫn hoạt động.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
// Trên macOS, khi biểu tượng dock được nhấp và không có cửa sổ nào khác đang mở,
// Thường tạo lại một cửa sổ trong ứng dụng.
  if (win === null) {
    createWindow()
  }
})

// Trong tệp này, bạn có thể tiếp tục ghi mã quy trình chính còn lại của ứng dụng.
// Nó cũng có thể được chia thành một số tệp và sau đó được nhập với yêu cầu.

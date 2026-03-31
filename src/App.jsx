import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import "./App.css";

function App() {
  // Kiểm tra trạng thái đăng nhập từ LocalStorage
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  // State dùng chung để lưu bài viết đang cần chỉnh sửa
  const [postToEdit, setPostToEdit] = useState(null);

  return (
    <Router basename="/myblogpage-doancuoiky">
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      {/* Xóa inline style padding ở đây vì CSS của mình đã lo phần này rồi bro nhé */}
      <Routes>
        {/* CHỈ GIỮ 1 ROUTE TRANG CHỦ VÀ TRUYỀN ĐỦ PROPS */}
        <Route
          path="/"
          element={<Home isAuth={isAuth} setPostToEdit={setPostToEdit} />}
        />

        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

        <Route
          path="/create"
          element={
            <CreatePost
              isAuth={isAuth}
              postToEdit={postToEdit}
              setPostToEdit={setPostToEdit}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostDetail isAuth={isAuth} setPostToEdit={setPostToEdit} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

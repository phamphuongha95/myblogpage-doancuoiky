import { useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ isAuth, postToEdit, setPostToEdit }) {
  const [title, setTitle] = useState(postToEdit ? postToEdit.title : "");
  const [postText, setPostText] = useState(
    postToEdit ? postToEdit.postText : "",
  );

  // Thêm state để quản lý thông báo lỗi
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
  const postsCollectionRef = collection(db, "posts");

  const submitPost = async () => {
    // 1. KIỂM TRA ĐIỀU KIỆN (VALIDATION)
    // Dùng .trim() để chặn trường hợp người dùng chỉ nhập toàn dấu cách
    if (title.trim() === "" || postText.trim() === "") {
      setErrorMsg("⚠️ Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết nhé!");
      return; // Dừng hàm tại đây, không cho chạy tiếp xuống Firebase
    }

    // Xóa thông báo lỗi nếu đã nhập hợp lệ
    setErrorMsg("");

    if (postToEdit) {
      // LOGIC CẬP NHẬT (UPDATE)
      const postDoc = doc(db, "posts", postToEdit.id);
      await updateDoc(postDoc, { title, postText });
      setPostToEdit(null);
    } else {
      // LOGIC TẠO MỚI (CREATE)
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
    }
    navigate("/");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>{postToEdit ? "Chỉnh Sửa Bài Viết" : "Tạo Bài Viết Mới"}</h1>

        {/* HIỂN THỊ LỖI NẾU CÓ */}
        {errorMsg && (
          <p
            style={{
              color: "#ff4757",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "bold",
              background: "rgba(255, 71, 87, 0.1)",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {errorMsg}
          </p>
        )}

        <div className="inputGp">
          <label>Tiêu đề:</label>
          <input
            value={title}
            placeholder="Nhập tiêu đề..."
            onChange={(e) => {
              setTitle(e.target.value);
              if (errorMsg) setErrorMsg(""); // Ẩn lỗi ngay khi người dùng bắt đầu gõ lại
            }}
          />
        </div>
        <div className="inputGp">
          <label>Nội dung:</label>
          <textarea
            value={postText}
            placeholder="Nội dung..."
            onChange={(e) => {
              setPostText(e.target.value);
              if (errorMsg) setErrorMsg(""); // Ẩn lỗi ngay khi người dùng bắt đầu gõ lại
            }}
          />
        </div>
        <button className="createPostBtn" onClick={submitPost}>
          {postToEdit ? "Cập Nhật Ngay ✅" : "Đăng Bài Viết 🚀"}
        </button>
      </div>
    </div>
  );
}

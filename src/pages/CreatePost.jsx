import { useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ isAuth, postToEdit, setPostToEdit }) {
  // Nếu có bài đang sửa thì lấy tiêu đề cũ, không thì để trống
  const [title, setTitle] = useState(postToEdit ? postToEdit.title : "");
  const [postText, setPostText] = useState(
    postToEdit ? postToEdit.postText : "",
  );

  let navigate = useNavigate();
  const postsCollectionRef = collection(db, "posts");

  const submitPost = async () => {
    if (postToEdit) {
      // LOGIC CẬP NHẬT (UPDATE)
      const postDoc = doc(db, "posts", postToEdit.id);
      await updateDoc(postDoc, { title, postText });
      setPostToEdit(null); // Xóa bộ nhớ tạm sau khi xong
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
        <div className="inputGp">
          <label>Tiêu đề:</label>
          <input
            value={title}
            placeholder="Nhập tiêu đề..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label>Nội dung:</label>
          <textarea
            value={postText}
            placeholder="Nội dung..."
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <button className="createPostBtn" onClick={submitPost}>
          {postToEdit ? "Cập Nhật Ngay ✅" : "Đăng Bài Viết 🚀"}
        </button>
      </div>
    </div>
  );
}

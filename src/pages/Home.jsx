import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home({ isAuth, setPostToEdit }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  // 1. Hàm lấy danh sách bài viết từ Firebase
  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("Lỗi khi tải bài viết:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // 2. Hàm Xóa bài viết
  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bài này không?",
    );
    if (!confirmDelete) return;

    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      // Cập nhật lại danh sách trên màn hình ngay lập tức
      setPostList((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
    }
  };

  // 3. Hàm chuẩn bị Sửa bài viết
  const editPost = (post) => {
    setPostToEdit(post); // Lưu bài viết vào bộ nhớ tạm ở App.jsx
    navigate("/create"); // Đẩy sang trang soạn thảo
  };

  return (
    <div className="homePageContainer">
      <h1 className="pageTitle">Bài viết</h1>
      {postLists.length === 0 ? (
        <div className="loadingContainer">
          <p className="loadingText">Đang tải những câu chuyện nghệ thuật...</p>
        </div>
      ) : (
        <div className="homePage">
          {/* Hiển thị khi đang tải hoặc không có bài */}

          {/* Vòng lặp hiển thị danh sách bài viết */}
          {postLists.map((post) => {
            return (
              <div key={post.id} className="post">
                <div className="postHeader">
                  <h2>{post.title}</h2>

                  {/* Chỉ hiện nút Xóa/Sửa nếu là chủ nhân bài viết */}
                  {isAuth && post.author?.id === auth.currentUser?.uid && (
                    <div className="postButtons">
                      <button
                        className="editBtn"
                        title="Chỉnh sửa"
                        onClick={() => editPost(post)}
                      >
                        ✏️
                      </button>
                      <button
                        className="deleteBtn"
                        title="Xóa bài"
                        onClick={() => deletePost(post.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>

                <div className="postTextContainer">
                  {post.postText.length > 150
                    ? post.postText.substring(0, 150) + "..."
                    : post.postText}
                </div>

                <div
                  className="postFooter"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="readMoreBtn"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    Đọc tiếp →
                  </button>
                  <span className="postAuthor">@{post.author.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

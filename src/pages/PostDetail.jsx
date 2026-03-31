import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getDoc, doc, deleteDoc } from "firebase/firestore";

function PostDetail({ isAuth, setPostToEdit }) {
  const { id } = useParams(); // Lấy ID từ trên URL
  const [post, setPost] = useState(null); // State riêng cho bài viết này
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  // Hàm lấy dữ liệu bài viết dựa trên ID
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const postDocRef = doc(db, "posts", id);
        const postDoc = await getDoc(postDocRef);
        if (postDoc.exists()) {
          setPost({ ...postDoc.data(), id: postDoc.id });
        } else {
          console.log("Không tìm thấy bài viết!");
          navigate("/"); // Không thấy thì cho về vườn (Home)
        }
      } catch (error) {
        console.error("Lỗi lấy bài viết:", error);
      }
      setLoading(false);
    };

    getPost();
  }, [id, navigate]);

  // Hàm xóa bài viết
  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bài này không?",
    );
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      navigate("/");
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
    }
  };

  // Nếu đang loading thì hiện màn hình Loading chính tâm
  if (loading) {
    return (
      <div className="loadingContainer">
        <h2 className="loadingText">Đang tải câu chuyện nghệ thuật...</h2>
      </div>
    );
  }

  return (
    <div className="postDetailPage">
      <div className="postDetailContainer">
        <h1 className="detailTitle">{post?.title}</h1>

        <div className="detailContent">{post?.postText}</div>

        <div className="detailFooter">
          <button className="backBtn" onClick={() => navigate("/")}>
            ← Quay lại
          </button>

          <div className="footerRightSide">
            {isAuth && post?.author?.id === auth.currentUser?.uid && (
              <div className="postButtons">
                <button
                  className="editBtn"
                  title="Chỉnh sửa"
                  onClick={() => {
                    setPostToEdit(post);
                    navigate("/create");
                  }}
                >
                  ✏️
                </button>
                <button
                  className="deleteBtn"
                  title="Xóa bài"
                  onClick={deletePost}
                >
                  🗑️
                </button>
              </div>
            )}
            <span className="postAuthor">@{post?.author?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

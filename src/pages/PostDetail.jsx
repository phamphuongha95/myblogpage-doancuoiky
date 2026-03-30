import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

function PostDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("Không tìm thấy bài viết!");
      }
    };
    getPost();
  }, [id]);

  if (!post) {
    return (
      <div className="loadingContainer">
        <h2 className="pageTitle">Đang tải...</h2>
      </div>
    );
  }

  // PostDetail.jsx
  return (
    <div className="postDetailPage">
      <div className="postDetailContainer">
        {/* Đảm bảo dùng class riêng biệt, không dùng chung postHeader của Home */}
        <div className="detailHeader">
          <h1 className="detailTitle">{post.title}</h1>
        </div>

        <div className="detailContent">{post.postText}</div>

        <div className="detailFooter">
          <button className="backBtn" onClick={() => navigate("/")}>
            ← Quay lại
          </button>
          <span className="postAuthor">@{post.author.name}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

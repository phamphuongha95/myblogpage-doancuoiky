import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <nav>
      {/* Bên trái: Logo/Tên Blog */}
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontFamily: "'Playfair Display', serif",
          color: "white",
          textDecoration: "none",
        }}
      >
        BLOG ARTISTIC
      </Link>

      {/* Bên phải: Các link điều hướng */}
      <div className="nav-links">
        <Link to="/">Trang Chủ</Link>

        {!isAuth ? (
          <Link to="/login">Đăng Nhập</Link>
        ) : (
          <>
            <Link to="/create">Viết Blog</Link>
            <button onClick={signUserOut}>Đăng Xuất</button>
          </>
        )}
      </div>
    </nav>
  );
}

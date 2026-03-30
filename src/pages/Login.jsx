import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h2 className="loginTitle">Chào Mừng Trở Lại</h2>
        <p className="loginSubtitle">
          Đăng nhập để chia sẻ những câu chuyện của bạn
        </p>

        {/* Container này sẽ đẩy cái nút xuống */}
        <div className="loginButtonWrapper">
          <button onClick={signInWithGoogle} className="login-with-google-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Logo"
            />
            Tiếp tục với Google
          </button>
        </div>
      </div>
    </div>
  );
}

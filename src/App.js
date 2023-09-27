// @ts-nocheck
import { Link } from "react-router-dom";
import "./App.css";
import logoPage from "./imgs/to-do-list-1.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/confing";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    return (
      <div className="App">
        <main>
          <div className="logo">
            <h2>
              <i className="fa-solid fa-check-double"></i> workEren
            </h2>
          </div>
          <div className="container">
            <div className="img-div">
              <img src={logoPage} alt="img" />
            </div>
            <div className="loading-page-info">
              <h1>
                تسهيل قائمة المهام <br />
                باستخدام قاعدة بيانات مجانية
              </h1>
  
              <Link to={"/Signup"}>
                <button>انشاء حساب</button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (user) {
    navigate("/Home")
  }
}

export default App;

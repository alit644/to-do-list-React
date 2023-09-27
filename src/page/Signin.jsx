import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase/confing';


const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const nextbtn = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        navigate("/Home")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <main className="signup">
        <div className="signup-container">
          <div className="logo">
            <Link to={"/"}>
              <h2>
                <i className="fa-solid fa-check-double"></i> workEren
              </h2>
            </Link>
          </div>

          <form>
            <input onChange={(eo) => {
              setemail(eo.target.value)
            }} type="text" placeholder="قم بكتابة الايميل الخاص بك" />
            <input onChange={(eo) => {
              setpassword(eo.target.value)
            }} type="password" placeholder="كلمة المرور" />
            <button
              onClick={(eo) => {
                nextbtn(eo);
              }}
            >
              {loading ? (
                  <ReactLoading
                    type={"spin"}
                    color={"red"}
                    height={"20px"}
                    width={"20px"}
                  />
              ) : (
                "التالي"
              )}
            </button>
          </form>

          <p>
            ليس لديك حساب على هذه المنصة ؟{" "}
            <Link to={"/Signup"}>انشاء حساب</Link>{" "}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signin;

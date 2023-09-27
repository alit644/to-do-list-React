import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/confing";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [userName, setuserName] = useState("");

  const navigate = useNavigate();

  //! my functions
  // add to Next Btn
  const nextBtn = (eo) => {
    eo.preventDefault();

    const auth = getAuth();
    setloading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        const auth = getAuth();
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            console.log(error);
            // An error occurred
            // ...
          });
        // ...
        navigate("/Home");
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  //! my functions end

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
            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              type="text"
              placeholder="userName"
              required
            />

            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              type="text"
              placeholder="Enter Your Email "
              required
            />
            <input
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              type="password"
              placeholder="Password "
              required
            />
            <button
              onClick={(eo) => {
                nextBtn(eo);
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
                "Next"
              )}
            </button>
          </form>

          <p>
            هل لديك حساب ؟ <Link to={"/Signin"}>تسجيل الدخول</Link>{" "}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;

// @ts-nocheck
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "../firebase/confing";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import AllTaskSection from "./AllTaskSection";
import Model from "../shared/model";
import { useState } from "react";
import { and, doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";

const Home = () => {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const [showModel, setshowModel] = useState(false);
  const [TaskTitel, setTaskTitel] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [loadingSpin, setloadingSpin] = useState(false);
  const [widths, setwidths] = useState("230px");

  const submitBTN = async (eo) => {
    const taskId = new Date().getTime();
    eo.preventDefault();
    setloadingSpin(true);
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: TaskTitel,
      detalis: array,
      taskId: taskId,
      completed: false,
    });
    setarray([]);
    setTaskTitel("");
    setloadingSpin(false);
    setshowModel(false);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };
  const addsubTask = () => {
    if (!array.includes(subTask)) {
      array.push(subTask);
    }
    setsubTask("");
  };

  const closeModel = () => {
    setshowModel(false);
  };

  const logOutBtn = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (error) {
    return (
      <div>
        <h1>error 404</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  }

  if (!user) {
    navigate("/");
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <div className="main-page">
          <section className="slide-bar">
            <div>
              <div className="logo-slide">
                <h2>
                  <i className="fa-solid fa-check-double"></i> workEren
                </h2>
                <i className="fa-solid fa-chevron-left"></i>
              </div>

              <div className="slide-content">
                <article>
                  <i className="fa-solid fa-plus"></i>
                  <p>مشروع جديد</p>
                </article>
              </div>
            </div>

            <div className="account-info">
              <h3>
                {" "}
                <p>{user.displayName.slice(0, 2)}</p> {user.displayName}
              </h3>
              <article>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p
                  onClick={() => {
                    logOutBtn();
                  }}
                >
                  تسجيل الخروج
                </p>
              </article>
            </div>
          </section>

          <section className="main-contaetn">
            <h1 dir="rtl">
              {" "}
              {user.displayName} اهلا وسهلا بك سيد <br />
              من فضلك قم بتأكيد الايميل الخاص بك لعرض لوجة القيادة
            </h1>
          </section>
        </div>
      );
    }
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <div className="main-page">
          <section style={{ width: widths }} className="slide-bar lg-screen">
            <div>
              <div className="logo-slide">
                <h2>
                  <i className="fa-solid fa-check-double"></i>{" "}
                  {widths === "230px" && "workEren"}
                </h2>
                <i
                  onClick={() => {
                    setwidths(widths === "230px" ? "45px" : "230px");
                  }}
                  className="fa-solid fa-chevron-left"
                ></i>
              </div>

              <div className="slide-content">
                <article
                  onClick={() => {
                    setshowModel(true);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                  {widths === "230px" && <p>مشروع جديد</p>}
                </article>
              </div>
            </div>

            <div className="account-info">
              <h3>
                {" "}
                <p>{user.displayName.slice(0, 2)}</p>{" "}
                {widths === "230px" && user.displayName}
              </h3>
              <article
                onClick={() => {
                  logOutBtn();
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p>{widths === "230px" && <p>تسجيل الخروج</p>}</p>
              </article>
            </div>
          </section>

          <section style={{ width: "45px" }} className="slide-bar phone">
            <div>
              <div className="logo-slide">
                <h2>
                  <i className="fa-solid fa-check-double"></i>
                </h2>
              </div>

              <div className="slide-content">
                <article
                  onClick={() => {
                    setshowModel(true);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </article>
              </div>
            </div>

            <div className="account-info">
              <h3>
                {" "}
                <p>{user.displayName.slice(0, 2)}</p>
              </h3>
              <article
                onClick={() => {
                  logOutBtn();
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p></p>
              </article>
            </div>
          </section>

          <section style={{ flex: "1" }} className="main-contaetn">
            <AllTaskSection />

            {showModel && (
              <Model closeModel={closeModel}>
                <div className="model-content">
                  <form className="model-form">
                    <p>Add item</p>
                    <label>احفظ بهذا الاسم</label>
                    <input
                      onChange={(eo) => {
                        setTaskTitel(eo.target.value);
                      }}
                      style={{ width: "50%" }}
                      type="text"
                      placeholder="اسم المشروع"
                    />
                    <label>المهام</label>
                    <div className="input-taskDiv">
                      <input
                        onChange={(eo) => {
                          detailsInput(eo);
                        }}
                        style={{ flex: "1" }}
                        type="text"
                        placeholder=""
                        value={subTask}
                      />
                      <button
                        onClick={(eo) => {
                          eo.preventDefault();
                          addsubTask();
                        }}
                        className="add-taskBtn"
                      >
                        اضف <i className="fa-regular fa-square-caret-down"></i>
                      </button>
                    </div>

                    <ul>
                      {array.map((item) => {
                        return <li>{item}</li>;
                      })}
                    </ul>

                    <button
                      onClick={(eo) => {
                        submitBTN(eo);
                      }}
                      className="add-btn"
                    >
                      {loadingSpin ? (
                        <div style={{ paddingLeft: "20px" }}>
                          <ReactLoading
                            type={"spin"}
                            color={"red"}
                            height={22}
                            width={22}
                          />
                        </div>
                      ) : (
                        "أرسال"
                      )}
                    </button>
                  </form>
                </div>
              </Model>
            )}
          </section>
        </div>
      );
    }
  }
};

export default Home;

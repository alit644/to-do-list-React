import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";

import "./UserInformation.css";
import OnetitleSection from "./onetitleSection";
import TwouserTasks from "./twouserTasks";
import Threebtns from "./threebtns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/confing";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import ReactLoading from "react-loading";
const UserInformation = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [showData, setshowData] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const deleteAllTasks = async () => {
    setshowData(true)
    await deleteDoc(doc(db, user.uid, id));
    navigate("/", { replace: true });
  };

  if (error) {
    return (
      <main>
        <h1>error : {error.message} </h1>
      </main>
    );
  }

  if (loading) {
    return (
      <main>
        <h1>Loading</h1>
      </main>
    );
  }

  if (user) {
    return (
      <div>
        {showData ? (
          <main>
            <ReactLoading type={"spin"} color={"red"} height={60} width={60} />
            
          </main>
        ) : (
          <div className="userPage">
            <Link to={"/Home"}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </Link>
            <div className="information">
              <OnetitleSection user={user} id={id} />

              <TwouserTasks user={user} id={id} />

              <Threebtns user={user} id={id} deleteAllTasks={deleteAllTasks} />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default UserInformation;

import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase/confing";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PageTasks = ({ user }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  if (error) {
    return (
      <main>
        <h1>error 404</h1>
      </main>
    );
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ReactLoading type={"spin"} color={"red"} height={70} width={70} />
      </div>
    );
  }

  if (value) {
    return (
      <div>
        <section className="table-pernet" style={{ overflowX: "auto", width: "100%"}}>
          <table>
            <tr>
              <th></th>
              <th>الاسم</th>
              <th>المهام</th>
              <th>الحالة</th>
              <th>التاريخ</th>
            </tr>

            {value.docs.map((item) => {
              return (
                  <tr>
                    <td>{item.data().taskId}</td>
                    <td>{item.data().title}</td>
                    <td>
                      <ul>
                        {item.data().detalis.map((item, index) => {
                          if (index < 2) {
                            return <li>{item}</li>;
                          } else {
                            return false;
                          }
                        })}
                      </ul>
                    </td>
                    <td>
                      {item.data().completed ? (
                        <p>
                          <i
                            style={{ color: "seagreen" }}
                            className="fa-regular fa-circle-check"
                          ></i>{" "}
                          مكتمل
                        </p>
                      ) : (
                        <p>
                          <i
                            style={{ color: "red" }}
                            className="fa-regular fa-circle-xmark"
                          ></i>{" "}
                          غير مكتمل
                        </p>
                      )}
                    </td>
                    <td>
                      <Moment
                        format="YYYY/MM/DD"
                        date={item.data().taskId}
                      ></Moment>
                    </td>
                    <td>
                    <Link to={`/UserInformation/${item.data().taskId}`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                    </td>
                  </tr>
              );
            })}
          </table>
        </section>
      </div>
    );
  }
};

export default PageTasks;

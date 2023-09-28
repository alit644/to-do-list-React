import { db } from "../../firebase/confing";
import { and, arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import Moment from "react-moment";

const TwouserTasks = ({ user, id }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [inputValue, setinputValue] = useState('');
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

  if (value) {
    return (
      <div>
        <section className="userTasks">
          <article className="completedTime">
            <p className="time">
              {" "}
              <Moment format="YYYY/MM/DD" date={value.data().taskId}></Moment>
            </p>

            <div>
              <input
                checked={value.data().completed}
                onChange={async (eo) => {
                  await updateDoc(doc(db, user.uid, id), {
                    completed: eo.target.checked === true ? true : false,
                  });
                }}
                type="checkbox"
              />
              <label>أكتمل</label>
            </div>
          </article>

          <article className="userTask">
            <div className="subTask">
              {value.data().detalis.map((item) => {
                return (
                  <div>
                    <p>{item}</p>
                    <i
                      onClick={async () => {
                        await updateDoc(doc(db, user.uid, id), {
                          detalis: arrayRemove(item),
                        });
                      }}
                      className="fa-solid fa-trash"
                    ></i>
                  </div>
                );
              })}
            </div>
          </article>

          {showAddNewTask && (
            <div className="addNewTask">
              <input value={inputValue} onChange={(eo) => {
                setinputValue(eo.target.value)
              }} type="text" placeholder="مهام جديدة" />
              <button onClick={ async () => {
                await updateDoc(doc(db, user.uid, id), {
                  detalis: arrayUnion(inputValue),
                });
                setinputValue("")
              }} className="add">add</button>

              <button onClick={() => {
                setshowAddNewTask(false)
              }} className="cancel">Cancel</button>
            </div>
          )}

          <article className="flex">
            <button onClick={() => {
              setshowAddNewTask(true)
            }} className="addBtn ">
              {" "}
              <i className="fa-solid fa-plus"></i> اضافة المزيد{" "}
            </button>
          </article>
        </section>
      </div>
      
    );
  }
};

export default TwouserTasks;

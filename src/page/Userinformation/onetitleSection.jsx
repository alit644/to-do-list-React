// @ts-ignore
import { db } from "../../firebase/confing";
import {doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const OnetitleSection = ({user , id}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid , id));


      
  if (error) {
    return(
      <main>
        <h1>error : {error.message} </h1>
      </main>
    )
}

  if (loading) {
      return(
        <main>
          <h1>Loading</h1>
        </main>
      )
  }


  if (value) {
    return (
      <div>
        <section className="titleSection">
          <input type="text" defaultValue={value.data().title} />
          <i className="fa-regular fa-pen-to-square"></i>
        </section>
      </div>
    );
  }
};

export default OnetitleSection;

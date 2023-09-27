import { db } from '../../firebase/confing';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router';

const Threebtns = ({user , id ,deleteAllTasks}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid , id));
  return (
    <div>
        <section className="btns">
          

            <article>
              <button onClick={ async () => {
                deleteAllTasks()
              // @ts-ignore
            }} className="deleteBtn"> حذف المهام </button>
            </article>
        </section>
    </div>
  );
}

export default Threebtns;

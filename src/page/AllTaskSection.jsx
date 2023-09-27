import { NavLink } from "react-router-dom";
import "./AllTasksection.css";
import PageTasks from "./PageTasks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/confing";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const AllTaskSection = () => {
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    <main>
      <h1>error 404</h1>
    </main>;
  }

  if (loading) {
    <main>
      <h1>Loadingg</h1>
    </main>;
  }

  if (user) {
    return (
      <div dir="rtl">
        <main className="allTasks">
          <section className="filters">
            <article>
              <i className="fa-solid fa-filter"></i> جميع المهام
            </article>

            <article>
              <i className="fa-solid fa-arrow-down-z-a"></i> الأقدم
            </article>

            <article>
              <i className="fa-solid fa-arrow-up-a-z"></i> الأحدث
            </article>

            <article>
              <i className="fa-regular fa-circle-check"></i> مكتمل
            </article>
          </section>

          {/* table */}

          <PageTasks user={user} />
        </main>
      </div>
    );
  }
};

export default AllTaskSection;

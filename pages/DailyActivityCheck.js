import { useState } from "react";
import Activity from "../components/Activity";
import CreateModal from "../components/CreateModal";
import useFetch from "../hooks/useFetch";
import useModal from "../hooks/useModal";

export default function DailyActivityCheck({ activities: initialActivities }) {
  const [activities, setActivities] = useState(initialActivities);
  const [createModalState, openCreateModal, closeCreateModal] = useModal();

  //   const { logout, user } = useAuth();

  const { get, post } = useFetch();

  const createActivity = async (title) => {
    const res = await post(
      "http://localhost:3000/api/DailyActivityCheck/createActivity",
      { activityTitle: title }
    );
    if (res.err) return alert(res.err);
    getActivities();
  };

  const deleteActivity = async (id) => {
    const res = await post(
      "http://localhost:3000/api/DailyActivityCheck/deleteActivity",
      { activityId: id }
    );

    if (res.err) return alert(res.err);
    getActivities();
  };

  const getActivities = async () => {
    const res = await get(
      "http://localhost:3000/api/DailyActivityCheck/getActivities"
    );
    setActivities(res);
  };

  const checkToday = async (id) => {
    const res = await post(
      "http://localhost:3000/api/DailyActivityCheck/checkToday",
      { activityId: id }
    );

    if (res.err) return alert(res.err);
    getActivities();
  };

  return (
    <>
      <CreateModal
        active={createModalState}
        close={closeCreateModal}
        func={createActivity}
      />

      <div className="section hero">
        <p className="title">Your Activities</p>

        <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
          {activities.map((a) => (
            <Activity
              key={a._id}
              data={a}
              destroy={deleteActivity}
              check={checkToday}
            />
          ))}
          <div
            className="notification is-primary has-text-centered subtitle"
            style={{ cursor: "pointer" }}
            onClick={openCreateModal}
          >
            New Activity
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const activities = await fetch(
    "http://localhost:3000/api/DailyActivityCheck/getActivities"
  ).then((res) => res.json());
  return {
    props: { activities },
  };
}

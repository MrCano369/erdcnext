import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectID } from "mongodb";

Array.prototype.last = function () {
  return this[this.length - 1];
};

function differenceInDays(today, day) {
  return (new Date(today) - new Date(day)) / 86400000;
}

function getToday() {
  return new Date(new Date() - 3600000 * 8).toDateString();
}

export default async (req, res) => {
  const { activityId } = req.body;
  if (!activityId) return res.json({ err: "Datos incompletos" });

  const { db } = await connectToDatabase();
  const activity = await db
    .collection("mrcano369 activities")
    .findOne({ _id: ObjectID(activityId) });

  if (!activity) return res.json({ err: "Actividad inexistente" });

  const today = getToday();
  if (activity.days.length) {
    const diff = differenceInDays(today, activity.days.last());
    if (diff == 1) activity.days.push(today);
    if (diff >= 2) activity.days = [today];
  } else activity.days.push(today);

  await db
    .collection("mrcano369 activities")
    .updateOne(
      { _id: ObjectID(activityId) },
      { $set: { days: activity.days } }
    );

  //   activity.todayCheck = true;
  //   res.json(activity);
  res.json({ ok: "checked" });
};

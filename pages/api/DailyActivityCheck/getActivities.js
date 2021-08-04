import { connectToDatabase } from "../../../lib/mongodb";

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
  const today = getToday();
  const { db } = await connectToDatabase();
  const activities = await db
    .collection("mrcano369 activities")
    .find({})
    .toArray();

  activities.forEach(async (activity) => {
    activity.todayCheck = false;
    if (activity.days.length) {
      const diff = differenceInDays(today, activity.days.last());
      if (diff == 0) activity.todayCheck = true;
      if (diff >= 2) {
        activity.days = [];
        // await UserActivities.findByIdAndUpdate(activity._id, { days: [] });
      }
    }
  });

  res.json(activities);
};

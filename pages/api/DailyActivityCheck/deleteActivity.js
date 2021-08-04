import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectID } from "mongodb";

export default async (req, res) => {
  const { activityId } = req.body;
  if (!activityId) return res.json({ err: "Datos incompletos" });

  const { db } = await connectToDatabase();
  await db
    .collection("mrcano369 activities")
    .deleteOne({ _id: ObjectID(activityId) });
  res.json({ ok: "deleted" });
};

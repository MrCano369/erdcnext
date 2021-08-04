import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { activityTitle } = req.body;
  if (!activityTitle) return res.json({ err: "Datos incompletos" });

  const { db } = await connectToDatabase();
  const existing = await db.collection("mrcano369 activities").findOne({
    title: activityTitle,
  });
  if (existing)
    return res.json({ err: "Ya tienes una actividad con ese título" });

  await db.collection("mrcano369 activities").insertOne({
    title: activityTitle,
    days: [],
  });
  res.json({ ok: "created" });
};

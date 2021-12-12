const faunadb = require("faunadb");

const secret = process.env.FAUNADB_SECRET_KEY;
const domain = "db.us.fauna.com";
const q = faunadb.query;
const client = new faunadb.Client({ secret, domain });

// all serverless functions via fauna use modules.exports = async
module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      q.Map(q.Paginate(q.Match(q.Index("all_customers"))), ref => q.Get(ref))
    );
    res.status(200).json(dbs.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

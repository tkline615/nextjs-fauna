const faunadb = require("faunadb");

const secret = process.env.FAUNADB_SECRET_KEY;
const domain = "db.us.fauna.com";
const q = faunadb.query;
const client = new faunadb.Client({ secret, domain });

// all serverless functions via fauna use modules.exports = async
module.exports = async (req, res) => {
    const formData = req.body.data;
    try {
        const dbs = await client.query(
            q.Create(
                q.Collection('customers'), {
                    data: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        address: {
                            street: formData.streetAddress,
                            city: formData.city,
                            state: formData.state,
                            zipCode: formData.zipCode
                        },
                        telephone: formData.phoneNumber,
                        creditCard: {
                            network: formData.cardType,
                            number: formData.cardNumber
                        }
                    }
                }
            )
        )
        res.status(200).json(dbs.data);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}
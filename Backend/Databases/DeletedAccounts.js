const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => console.log("conect"));

const musicschema = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
});

musicschema.plugin(timestamp);

const Account = mongoose.model("deletedaccounts", musicschema);

async function deletacccount(id) {
  try {
    const account = new Account({ id });
    await account.save();
    return {
      status: true,
      msg: "Your account deleted.If you login until 30 days you will use that",
    };
  } catch {
    return false;
  }
}
async function checkdeleteaccount(id) {
  const account = await Account.findOne({ userid: id });
  return account ? true : false;
}
async function loginback(id) {
  try {
    await Account.findOneAndRemove({ userid: id });

    return {
      status: true,
      msg: "Welcome back",
    };
  } catch {
    return false;
  }
}

module.exports = {
  deletacccount,
  loginback,
  checkdeleteaccount
};

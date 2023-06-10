const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SigfoxSchema = mongoose.Schema({
  name: {
    type: String,
  },
  ruche: {
    type: Schema.Types.ObjectId,
    ref: "ruches"
  },
});

module.exports = mongoose.model("sigfox", SigfoxSchema);

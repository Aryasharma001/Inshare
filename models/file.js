const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("File", fileSchema);

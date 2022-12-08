const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    studentemail: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      maxlength: 50,
    },
    dob: {
      type: String,
      required: true,
      maxlength: 50,
    },
    rollno: {
      type: String,
      required: true,
      maxlength: 50,
    },
    class: {
      type: String,
      required: true,
      maxlength: 50,
    },
    marks: {
      type: String,

      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

studentsSchema.plugin(uniqueValidator);

const Students = mongoose.model("Students", studentsSchema);

module.exports = Students;

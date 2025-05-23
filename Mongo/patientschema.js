const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  Name: String,
  Practice: String,
  Patient: String,
  AllergyType: String,
  NoofInjection: Number,
  TestType: String,
  MedicalInsurance: Boolean,
  photo: String,
});
module.exports = mongoose.model("Patients", patientSchema);

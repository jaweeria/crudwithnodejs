const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Patient");

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
const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//Adding data in Database

const SaveInDB = async () => {
  const patientModal = mongoose.model("Patients", patientSchema);
  let data = new patientModal({
    Name: "Ali",
    Practice: "DHQ",
    Patient: "Khan",
    AllergyType: "Food",
    NoofInjection: 3,
    TestType: "Allergy Test",
    MedicalInsurance: true,
  });
  let result = await data.save();
  console.log(result);
};

//Adding login data
const SaveloginDatainDB = async () => {
  const loginModal = mongoose.model("Login", loginSchema);
  let data = new loginModal({
    email: "ali@gmail.com",
    password: "12345",
  });
  let result = await data.save();
  console.log(result);
};
SaveInDB();
SaveloginDatainDB();

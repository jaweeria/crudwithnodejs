const express = require("express");
require("./Mongo/config");
const router = require("./route");
const multer = require("multer");
const jwt = require("jsonwebtoken");
// this connects to DB
const Patients = require("./Mongo/patientschema");
const loginSchema = require("./Mongo/LoginSchema");
//for swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const app = express();
const path = require("path");

const cors = require("cors");
// const LoginSchema = require("./Mongo/LoginSchema");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//configure multer for fie upload
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads"); // Folder to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //unique name for file
  },
});
const upload = multer({ storage: storage });
// 401 unauthorized error checking
const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from "Authorization: Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded user data in request for further use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Create API for login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await loginSchema.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // 2. Check password (plain-text comparison for now)
//     if (user.password !== password) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     // 3. Login success

//     const token = user?.getJWTToken();
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// CREATE
// app.post("/add", checkAuth, upload.single("photo"), async (req, res) => {
//   try {
//     const {
//       Name,
//       Practice,
//       AllergyType,
//       NoofInjection,
//       TestType,
//       MedicalInsurance,
//     } = req.body;

//     if (
//       !Name ||
//       !Practice ||
//       !AllergyType ||
//       !NoofInjection ||
//       !TestType ||
//       !MedicalInsurance
//     ) {
//       return res
//         .status(400)
//         .send("Name, Practice, and other fields are required");
//     }

//     const patientData = {
//       ...req.body,
//       photo: req.file ? `/uploads/${req.file.filename}` : null,
//     };
//     const newPatient = new Patients(patientData);

//     const result = await newPatient.save();
//     res.status(201).send(result);
//   } catch (err) {
//     console.error("Error saving patient:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // READ
// app.get("/", checkAuth, async (req, res) => {
//   try {
//     const result = await Patients.find();
//     console.log(Patients, "what");
//     res.send(result);
//   } catch (err) {
//     console.error("Error fetching patients:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // UPDATE
// const { ObjectId } = require("mongoose").Types;

// app.put("/update/:id", checkAuth, upload.single("photo"), async (req, res) => {
//   try {
//     const {
//       Name,
//       Practice,
//       AllergyType,
//       NoofInjection,
//       TestType,
//       MedicalInsurance,
//     } = req.body;

//     if (
//       !Name ||
//       !Practice ||
//       !AllergyType ||
//       !NoofInjection ||
//       !TestType ||
//       !MedicalInsurance
//     ) {
//       return res
//         .status(400)
//         .send("Name, Practice, and other fields are required");
//     }
//     const updateData = {
//       ...req.body,
//     };
//     // Only update photo if a new image is uploaded
//     if (req.file) {
//       updateData.photo = `/uploads/${req.file.filename}`;
//     }
//     const result = await Patients.updateOne(
//       { _id: new ObjectId(req.params.id) },
//       { $set: updateData }
//     );
//     res.send(result);
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // DELETE
// app.delete("/delete/:id", checkAuth, async (req, res) => {
//   try {
//     const result = await Patients.deleteOne({
//       _id: new ObjectId(req.params.id),
//     });
//     res.send(result);
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(5001, () => {
  console.log("🚀 Server is running on http://localhost:5001");
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  "/uploads/web/slider",
  express.static(path.join(__dirname, "uploads/web/slider"))
);
app.use(
  "/uploads/web/about",
  express.static(path.join(__dirname, "uploads/web/about"))
);
app.use(
  "/uploads/web/gallery",
  express.static(path.join(__dirname, "uploads/web/gallery"))
);
app.use(
  "/uploads/web/student_reg",
  express.static(path.join(__dirname, "uploads/web/student_reg"))
);
app.use(
  "/uploads/teacher",
  express.static(path.join(__dirname, "uploads/teacher"))
);
app.use(
  "/uploads/schoolEvents/",
  express.static(path.join(__dirname, "uploads/schoolEvents/"))
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const sliderRoutes = require("./route/sliderRoutes");
const aboutRoutes = require("./route/aboutRoutes");
const eventRoutes = require("./route/eventRoutes");
const galleryRoutes = require("./route/galleryRoutes");
const faqRoutes = require("./route/faqRoutes");
const appInfoRoute = require("./route/appInfoRoute");
const studentRoutes = require("./route/studentRoutes");
const manageMediumRoute = require("./route/manageMediumRoute");
const sectionRoutes = require("./route/sectionRoutes");
const streamRoutes = require("./route/streamRoutes");
const shiftRoutes = require("./route/shifts");
const subjectRoute = require("./route/subjectRoute");
const semesterRoute = require("./route/semesterRoutes");
const classesRoute = require("./route/classes");
const teacherFormRoute = require("./route/teacherForm");
const leaveSettingRoute = require("./route/leaveSettingRoute");
const schoolEvent = require("./route/schoolEvent");
const holidaysRoute = require("./route/holidays");
const stuentCategoryRoute = require("./route/studentCategory");
app.use("/api/sliders", sliderRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/apps", appInfoRoute);
app.use("/api/students", studentRoutes);
app.use("/api/mediums", manageMediumRoute);
app.use("/api/sections", sectionRoutes);
app.use("/api/streams", streamRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/subject", subjectRoute);
app.use("/api/semesters", semesterRoute);
app.use("/api/classes", classesRoute);
app.use("/api/teachers", teacherFormRoute);
app.use("/api/leave_setting", leaveSettingRoute);
app.use("/api/school_events", schoolEvent);
app.use("/api/holidays", holidaysRoute);
app.use("/api/student_category", stuentCategoryRoute);
// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

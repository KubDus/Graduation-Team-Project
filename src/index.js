import UserRouter from "./routes/userRouter";
import ApprenticeshipRouter from "./routes/apprenticeshipRouter";
import ClassRouter from "./routes/classRouter";
import CohortRouter from "./routes/cohortRouter";
import DashboardRouter from "./routes/dashboardRouter";
import MentorshipRouter from "./routes/mentorshipRouter";
import sequelize from "./config/database";
import express from 'express';
import utils from "./utils/utils";
import ExamRouter from "./routes/examRouter";


import User from "./models/user";
import Phase from "./models/phase";
import Role from "./models/role";
import Status from "./models/status";
import Country from "./models/country";
import Schedule from "./models/schedule";
import Class from "./models/class";
import Cohort from "./models/cohort";
import ClassType from "./models/classType";
import Apprenticeship from "./models/apprenticeship";
import Exam from "./models/exam";
import Mentorship from "./models/mentorship";
import ScheduleRouter from "./routes/scheduleRouter";

require('dotenv').config();

const app = express();
const cors = require('cors');

sequelize.sync({ force: true }).then(async () => {
    await Role.create({ name: "apprentice" });
    await Role.create({ name: "mentor" });
    await Role.create({ name: "admin" });
    await Role.create({ name: "mentor + admin" });
    await Status.create({ name: "DISABLED" });
    await Status.create({ name: "EMAIL_SENT" });
    await Status.create({ name: "ENABLED" });
    await Status.create({ name: "ACTIVE" });
    await Status.create({ name: "PASSED" });
    await Status.create({ name: "FAILED" });
    await Status.create({ name: "SOFT-DELETED" });

    await Cohort.create({ name: "Cool Cohort", status: "ACTIVE"});
    await Cohort.create({ name: "Lame Cohort", status: "ACTIVE" });
    await Country.create({ name: "CZ" });
    await Country.create({ name: "SK" });
    await Country.create({ name: "HU" });

    await Class.create({ name: "Celadon", cohortName : "Cool Cohort" });
    await Class.create({ name: "Tigers", cohortName : "Cool Cohort" });
    await Class.create({ name: "Turtles", cohortName : "Lame Cohort" });
    await Class.create({ name: "Apes", cohortName : "Lame Cohort" });

    await User.create({
        firstName: "Lukas", lastName: "Habanec", username: "Lupen", email: "L.be@atlas.cz", password: utils.hashPassword("Asdf1234"),
        role: "apprentice", status: "ENABLED", authenticationLink: "asti4867r", class: "Celadon"
    });
    await User.create({ firstName: "Stefan", lastName: "Huzvar", email: "s@h.sk", password: utils.hashPassword("Asdf1234"), role: "apprentice", status: "ENABLED", authenticationLink: "fsti4867r", class : "Celadon"});
    await User.create({ firstName: "Denis", lastName: "Ergenekon", email: "d@e.sk", password: utils.hashPassword("Asdf1234"), role: "apprentice", status: "ENABLED", registrationLink: "bsti4867r"})
    await User.create({ firstName: "Jakub", lastName: "Dus", email: "j@d.cz", password: utils.hashPassword("Asdf1234"), role: "apprentice", status: "ENABLED", registrationLink: "csti4867r"})
    await User.create({ firstName: "Jakub", lastName: "Korch", email: "j@k.sk", password: utils.hashPassword("Asdf1234"), role: "admin", status: "ENABLED", registrationLink: "dsti4867r"})
    await User.create({ firstName: "Adam", lastName: "Koubek", email: "a@k.cz", password: utils.hashPassword("Asdf1234"), role: "mentor", status: "ENABLED", registrationLink: "gsti4867r"})
    await User.create({ firstName: "Jakub", lastName: "Kozak", email: "j@koza.cz", password: utils.hashPassword("Asdf1234"), role: "mentor + admin", status: "ENABLED", registrationLink: "xsti4867r"})
    await User.create({ firstName: "User", lastName: "Authentication", email: "u@a.com", password: utils.hashPassword("Asdf1234"), role: "apprentice", status: "EMAIL_SENT", authenticationLink: "zsti4867r", class : "Celadon"});
    await User.create({ firstName: "Password", lastName: "Forgotten", email: "p@f.com", password: utils.hashPassword("Asdf1234"), role: "apprentice", status: "EMAIL_SENT", authenticationLink: "testingLink", class : "Celadon", authenticationExpiration : "01-01-9999"});

    await Cohort.create({ name: "Bengalensis", countryId: "CZ" });
    await ClassType.create({ week: 1, day: 1, topic: "SIC" });
    await Phase.create({ week: 1, day: 1, topic: "FOUNDATION" });
    await Phase.create({ week: 2, day: 1, topic: "ORIENTATION" });
    await Schedule.create({ cohort: 1, class: 1, phase: "FOUNDATION", week: 1, day: 1, topic: "JS Basics", mentor: 6, dedication: 50 });
    await Schedule.create({ cohort: 1, class: 1, phase: "ORIENTATION", week: 2, day: 5, topic: "OOP", mentor: 6, dedication: 69 });
    await Class.create({ name: "Caledon", cohortName: "Bengalensis", classTypeId: 1 });
    await Apprenticeship.create({ user: 1, cohort: 1, class: 1, phase: "FOUNDATION", status: "ENABLED", startdate: "2021-11-22", enddate: "2022-01-07" });
    await Apprenticeship.create({ user: 1, cohort: 1, class: 1, phase: "ORIENTATION", status: "ENABLED" });
    await Apprenticeship.create({ user: 3, cohort: 1, class: 1, phase: "FOUNDATION", status: "ENABLED" });
    await Mentorship.create({ user: 6, cohort: 1, class: 1, phase: "FOUNDATION", dedication: 50 });
    await Mentorship.create({ user: 7, cohort: 2, class: 1, phase: "ORIENTATION", dedication: 80 });

    await Exam.create({phase: "ORIENTATION", isRetake: false, date: "2022-01-01"});
    await Exam.create({phase: "FOUNDATION", isRetake: false, date: "2022-02-02"});
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ApprenticeshipRouter);
app.use(UserRouter);
app.use(ClassRouter);
app.use(CohortRouter);
app.use(DashboardRouter);
app.use(ExamRouter);
app.use(MentorshipRouter);
app.use(ScheduleRouter);

app.listen(process.env.PORT, () =>
    console.log(`server running on port ${process.env.PORT}`),
);


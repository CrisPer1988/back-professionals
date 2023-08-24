const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const usersRouter = require("./routes/users.routes")
const professionalsRouter = require("./routes/professionals.routes")
const jobsRouter = require("./routes/jobs.routes")
const reviewsRouter = require("./routes/reviews.routes")
const categoriesRouter = require("./routes/categories.routes")

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/professionals", professionalsRouter)
app.use("/api/v1/jobs", jobsRouter)
app.use("/api/v1/reviews", reviewsRouter)
app.use("/api/v1/categories", categoriesRouter)

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app
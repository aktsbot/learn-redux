import express, { Router } from "express";
import { updateFav, deleteFav, getAllFavs, addFav } from "./data.js";

const PORT = process.env.PORT || 5174;

const app = express();
const router = Router();

app.use(express.json());

router.get("/favs", (req, res) => {
  return res.send(getAllFavs());
});

router.post("/favs", (req, res, next) => {
  if (!req.body.text) {
    return next({
      status: 400,
      error: "text field not found",
    });
  }
  addFav({ text: req.body.text });
  return res.sendStatus(201);
});

router.patch("/favs/:id", (req, res, next) => {
  if (!req.body.text) {
    return next({
      status: 400,
      error: "text field not found",
    });
  }

  const favUpdated = updateFav({ id: req.params.id, text: req.body.text });
  if (!favUpdated) {
    return next({
      status: 400,
      error: "fav not updated",
    });
  }

  return res.sendStatus(200);
});

router.delete("/favs/:id", (req, res, next) => {
  const favDeleted = deleteFav({ id: req.params.id });
  if (!favDeleted) {
    return next({
      status: 400,
      error: "fav not deleted",
    });
  }
  return res.sendStatus(200);
});

// hook all our routes under /api
app.use(`/api`, router);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).send({
    error: "Not found",
  });
});
// exception / error handlers
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.error || "Something went wrong";

  return res.status(status).send({
    error: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

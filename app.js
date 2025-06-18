const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/static', express.static(path.join(__dirname, 'public')));

let tasks = [];

// Display all tasks
app.get("/", (req, res) => {
  res.render("home", { tasks: tasks });
});

// Create new task
app.post("/tasks", (req, res) => {
  tasks.push(req.body.taskAdd);
  res.redirect("/");
});

// Render edit form
app.get("/tasks/:id/edit", (req, res) => {
  const index = req.params.id;
  res.render("edit", { task: tasks[index], index: index });
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const index = req.params.id;
  tasks[index] = req.body.editedTask;
  res.redirect("/");
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const index = req.params.id;
  tasks.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});
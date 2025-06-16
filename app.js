const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/static', express.static(path.join(__dirname, 'public')));

var tasks=[];

app.get("/",(req,res)=>{
  res.render("home",{tasks:tasks});
});

app.post("/",(req,res)=>{
  var task=req.body.taskAdd;
  tasks.push(task);
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  res.render("edit", { task: tasks[index], index: index });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  tasks[index] = req.body.editedTask;
  res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});
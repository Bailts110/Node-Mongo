// Requires
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan")
const mongoose = require("mongoose");



// Vars
const port = process.env.PORT || 3000;

const db_url = process.env.DB_URL;


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



require("./routes")(app)
app.all=("*",(req, res,next) =>{
  res.status(404).json({message:"Error not found"});
})

// Middlewares




// Routes
// app.get("/", async (req, res) => {
// try {
//   const posts=await Post.find();
//   res.status(200).json({
//     data:posts,
//   });
  
// } catch (error) {
//   console.log(error);
// }
// });


// app.post("/", async (req, res) => {
//   const {title, body} = req.body;
//   try {
//   const newPost=await Post.create({
//     title,
//     body,
//   });
//     res.status(201).json({
//      message:"Post created successfully",
//      data:newPost,
//     });
    
//   } catch (error) {
//     console.log(error);
//   }
//   });

  mongoose.connect(db_url).then(()=>{
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  
  




/*



app.post("/", (req, res) => {
  const { name, email, password } = req.body;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const last_id = parsedData["last_id"] + 1;
      let users = parsedData["users"];
      users.push({
        id: last_id,
        name,
        email,
        password,
      });

      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id,
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({ msg: "User has been added" });
          }
        }
      );
    }
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let userData = parsedData["users"].map(({ password, ...reset }) => reset);
      const user = userData.filter((e) => e.id == id);
      res.status(200).json({
        data: user,
      });
    }
  });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let users = parsedData["users"].filter((e) => e.id != id);
      const last_id = parsedData["last_id"];
      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id,
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({ msg: "User has deleted" });
          }
        }
      );
    }
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (data) {
      const parsedData = JSON.parse(data);
      let users = parsedData["users"];
      const userIndex = users.findIndex((user) => user.id == id);
     
      if (userIndex === -1) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      };

      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id: parsedData["last_id"],
        }),
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to update user" });
          } else {
            res.status(200).json({ msg: "User has been updated" });
          }
        }
      );
    }
  });
});

// Server

*/
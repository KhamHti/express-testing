const express = require("express");
const session = require("express-session");
const store = new session.MemoryStore();
const passport = require("passport");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postsRoute = require("./routes/posts");
const local = require("./strategies/local");

const app = express();

//middleware
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    store: store,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(store);
  console.log(`${req.method} - ${req.url}`);
  next();
});

// let passport to be work
app.use(passport.session());
app.use(passport.initialize());

app.use("/user", userRoute);
app.use("/posts", postsRoute);
app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// const users = [
//   {
//     name: "Kyaw Gyi",
//     age: 25,
//   },
//   {
//     name: "ma ammm",
//     age: 24,
//   },
//   { name: "kaung", age: 19 },
// ];

// const posts = [{ title: "my fav food" }, { title: "coding and coffee" }];

// app.get("/", (req, res) => {
//   res.send({
//     msg: "You",
//     user: {},
//   });
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   const user = req.body;
//   users.push(user);
//   res.status(201).send("Created User");
// });

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// //find by users name

// app.get("/users/:name", (req, res) => {
//   const { name } = req.params;
//   const user = users.find((user) => user.name === name);

//   if (user) {
//     res.status(200).send(user);
//   } else {
//     res.status(404).send("Not found");
//   }
// });

// app.get("/posts", (req, res) => {
//   console.log(req.query);
//   const { title } = req.query;
//   if (title) {
//     const post = posts.find((post) => post.title === title);
//     if (post) {
//       res.status(200).send(post);
//     } else {
//       res.status(404).send("Not Found");
//     }
//   }
//   res.status(200).send(posts);
// });

// //custome middleware for post/posts route
// function validateAuthToken(req, res, next) {
//   console.log("Inside validate auth token");

//   const { authorization } = req.headers;
//   if (authorization && authorization === "123") {
//     next();
//   } else {
//     res.status(403).send({ msg: "Forbbiden. Incorrect Credentials" });
//   }
// }

// app.post("/posts", validateAuthToken, (req, res) => {
//   const post = req.body;
//   console.log(post);
//   posts.push(post);
//   res.status(201).send(post);
// });

// function validateCookies(req, res, next) {
//   const { cookies } = req;
//   if ("session_id" in cookies) {
//     console.log("Session id exits.");
//     if (cookies.session_id === "123456") {
//       next();
//     } else {
//       res.status(403).json({ msg: "Not authenticated" });
//     }
//   } else {
//     res.status(403).json({ msg: "Not authenticated" });
//   }
// }

// app.get("/signin", validateCookies, (req, res) => {
//   res.cookie("session_id", "123456");
//   res.status(200).json({ msg: "Loggined In" });
// });

// app.get("/account", validateCookies, (req, res) => {
//   res.status(200).send("you are okay to edit your account");
// });

// app.post("/login", (req, res) => {
//   console.log(req.sessionID);
//   const { username, password } = req.body;
//   if (username && password) {
//     if (req.session.authenticated) {
//       res.json(req.session);
//     } else {
//       if (password === "223") {
//         req.session.authenticated = true;
//         req.session.user = { username, password };
//         res.json(req.session);
//       } else {
//         res.status(403).json({ msg: "Bad Credentials" });
//       }
//     }
//   } else res.status(403).json({ msg: "Bad Credentials" });
// });

const express = require("express");

// express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));

const blogs = require("./blogs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home2", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// ... (previous code)

// Your existing routes (e.g., GET routes)

// ...

// Add the new GET route for rendering a single blog post
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
 
  const result = blogs.find((blog) => blog.id === parseInt(id));
  console.log(result);
  res.render("details", { blog: result, title: "Blog Details" });
  if (!result) {
      // Handle the case where the blog with the specified ID is not found
      res.status(404).render("404", { title: "Blog Not Found" });
  } else {
      res.render("details", { blog: result, title: "Blog Details" });
  }
  });
 
 // The 404 page middleware (Make sure it is placed after your routes)
 
 // ...


// ... (previous code)

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Your existing routes (e.g., GET routes)

// ...

// Add the new POST route for receiving blog creation data
app.post("/blogs", (req, res) => {
  const { title, snippet, body } = req.body;

  // Generate a unique ID for the new blog
  const id = blogs.length + 1;

  // Create a new blog post with an ID
  const newBlog = { id, title, snippet, body };

  // Assuming blogs is an array
  blogs.push(newBlog);
  // console.log(newBlog);
  // Redirect to the home page after adding the new blog
  res.redirect("/");
});

// The 404 page middleware (Make sure it is placed after your routes)

// ...

// ... (previous code)

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Your existing routes (e.g., GET routes)

// ...

// Add the new POST route for receiving blog creation data
app.post("/blogs", (req, res) => {
  const { title, snippet, body } = req.body;

  // Generate a unique ID for the new blog
  const id = blogs.length + 1;

  // Create a new blog post with an ID
  const newBlog = { id, title, snippet, body };

  // Assuming blogs is an array
  blogs.push(newBlog);
  // console.log(newBlog);
  // Redirect to the home page after adding the new blog
  res.redirect("/");
});

// The 404 page middleware (Make sure it is placed after your routes)

// ...

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// listen for requests
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

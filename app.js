// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");


// Adding Initial content to the pages (Home, About, Contact) through the use of EJS
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Create app using Express
const app = express();

// Set the view engine using EJS
app.set('view engine', 'ejs');

// Using Body-Parser
app.use(bodyParser.urlencoded({extended: true}));
// Specifing to ejs that Static files are inside public folder
app.use(express.static("public"));

// Conneting to mongodb online server
mongoose.connect("mongodb+srv://admin-saurabh:eNqECSn4XwbfNdz@cluster0.ryf21.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

// Creating a Schema
const postSchema = {
  title: String,
  content: String
};

// mongoose
const Post = mongoose.model("Post", postSchema);

//the home route
app.get("/", function(req, res){

  Post.find({}, function(err, posts){
      res.render("home", { startingContent: homeStartingContent, posts: posts});
  });
});

//the about route
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

//the contact route
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

// fetching "/compose" page
app.get("/compose", function(req, res){
  res.render("compose");
});

//posting title and content in /compose page
app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  // composed blog gets saved and the user is redirected to "/" route
  post.save(function(err){
    if(!err){
        res.redirect("/");
    }
  });

});

//clicking on readmore on the home screen bring up the post with the id on the url
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId}, function(err, post){
    
    res.render("post", {
     title: post.title,
     content: post.content
   });
  });
});


// Specifying port for server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server has started SUCCESSFULLY!");
});

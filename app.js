//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "On Techslog, you can compose and post your write ups and blogs.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Hey! would you like to talk? Reach me here";

const date = new Date
const getDate = date.getFullYear();

const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.render("home", {homeStartingContent: homeStartingContent, newPosts: posts, getDate: getDate });

});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent, getDate: getDate});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent, getDate: getDate});
});

app.get("/compose", function(req, res){
  res.render("compose", {getDate: getDate});
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    imageUrl: req.body.postImage,
    bodyText: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);


    if(storedTitle === requestedTitle){
      res.render("post", {title: post.title, image: post.imageUrl, content: post.bodyText, getDate: getDate});
    }
  });

});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});

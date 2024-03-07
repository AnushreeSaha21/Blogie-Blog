import express from "express";
import bodyParser from "body-parser";
import _ from 'lodash';
import methodOverride from "method-override";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'));
let posts = [];


app.get("/", (req, res) => {

  const postsWithImages = posts.map(post => ({ ...post, image: getRandomImage() }));
  res.render("index.ejs", { locals: { posts: postsWithImages } });
});

function getRandomImage() {
  return im[Math.floor(Math.random() * im.length)];
}

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post('/compose', function (req, res) {
  const post = {
    title: req.body["title"],
    content: req.body["content"],
  };
  posts.push(post);

  res.redirect('/');
});

app.get('/blogs/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  for (var i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) === requestedTitle) {
      res.render("blogs.ejs", { postTitle: posts[i].title, postContent: posts[i].content });
    }
  }
});

app.delete('/blogs/delete/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  for (var i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) === requestedTitle) {
      posts.splice(i, 1); // Remove the element at index i
      res.redirect('/');
      return;
    }
  }
  res.status(404).send("Post not found");
});

app.get('/blogs/update/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  for (var i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) === requestedTitle) {
      res.render("update.ejs", { postTitle: posts[i].title, postContent: posts[i].content });
    }
  }


});

app.post('/blogs/update/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  for (var i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) === requestedTitle) {

      posts[i].title = req.body.title;
      posts[i].content = req.body.content;
      res.redirect('/');
      return;
    }
  }

  res.status(404).send("Post not found");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const im = [
  "background.png",
  "bird.jpg",
  "leaves.jpg",
  "floral1.png",
  "flowers1.png",
  "flowers2.jpg",
  "robin3.jpg",
  "roses.jpg"
]
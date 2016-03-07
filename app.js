var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
app.get("/", function(req, res) {
  res.render("landing");
});

// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"

//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   });

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form
  var name = req.body.name;
  var image = req.body.image;
  var dsc = req.body.description;
  var newCampground = { name: name, image: image, description: dsc };
  // Create new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.logg(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// SHOW - shows mre info about one campsite
app.get("/campgrounds/:id", function(req, res) {
  // Find campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
      // Render show template with that campground
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, function() {
  console.log("YelpCamp server listening on Port 3000");
});

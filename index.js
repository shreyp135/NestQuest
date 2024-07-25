//requires
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const review = require("./models/review.js");
const listing = require("./models/listing.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport =require("passport");
const localStrategy = require("passport-local");
const user = require("./models/user.js");
const { isloggedIn, saveRedirectUrl, isOwner } = require("./middleware.js");
const MongoStore = require("connect-mongo");
const multer  = require("multer");
const {storage} = require("./cloudConfig.js");
const upload = multer({storage});
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

//starting mongodb database
main()
  .then(() => {
    console.log("Server connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

  const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
    secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
  });

  // store.on("error", (err) =>{
  // console.log("ERROR in MONGO SESSION STORE", err);|
  // });

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

//cookie settings
const sessionOptions = {
  store,
  secret: "NestQuestsecretcode",
  resave: false,
  saveUnitialized: true,
  cookie:{
    expires: Date.now() +7*24*60*60*1000,
    maxage: 7*24*60*60*1000,
    httpOnly: true,
  }
};

//express session middlewares
app.use(session(sessionOptions));
app.use(flash()); 
//locals


//passport auth middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//user model routes

//get route for signup
app.get("/signup",(req,res)=>{
  res.render("users/signup.ejs")
});

//post route for signup
app.post("/signup",async (req,res) =>{
  let{ username, email,password} = req.body;
  const newUser = new user({email, username});
  const registeredUser = await user.register(newUser, password);
  req.login(registeredUser,(err)=>{
    if(err){
      next(err);
    }
    req.flash("success", `Welcome ${req.body.username} to NestQuest`);
  res.redirect("/listings");
  })
});

//get route for login
app.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

//post route for login
app.post("/login",saveRedirectUrl ,passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }),async(req,res)=>{
    let {usernameEmail, password} =req.body;
    const userDetails = new user()
    req.flash("success", `Welcome back to NestQuest`);
    res.redirect(res.locals.redirectUrl);

  });

  //get route for logout
  app.get("/logout", (req, res) => {
    req. logout ((err) => {
    if (err) {
    return next(err);
    }
    req. flash("success", "You are now logged out! \n come back soon !!");
    res. redirect("/listings");
    });
  }); 


//listings routes

//home route
app.get("/",(req,res)=>{
    res.redirect("/listings");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", isloggedIn,  (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({path:"review",populate: {path:"author"}}).populate("owner");
  if(!listing){
    req.flash("error","No listing found");
    res.redirect("/listings")
  }
  let response= await geocodingClient.forwardGeocode({
    query: `${listing.location},${listing.country}`,
    limit: 1,
  }).send();
  const listingCoordinates = JSON.stringify(response.body.features[0].geometry.coordinates);
  //  console.log(listingCoordinates);
  res.render("listings/show.ejs", { listing, listingCoordinates});
});

//Create Route
app.post("/listings", isloggedIn,upload.single("listing[image]"),async (req, res) => {

  let url = req.file.path;
  let filename =req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = url;
  newListing.owner = req.user._id;
  await newListing.save();
  // const ownerId = res.locals.currentUser._id;
  // await Listing.findByIdAndUpdate(req.params.id,{owner:ownerId});
  req.flash("success","New Listing created successfully");
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", isloggedIn,isOwner,async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", isloggedIn, isOwner, async (req, res) => {
 let {id} =req.params;
  await listing.findByIdAndUpdate(id, {...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id",isloggedIn, async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});


//routes for reviews

//Reviews post route
app.post("/listings/:id/reviews", async (req,res)=>{
  let { id } = req.params;
  let listing =await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = res.locals.currentUser._id;
  listing.review.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${id}`);
});

//delete review route

app.delete("/listings/:id/reviews/:reviewId", isloggedIn, async(req,res)=>{
    let{id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull:{review: reviewId}});   
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)

});



app.listen(8080, () => {
  console.log("server has started on port 8080");
});
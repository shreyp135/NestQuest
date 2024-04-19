const listing = require("./models/listing.js");


  module.exports.isloggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
       req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create a new listing");
         return res.redirect("/login");
      }
    next();
  };

  module.exports.saveRedirectUrl = (req,res,next)=>{
        if(req.session.redirectUrl)
        {
            res.locals.redirectUrl = req.session.redirectUrl;
        }
        else
        res.locals.redirectUrl ="/listings";
        next();
  };

  module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    const currentListing = await listing.findById(id);
   if(!currentListing.owner._id.equals(res.locals.currentUser._id)){
     req.flash("error", "You don't have permission to edit");
     res.redirect(`/listings/${id}`);
   }
   next();

  };

  module.exports.isAuthor = async (req,res,next)=>{
    let {id,reviewId } = req.params;
    const currentListing = await review.findById(reviewId);
   if(!currentListing.owner._id.equals(res.locals.currentUser._id)){
     req.flash("error", "You don't have permission");
     res.redirect(`/listings/${id}`);
   }
   next();

  };

  // const validateListing = (req, res, next) => {
  //   let { error } = listingSchema.validate(req.body);

  //   if (error) {
  //   let errMsg = error.details.map((el) => el.message).join(",");
  //   throw new ExpressError(400, errMsg);
  //   } 
  //   next();
  // };

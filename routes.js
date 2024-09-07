const postRoutes=require("./resources/posts/routes");
const User=require("./resources/users/routes");
const ads=require("./resources/ads/routes")
module.exports=(app)=>{
app.use("/posts", postRoutes);
app.use("/users",User );
app.use("/ads",ads );
}
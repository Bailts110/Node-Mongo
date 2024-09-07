const postRoutes=require("./resources/posts/routes");

module.exports=(app)=>{
app.use("/posts", postRoutes);
}
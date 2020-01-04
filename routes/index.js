var express = require("express");
var router = express.Router();
const graphqlHTTP = require("express-graphql");
const schema = require("../schema/schema");
/* GET home page. */

router.get("/", function(req, res, next) {
  res.send("go to /api to use GraphQl API");
});
router.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

module.exports = router;

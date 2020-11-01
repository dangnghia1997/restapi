const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Parse requests of content-type: application/json
app.use(bodyParser.json());
//Parse requests of content-type: application/x-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

require('./app/routes/customer.routes')(app);

app.listen(4000, () => {
   console.log("Server is running on port 4000");
});


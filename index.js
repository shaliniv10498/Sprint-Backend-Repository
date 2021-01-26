console.log("Hello");
const express =  require('express');
const app = express();
const bodyParser =  require('body-parser');
const port = 4000;
const cors = require('cors');
const routes = require('./api_management');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}!\n`);
});

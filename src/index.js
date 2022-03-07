const express = require("express");
require("./db/mongoose");
const orderRouter = require("./routers/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(orderRouter);

app.listen(port, () => {
	console.log(`Server is working on ${port}`);
});

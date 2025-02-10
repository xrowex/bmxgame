const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public")); // Serve static files

app.listen(port, () => {
    console.log(`BMX Game running at http://localhost:${port}`);
});
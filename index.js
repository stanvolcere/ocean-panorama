const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('Ocean Panorama Landing Page');
});

const PORT = preocess.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App started!");
})
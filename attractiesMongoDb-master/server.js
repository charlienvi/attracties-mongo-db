const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routers importeren
const attractions = require("./routes/attractions");
const responsibles = require("./routes/responsibles")

// Connectie maken met MongoDB databank
mongoose.connect("mongodb://127.0.0.1:27017/attractionsdb", {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Verbonden met Mongodb.");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

const app = express();

const port = process.env.PORT || 7000;

// Middleware registreren
app.use(cors());
app.use(express.json());

// Router registreren
app.use("/attractions", attractions);
app.use("/responsibles", responsibles);

app.get("/", (req, res) => {
    res.send("Gebruik de API routes.");
});

app.listen(port, () => {
    console.log(`Server luistert op poort ${port}`);
});
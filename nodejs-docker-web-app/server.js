import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.json({message: "App is running on Docker Container"});
});

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
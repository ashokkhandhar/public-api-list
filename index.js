import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "https://api.publicapis.org";

app.use(express.static("public"));

var categories;

let getCategories = async () => {
    categories = await axios.get(API_URL + "/categories");
}
getCategories();

app.get("/", async (req, res) => {
    try {
        const entries = await axios.get(API_URL + "/entries");
        res.render("index.ejs", { apis: entries.data.entries, categories: categories.data.categories });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    } 
});

app.get("/random", async (req, res) => {
    try {
        const random = await axios.get(API_URL + "/random");
        res.render("index.ejs", { apis: random.data.entries, categories: categories.data.categories });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});

app.listen(port, () => {
    console.log(`App Starteed at port ${port}`);
});
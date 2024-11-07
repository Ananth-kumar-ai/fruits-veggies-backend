const express = require('express');
const app = express();
app.set("view engine", "ejs");
let port=process.env.PORT||5000
const fruits = require("./backend/fruits"); // Ensure this path and file are correct
const vegetables = require("./backend/vegetables"); // Ensure this path and file are correct

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render("home.ejs");
});


// Route to display all fruits
app.get("/fruits", async (req, res) => {
    try {
        let allfruits = await fruits.find();
        res.render("f.ejs", { allfruits });
    } catch (error) {
        console.error("Error fetching fruits:", error);
        res.status(500).send("Error fetching fruits");
    }
});

app.get("/fruits", async (req, res) => {
    try {
        let allfruits = await fruits.find();
        res.render("f.ejs", { allfruits });
    } catch (error) {
        console.error("Error fetching fruits:", error);
        res.status(500).send("Error fetching fruits");
    }
});
// Route to display all vegetables
app.get("/vegetables", async (req, res) => {
    try {
        let allveggies = await vegetables.find();
        res.render("vegetables.ejs", { allveggies });
    } catch (error) {
        console.error("Error fetching vegetables:", error);
        res.status(500).send("Error fetching vegetables");
    }
});

// Route to render add-fruit form
app.get("/add-fruit", (req, res) => {
    res.render("add-fruit.ejs");
});

// Route to add a new fruit
// Route to add a new fruit
app.post("/add-fruit", async (req, res) => {
    const { name, img, description, price } = req.body;
    try {
        const newFruit = new fruits({ name, img, description, price });
        await newFruit.save();
        res.redirect("/fruits"); // Redirect to "/fruits" instead of "/f"
    } catch (error) {
        console.error("Error adding fruit:", error);
        res.status(500).send("Error adding fruit");
    }
});


// Route to render add-vegetable form
app.get("/add-vegetable", (req, res) => {
    res.render("add-vegetable.ejs");
});

// Route to add a new vegetable
app.post("/add-vegetable", async (req, res) => {
    const { name, img, description, price } = req.body;
    try {
        const newVegetable = new vegetables({ name, img, description, price });
        await newVegetable.save();
        res.redirect("/vegetables");
    } catch (error) {
        console.error("Error adding vegetable:", error);
        res.status(500).send("Error adding vegetable");
    }
});
app.post("/delete-fruit/:id", async (req, res) => {
    try {
        await fruits.findByIdAndDelete(req.params.id);
        res.redirect("/fruits"); // Redirect to the updated fruits list
    } catch (error) {
        console.error("Error deleting fruit:", error);
        res.status(500).send("Error deleting fruit");
    }
});
app.post("/delete-vegetable/:id", async (req, res) => {
    try {
        await vegetables.findByIdAndDelete(req.params.id);
        res.redirect("/vegetables"); // Redirect to the updated vegetables list
    } catch (error) {
        console.error("Error deleting vegetable:", error);
        res.status(500).send("Error deleting vegetable");
    }
});


app.listen(port, () => {
    console.log("Server running on port 8083");
});

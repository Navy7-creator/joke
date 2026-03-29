import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET → Load homepage with joke


// GET → load page
app.get("/", (req, res) => {
  res.render("index", { joke: "Hover to reveal a joke 👻" });
});

// POST → get new joke


app.post("/", async (req, res) => {
  try {
    const category = req.body.category || "Any";
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);

    let joke;

    if (response.data.type === "single") {
      joke = response.data.joke;
    } else {
      joke = response.data.setup + " ... " + response.data.delivery;
    }

    res.render("index", { joke });

  } catch (error) {
    res.render("index", {
      joke: "Failed to fetch joke 😢"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
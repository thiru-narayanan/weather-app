const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3001;

const expressdirectory = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../template/views");
const partialspath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewspath);


hbs.registerPartials(partialspath);

app.use(express.static(expressdirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App index",
    name: "Thirunarayanan Weather App",
  });
});


app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App about",
    name: "Thirunarayanan Weather App",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App help",
    name: "Thirunarayanan Weather App",
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "Not Found",
    name: "Help Article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    
    return res.send({ error: "Please provide the Address" });
  }

  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error !== undefined) {
        return res.send({ error: error });
      }
      forecast(
        latitude,
        longitude,
        (error, { temperature, feelslike,forecast } = {}) => {
          if (error !== undefined) {
            return res.send({ error: error });
          }

          res.send({
            temperature: temperature,
            feelslike: feelslike,
            forecast:forecast,
            location: location,
          });
        }
      );
    }
  );
});

app.get("*", (req, res) => {
  res.render("notfound", { title: "Not Found", name: "page not found" });
});

app.listen(port, () => {
  console.log("Server is up and running in the port " + port);
});

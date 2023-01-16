const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser")
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});
app.use(express.static("public"))

// app.use("view-engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set("view engine", "ejs");
app.post("/", function(req, res) {
  const query = req.body.cityName
  const apiKey = "0ec811fd387c9597b03df8860d24efaa"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + ""

  https.get(url, function(response) {
    console.log(response.statusCode);
    if (response.statusCode === 404) {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = Math.floor(weatherData.main.temp);
      const weatherdescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      const speed = Math.floor(weatherData.wind.speed)
      const pressure = weatherData.main.pressure
      // res.write("<p>The weather is currently " + weatherdescription + "</p>");
      // res.write("<h1>The temparature in " + query + " is " + temp + " degree celcius.</h1>");
      //
      // res.write("<img src = " + imgUrl + ">")
      // res.write(icon);

      res.render("response", {City: query, Description:weatherdescription, temparature: temp, speed: speed, pressure:pressure, image: icon, humidity:humidity});

    })
  })

})






app.listen(3000, function() {
  console.log("Server is working");
})

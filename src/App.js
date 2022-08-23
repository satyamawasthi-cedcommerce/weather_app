import { useState } from "react";
import "./App.css";

function App() {
  // state variables used to store location , weather info and theme acoordingly
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("");
  // fetching input from the text field
  var flag = (event) => {
    setLocation(event.target.value);
  };
  // fetching data
  var fetchDiaplaytemp = (event) => {
    event.preventDefault();
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${location}&aqi=yes`
    )
      .then((response) => response.json())
      .then((data) => {
        // checking various consitions for themes
        if (data.error) {
          throw new Error(data.error.message);
        }
        setWeather(data);
        if (data.current.temp_c >= 15 && data.current.temp_c <= 25) {
          setTheme("normal");
        }
        if (data.current.temp_c <= 15) {
          setTheme("cool");
        }
        if (data.current.temp_c > 25) {
          setTheme("hot");
        }
        if (data === undefined) {
          setTheme("containerDiv");
        }
      }, [])
      .catch((error) => {
        alert(error.toString());
        console.log(error);
      });
  };
  // returning JSX
  return (
    <div id="App">
      <div className={theme}>
        <h1 style={{ color: "white" }}>
          Weather Plus <i className="fa-solid fa-cloud-bolt"></i>
        </h1>
        <hr />

        <form onSubmit={(event) => fetchDiaplaytemp(event)} className="formW">
          <h2 style={{ color: "white" }}>Explore how's weather today??</h2>
          <input
            type="text"
            palceholder="Enter City Name"
            onChange={(event) => flag(event)}
            id="inputW"
          />
          <br />
          <br />
          <input type="submit" value="Check Weather" id="btn" />
        </form>

        <div>
          {!Object.keys(weather).length ? (
            <img
              src="https://i.gifer.com/RS5Y.gif"
              alt=".."
              style={{ width: "50%", marginTop: "5%" }}
            />
          ) : (
            <div id="output">
              <div>
                <img
                  src={weather.current.condition.icon}
                  alt="..."
                  style={{ width: "40%" }}
                />

                <h4 style={{ color: "white" }}>
                  Celcius: {weather.current.temp_c} , Fahreinheit:
                  {weather.current.temp_f}
                </h4>
                <h4 style={{ color: "white" }}>
                  {weather.current.condition.text}
                </h4>
              </div>

              <div>
                <h2 style={{ color: "white" }}>
                  {" "}
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  {weather.location.name}
                </h2>
                <h3 style={{ color: "white" }}>
                  {" "}
                  <i className="fa-solid fa-map-location"></i>{" "}
                  {weather.location.region}
                </h3>
                <h3 style={{ color: "white" }}>
                  <i className="fa-solid fa-globe"></i> {weather.location.lat},{" "}
                  {weather.location.lon}
                </h3>
                <h4 style={{ color: "white" }}>
                  <i className="fa-solid fa-calendar"></i>{" "}
                  {weather.location.localtime}
                </h4>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

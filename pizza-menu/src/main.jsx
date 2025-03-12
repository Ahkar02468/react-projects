import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import pizzaData from "./data";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // return React.createElement("footer", null, "We're currently open!");
  return (
    <footer>{new Date().toLocaleTimeString()} We're currently open!</footer>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.map((pizza) => {
        return (
          <Pizza
            name={pizza.name}
            ingredients={pizza.ingredients}
            photoName={pizza.photoName}
            price={pizza.price}
          />
        );
      })}
    </main>
  );
}

function Header() {
  // const style = { color: "red", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast React Pizza Co. Ltd.</h1>
    </header>
  );
}

function Pizza(props) {
  return (
    <div className="pizza">
      <img security="restricted" src={props.photoName} alt={props.name} />
      <div>
        <h1>{props.name}</h1>
        <p>{props.ingredients}</p>
        <span>{props.price}</span>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

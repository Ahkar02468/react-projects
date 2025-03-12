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

function Header() {
  // const style = { color: "red", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast React Pizza Co. Ltd.</h1>
    </header>
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
    <footer>
      <div className="order">
        {isOpen ? (
          <Opentime openHour={openHour} closeHour={closeHour} />
        ) : (
          <p
            style={{
              color: "red",
              fontSize: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00.
          </p>
        )}
        <button className="btn">Order</button>
      </div>
    </footer>
  );
}

function Opentime({ closeHour, openHour }) {
  return (
    <p>
      We're open {openHour} to {closeHour}:00. Come visit us at open hours or
      order online.
    </p>
  );
}

function Menu() {
  const pizzas = pizzaData;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzas.length > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  if (pizzaObj.soldOut) return null;
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price}</span>
      </div>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

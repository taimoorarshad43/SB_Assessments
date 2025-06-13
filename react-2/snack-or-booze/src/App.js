import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";
import FoodForm from "./FoodForm";

function App() {
  // Having state for loading and snacks plus drinks.
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);


  // Function for getting snacks and drinks from our API class.
  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  useEffect(() => {
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    }
    getDrinks();
  }, []);

  // These functions will be used to make post requests to our API with our API class.
  async function addSnack(newSnack) {
    const added = await SnackOrBoozeApi.addSnack(newSnack);
    setSnacks(snacks => [...snacks, added]);  // updates state so we can rerender
  }

  async function addDrink(newDrink) {
    const added = await SnackOrBoozeApi.addDrink(newDrink);
    setDrinks(drinks => [...drinks, added]);  // updates state so we can rerender
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  // Need to reorder the add menus forms because of url paramater matching.
  // We have a 404 at the bottom of the Switch block so a user can go there.

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/snacks/new">
              <FoodForm type="snacks" addItem={addSnack} />
            </Route>
            <Route exact path="/drinks/new">
              <FoodForm type="drinks" addItem={addDrink} />
            </Route>
            <Route exact path="/snacks">
              <Menu food={snacks} type="snacks" title="Snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu food={drinks} type="drinks" title="Drinks" />
            </Route>
            <Route path="/snacks/:id">
              <Snack items={snacks} cantFind="/snacks" />
            </Route>
            <Route path="/drinks/:id">
              <Snack items={drinks} cantFind="/drinks" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({snacks, drinks}) {
  
  // This component is the home page of the app.
  // We'll use these to display the number of snacks and drinks available.
  const snackCount = snacks.length;
  const drinkCount = drinks.length;

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <h5 className="font-weight-bold">
              There are {snackCount} snacks and {drinkCount} drinks on our menu
            </h5>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;

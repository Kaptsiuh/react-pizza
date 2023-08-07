import React from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/pizzaBlock";
import Skeleton from "./components/pizzaBlock/Skeleton";

import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:3666/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {/* {items.map((obj) =>
                isLoading ? <Skeleton /> : <PizzaBlock key={obj.id} {...obj} />
              )} */}
              {isLoading
                ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { nanoid } from "nanoid";

const data = [
  {
    id: nanoid(),
    price: 27.88,
    title: "The Greatest Gatsby",
    description: "Axe like this very much!",
    quantity: 1,
  },
  {
    id:  nanoid(),
    price: 13.95,
    title: "Cooking with the Gatsby",
    description: "This book teach how to cook!",
    quantity: 1,
  },
];

const Products = (props) => {
  const dataElements = data.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      price={product.price}
      title={product.title}
      description={product.description}
      quantity={product.quantity}
    />
  ));

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{dataElements}</ul>
    </section>
  );
};

export default Products;

import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Harry Potter Comics',
    description: 'Interesting comic book based on harry potter novel'
  },
  {
    id: 'p2',
    price: 10,
    title: 'T-shirt',
    description: 'A pure cotton T-shirt for summer season'
  }
];

const Products = (props) => {

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map((product) => {
            return <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          })
        }
      </ul>
    </section>
  );
};

export default Products;

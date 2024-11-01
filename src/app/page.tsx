import dynamic from 'next/dynamic';
import LoadingSpinner from './components/LoadingSpinner';

// import ProductList from "./components/ProductList";
async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
}
async function getCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  return res.json();
}
const ProductList = dynamic(() => import('./components/ProductList'), {
  loading: () => <LoadingSpinner />
});
export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <section className="container m-auto mt-[76px]">
      {/* <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product: ProductType) => (
          <Product key={product.id} {...product} />
        ))}
      </ul> */}
      <ProductList initialProducts={products} categories={categories}/>
    </section>
  );
}
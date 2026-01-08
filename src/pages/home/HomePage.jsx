import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import "./HomePage.css";
//import { products } from "../../../starting-code/data/products";
import axios from "axios";
import { ProductsGrid } from "./productsGrid";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  //Dependency array = lets us control when useEffect runs

  return (
    <>
      <link rel="icon" href="/home.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";

const ProductHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("User not authenticated");
          return;
        }

        const response = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {
            Authorization: accessToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.error("Error fetching products");
        }
      } catch (error) {
        console.error("An error occurred while fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Product Home</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductHome;

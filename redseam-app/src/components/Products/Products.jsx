import React, { useEffect, useState } from "react";
import "./Products.css";

const API_BASE = "https://api.redseam.redberryinternship.ge/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Step 1: get the product list
        const res = await fetch(`${API_BASE}/products`, {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();

        // Step 2: fetch details for each product
        const detailPromises = (data.data || []).map(async (product) => {
          try {
            const detailRes = await fetch(`${API_BASE}/products/${product.id}`, {
              headers: {
                Accept: "application/json",
              },
            });
            const detailData = await detailRes.json();
            return { ...product, ...detailData }; // merge summary + details
          } catch (err) {
            console.error(`Failed to fetch product ${product.id}`, err);
            return product;
          }
        });

        const detailedProducts = await Promise.all(detailPromises);
        setProducts(detailedProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.cover_image || product.image}
            alt={product.name}
            className="product-img"
          />
          <h3>{product.name}</h3>
          <p>${product.price}</p>

          {/* If backend sends colors/sizes, display them here */}
          {product.colors ? (
            <div className="product-colors">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  title={color}
                ></span>
              ))}
            </div>
          ) : (
            <div className="product-colors">
              {/* fallback swatches if API gives no colors */}
              <span className="color-swatch red"></span>
              <span className="color-swatch blue"></span>
              <span className="color-swatch green"></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;

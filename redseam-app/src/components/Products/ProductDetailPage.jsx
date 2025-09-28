import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ProductDetailPage.css";

const API_BASE = "https://api.redseam.redberryinternship.ge/api";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();

        if (data) setProduct(data.data || data); // Ensure correct structure
      } catch (err) {
        console.error("Failed to fetch product details", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
  {/* Logo Section */}
  <div className="logo-section">
    <div className="logo-child">
      <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
    </div>
    <h1 className="logo-text">Redseam Clothing</h1>
  </div>

  <p className="breadcrumb">Listing / Product</p>

  <div className="product-main">
    {/* Thumbnails */}
    <div className="product-thumbnails">
      {product.images?.slice(0, 5).map((img, index) => (
        <img key={index} src={img} alt={`Thumbnail ${index}`} className="thumbnail-img" />
      ))}
    </div>

    {/* Main Product Section */}
    <div className="main-product">
      <img
        src={product.cover_image || product.image}
        alt={product.name}
        className="main-image"
      />

      {/* Product Info */}
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>

        <div className="selector-group">
          <label>Size:</label>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">Choose Size</option>
            {product.sizes?.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <label>Color:</label>
          <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="">Choose Color</option>
            {product.colors?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          className="add-to-cart-btn"
          disabled={!selectedSize || !selectedColor}
          onClick={() => addToCart(product, selectedColor, selectedSize)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default ProductDetailPage;

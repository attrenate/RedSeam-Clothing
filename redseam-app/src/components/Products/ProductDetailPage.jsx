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
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (data) {
          setProduct(data.data || data);
          setMainImage(
            data.data?.cover_image ||
              data.data?.image ||
              data.data?.images?.[0] ||
              ""
          );
        }
      } catch (err) {
        console.error("Failed to fetch product details", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="product-detail">
      {/* Logo and breadcrumb */}
      <div className="logo-section">
        <div className="logo-child">
          <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
        </div>
        <h1 className="logo-text">Redseam Clothing</h1>
      </div>
      <p className="breadcrumb">Listing / Product</p>

      {/* Main product section */}
      <div className="product-main">
        {/* Thumbnails */}
        <div className="product-thumbnails">
          {product.images?.slice(0, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index}`}
              className="thumbnail-img"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        {/* Main image & details */}
        <div className="main-product">
          <img
  src={product.cover_image || product.image || "/fallback-image.jpg"}
  alt={product.name || "Product Image"}
  className="detail-img"
/>


          {/* Product info */}
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-price">${product.price}</p>

            {/* Color selection */}
            

            <div className="color-selector">
  <p>Color: {selectedColor || "Choose"}</p>
  <div className="color-options">
    {(product.colors?.length ? product.colors : ["#FF0000", "#00FF00", "#0000FF"]).slice(0, 3).map((color, index) => (
      <button
        key={index}
        className={`color-btn ${selectedColor === color ? "selected" : ""}`}
        style={{
          backgroundColor: color,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
        onClick={() => setSelectedColor(color)}
      ></button>
    ))}
  </div>
</div>


            {/* Size selection */}
            <div className="size-selector">
              <p>Size: {selectedSize || "Choose"}</p>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selection */}
            <div className="quantity-selector">
              <label>
                Quantity:
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </label>
            </div>

            {/* Add to Cart button */}
            <button
              className="add-to-cart-btn"
              disabled={!selectedSize || !selectedColor || !quantity}
              onClick={() =>
                addToCart(product, selectedColor, selectedSize, quantity)
              }
            >
              Add to Cart
            </button>

            {/* Details section */}
            <div className="product-details">
              <h3>Details</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

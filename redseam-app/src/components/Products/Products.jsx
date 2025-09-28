import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Products.css";
import { useCart } from "./CartContext";

const API_BASE = "https://api.redseam.redberryinternship.ge/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const [cartOpen, setCartOpen] = useState(false);

  const { cart, removeFromCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let updatedProducts = [...products];

    if (minPrice && maxPrice) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (sortOption === "price-asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      updatedProducts.sort(
        (a, b) =>
          new Date(b.created_at || b.id) - new Date(a.created_at || a.id)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, minPrice, maxPrice, sortOption]);

  if (loading) return <p>Loading products...</p>;

  const toggleCart = () => setCartOpen((prev) => !prev);

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const deliveryFee = subtotal * 0.1;

  return (
    <div className="products-page">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="logo">
          <div className="logo-child">
            <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
          </div>
          <h1 className="logo-text">Redseam Clothing</h1>
        </div>

        <div className="nav-icons">
          <img
            src="/cart.png"
            alt="Cart"
            className="cart-icon"
            onClick={toggleCart}
          />
          <img src="/pfp.jpg" alt="Profile" className="profile-pic" />
        </div>
      </div>

      {/* Cart Dropdown */}
      {cartOpen && (
        <div className="cart-dropdown">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-msg">Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img
                    src={item.cover_image || item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-summary">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Delivery: ${deliveryFee.toFixed(2)}</p>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Go to Checkout
          </button>
        </div>
      )}

      {/* Products Header */}
      <div className="products-header">
        <h2 className="products-title">Products</h2>
        <span className="products-info">
          Showing {filteredProducts.length} results
        </span>
        <div className="products-actions">
          {/* Filter */}
          <div className="dropdown">
            <button
              className="products-btn"
              onClick={() => {
                setFilterOpen(!filterOpen);
                setSortOpen(false);
              }}
            >
              Filter
            </button>
            {filterOpen && (
              <div className="dropdown-content">
                <label>
                  Min Price:
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="10"
                  />
                </label>
                <label>
                  Max Price:
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="100"
                  />
                </label>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="apply-btn"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="dropdown">
            <button
              className="products-btn"
              onClick={() => {
                setSortOpen(!sortOpen);
                setFilterOpen(false);
              }}
            >
              Sort by
            </button>
            {sortOpen && (
              <div className="dropdown-content">
                <button
                  onClick={() => {
                    setSortOption("newest");
                    setSortOpen(false);
                  }}
                >
                  Newest
                </button>
                <button
                  onClick={() => {
                    setSortOption("price-asc");
                    setSortOpen(false);
                  }}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => {
                    setSortOption("price-desc");
                    setSortOpen(false);
                  }}
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <img
              src={product.cover_image || product.image}
              alt={product.name}
              className="product-img"
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

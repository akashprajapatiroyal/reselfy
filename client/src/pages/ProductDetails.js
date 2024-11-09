import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
  };

  return (
    <Layout>
      <div className="container my-5">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                className="img-fluid rounded"
                alt={product.name}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="display-5 fw-bold mb-4">{product.name}</h2>
              <h4 className="text-success mb-3">₹{product.price}</h4>
              <p><strong>Category:</strong> {product?.category?.name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => addToCart(product)}
                >
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/user/chat`)}
                >
                  <i className="bi bi-chat"></i> Chat with Seller
                </button>
              </div>
            </div>
          </div>
        )}

        <hr className="my-5" />

        <div className="container mt-5">
          <h3 className="mb-4">Similar Products</h3>
          {relatedProducts.length < 1 ? (
            <p className="text-center text-muted">No similar products found</p>
          ) : (
            <div className="row">
              {relatedProducts.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-truncate">
                        {p.description.substring(0, 80)}...
                      </p>
                      <p className="text-success">₹{p.price}</p>
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(p)}
                        >
                          <i className="bi bi-cart"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Layout>
  );
};

export default ProductDetails;

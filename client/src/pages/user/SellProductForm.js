import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      // Await the axios post request
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/user/sell");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
  <h1 className="text-center mb-4">Add Product</h1>
  <div className="m-auto w-75 p-4 border rounded shadow-sm bg-light">
    
    {/* Category Select */}
    <div className="mb-3">
      <label className="form-label">Category</label>
      <Select
        bordered={false}
        placeholder="Select a category"
        size="large"
        showSearch
        className="form-select mb-3"
        onChange={(value) => setCategory(value)}
      >
        {categories?.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>
    </div>

    {/* Photo Upload */}
    <div className="mb-3">
      <label className="form-label">Product Photo</label>
      <div className="input-group">
        <label className="btn btn-outline-secondary w-100">
          {photo ? photo.name : "Upload Photo"}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            hidden
          />
        </label>
      </div>
      {photo && (
        <div className="text-center mt-3">
          <img
            src={URL.createObjectURL(photo)}
            alt="product_photo"
            height="200"
            className="img-fluid rounded"
          />
        </div>
      )}
    </div>

    {/* Name Input */}
    <div className="mb-3">
      <label className="form-label">Product Name</label>
      <input
        type="text"
        value={name}
        placeholder="Enter product name"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    {/* Description Input */}
    <div className="mb-3">
      <label className="form-label">Description</label>
      <textarea
        value={description}
        placeholder="Enter product description"
        className="form-control"
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>

    {/* Price Input */}
    <div className="mb-3">
      <label className="form-label">Price</label>
      <input
        type="number"
        value={price}
        placeholder="Enter price"
        className="form-control"
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>

    {/* Quantity Input */}
    <div className="mb-3">
      <label className="form-label">Quantity</label>
      <input
        type="number"
        value={quantity}
        placeholder="Enter quantity"
        className="form-control"
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>

    {/* Shipping Select */}
    <div className="mb-3">
      <label className="form-label">Shipping</label>
      <Select
        bordered={false}
        placeholder="Select shipping"
        size="large"
        showSearch
        className="form-select mb-3"
        onChange={(value) => setShipping(value)}
      >
        <Option value="0">No</Option>
        <Option value="1">Yes</Option>
      </Select>
    </div>

    {/* Submit Button */}
    <div className="text-center mt-4">
      <button className="btn btn-primary w-100" onClick={handleCreate}>
        CREATE PRODUCT
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

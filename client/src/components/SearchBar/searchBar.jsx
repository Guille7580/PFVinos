import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameProducts } from "../../actions/productos";
import "./searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleInputProducts(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameProducts(title));
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Products..."
        onChange={(e) => handleInputProducts(e)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

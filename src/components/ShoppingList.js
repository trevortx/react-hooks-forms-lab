import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items, setItems, onListAddition }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("")
  const [newItem, setNewItem] = useState("")
  const [input, setInput] = useState("")
  const [catChange, setCatChange] = useState("Produce")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value)
  }

  function handleSearchTerm(event) {
    setSearchTerm(() => event.target.value.trim())
  }

  function handleCatChange(event) {
    setCatChange(() => event.target.value)
  }

  function handleItemSubmission(event) {
    event.preventDefault()
    setNewItem(() => input)
    const addItem = {
      id: uuid(), // the `uuid` library can be used to generate a unique id
      name: newItem,
      category: catChange,
    };
    return setItems(() => [
      ...items,
      addItem
    ])
  }

  function itemChanger(event) {
    setInput(() => event.target.value)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  }).filter(item => {
    if (searchTerm === "") {
      return true
    } else {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase())
    }
  })

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemSubmission} onItemFormsChange={handleCatChange} newItem={newItem} catChange={catChange} itemChanger={itemChanger} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchTerm} search={searchTerm}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

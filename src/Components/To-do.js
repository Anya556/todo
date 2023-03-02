import React from 'react';
import './To-do.css';
import { useState, useEffect } from 'react';
const initialState = {
  id: null,
  text: '',
  done: false,
};

function Todo() {
  const [item, setItem] = useState(initialState);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [itemEditing, setItemEditing] = useState(null);
  //const [editingText, setEditingText] = useState('');

  useEffect(() => { 
    console.log('hi')
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function addNewItem() {
    if (item.text === '') {
      alert('Enter an item.');
      setItem(initialState);
      return;
    }
    const newItem = {
      id: Math.floor(Math.random() * 1000),
      text: item,
      done: false,
    };
    setItems((oldList) => [...oldList, newItem]);
    setItem(initialState);
  }

  function editingHandler(text) {
    const editingItem = { ...itemEditing };
    editingItem.text = text;
    setItemEditing(editingItem);
  }

  function submitHendler() {
    setItemEditing(null);
    const editedItems = items.map((item) => {
      if (item.id === itemEditing.id) {
        return itemEditing;
      }
      return item;
    });
    setItems(editedItems);
  }

  function checkboxHendler(id) {
    const checkedItems = items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setItems(checkedItems);
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  // function handleUpdatedDone(event) {
  //   if (event.key === 'Enter') {
  //     item.text = editingText;
  //   }
  // }

  return (
    <div className="wrapper">
      <div className="main_container">
        <input
          type="text"
          placeholder="Enter something..."
          value={item.text}
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="enter" onClick={addNewItem}>
          Add
        </button>
      </div>
      <div className="advanced_container">
        <ul className="todo-list">
          {items.map((item) => {
            return (
              <li key={item.id} style={{ color: item.done ? 'grey' : null }}>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={() => checkboxHendler(item.id)}
                  checked={item.done}
                />

                {itemEditing && itemEditing.id === item.id ? (
                  <input
                    type="text"
                    onChange={(e) => editingHandler(e.target.value)}
                    value={itemEditing.text}
                  />
                ) : (
                  <div className="item-text">{item.text}</div>
                )}

                {itemEditing && itemEditing.id === item.id ? (
                  <button
                    className="button edit"
                    onClick={() => submitHendler()}
                    // onKeyDown={handleUpdatedDone}
                  >
                    Submit Edits
                  </button>
                ) : (
                  <button
                    className="button edit"
                    onClick={() => setItemEditing(item)}
                  >
                    Edit Item
                  </button>
                )}

                <button
                  className="button delete"
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

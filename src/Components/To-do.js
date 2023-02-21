import React from 'react';
import './To-do.css';
import { useState, useEffect } from 'react';

function Todo() {
  const [item, setItem] = useState({id: 0, text: '', done: false});
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );
  const [itemEditing, setItemEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function addNewItem() {
    if (!item) {
      alert('Enter an item.');
      setItem('');
      return;
    }
    const newItem = {
      id: Math.floor(Math.random() * 1000),
      text: item, 
      done: false,
    };
    setItems((items) => [...items, newItem]);
    setItem({id: 0, text: '', done: false});
  }

  function onChangeBox(id) {
    const newArray = items.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    setItems(newArray);
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function editItem(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.text = editingText;
      }
      return item;
    });
    setItems(updatedItems);
    setItemEditing(null);
    setEditingText('');
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
                  onChange={() => onChangeBox(item.id)}
                  checked={item.done}
                />
                {itemEditing === item.id ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                  />
                ) : (
                  <div className='item-text'>{item.text}</div>
                )}

                {itemEditing === item.id ? (
                  <button
                    className="delete edit"
                    onClick={() => editItem(item.id)}
                    // onKeyDown={handleUpdatedDone}
                  >
                    Submit Edits
                  </button>
                ) : (
                  <button
                    className="delete edit"
                    onClick={() => setItemEditing(item.id)}
                  >
                    Edit Item
                  </button>
                )}

                <button className="delete" onClick={() => deleteItem(item.id)}>
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

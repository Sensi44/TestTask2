import React, { useEffect, useState } from 'react';

import './item.css';

function Item({ name, value, id, confirmEditValue, confirmEditName, deleteRow, moveTop, moveBot }) {
  const [td, setTd] = useState({ name, value });
  const [editName, setEditName] = useState(true);
  const [editValue, setEditValue] = useState(true);

  useEffect(() => {
    setTd({ name, value });
  }, [name, value]);

  const onSubmitValue = (e) => {
    e.preventDefault();
    if (td.value !== '' && td.value.trim() !== '') {
      confirmEditValue(td.value, id);
      setTd((prevState) => {
        return {
          name: prevState.name,
          value: td.value,
        };
      });
    }
    setEditName(!editName);
    setEditValue(!editValue);
  };

  const onSubmitName = (e) => {
    e.preventDefault();
    if (td.name !== '' && td.name.trim() !== '') {
      confirmEditName(td.name, id);
      setTd((prevState) => {
        return {
          name: td.name,
          value: prevState.value,
        };
      });
    }
    setEditName(!editName);
    setEditValue(!editValue);
  };

  const changeValue = (e) => {
    const temp = { ...td };
    temp.value = e.target.value;
    setTd(temp);
  };

  const changeName = (e) => {
    const temp = { ...td };
    temp.name = e.target.value;
    setTd(temp);
  };

  const toggleEditName = () => setEditName(!editName);
  const toggleEditValue = () => setEditValue(!editValue);

  return (
    <tr>
      <td className='cell'>
        {editName ? (
          <div className='text'>{name}</div>
        ) : (
          <form onSubmit={onSubmitName}>
            <input className='edit-input' type='text' onChange={changeName} value={td.name} />
          </form>
        )}
        <button onClick={toggleEditName}>edit</button>
      </td>

      <td className='cell'>
        {editValue ? (
          <div className='text'>{value}</div>
        ) : (
          <form onSubmit={onSubmitValue}>
            <input className='edit-input' type='text' onChange={changeValue} value={td.value} />
          </form>
        )}
        <button onClick={toggleEditValue}>edit</button>
      </td>
      <td className='move'>
        <button onClick={moveTop}>↑</button>
        <button onClick={moveBot}>↓</button>
      </td>
      <td className='delete'>
        <button onClick={deleteRow}>X</button>
      </td>
    </tr>
  );
}

export default Item;

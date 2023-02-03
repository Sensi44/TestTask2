import React, { useState } from 'react';

import { Item } from '../ItemList';

import './App.css';

function App() {
  const initial = [
    { name: 'name1', value: 'value1' },
    { name: 'name2', value: 'value2' },
    { name: 'name3', value: 'value3' },
    { name: 'name4', value: 'value4' },
  ];

  const [tData, setData] = useState(initial);
  const [text, setText] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [add, setAdd] = useState({ name: '', value: '' });

  const saveHandler = () => setText(JSON.stringify(tData));

  const loadHandler = () => {
    try {
      const temp = JSON.parse(text);
      if (Array.isArray(temp)) {
        setData(temp);
      }
      setText('');
    } catch (e) {
      setTooltip('Incorrect JSON');
      setTimeout(() => setTooltip(''), 1500);
    }
  };

  const clearHandler = () => setText('');

  const textChangeHandler = (e) => setText(e.target.value);

  const confirmEditName = (input, id) => {
    const temp = [...tData][id];
    temp.name = input;
    setData([...tData.slice(0, id), temp, ...tData.slice(id + 1)]);
  };

  const confirmEditValue = (input, id) => {
    const temp = [...tData][id];
    temp.value = input;
    setData([...tData.slice(0, id), temp, ...tData.slice(id + 1)]);
  };

  const addOnSubmit = (e) => {
    e.preventDefault();
    const temp = [...tData];
    temp.push({ name: add.name, value: add.value });
    setData(temp);
    setAdd({ name: '', value: '' });
  };

  const deleteRow = (id) => {
    const temp = [...tData];
    temp.splice(id, 1);
    setData(temp);
  };

  const moveTop = (id) => {
    const current = [...tData][id];
    const prev = id - 1;
    if (id > 0) {
      setData([...tData.slice(0, id - 1), current, [...tData][prev], ...tData.slice(id + 1)]);
    }
  };

  const moveBot = (id) => {
    const current = [...tData][id];
    const next = id + 1;
    if (id !== tData.length - 1) {
      setData([...tData.slice(0, id), [...tData][next], current, ...tData.slice(id + 2)]);
    }
  };

  const elements = tData.map((item, index) => {
    const { name, value } = item;
    return (
      <Item
        name={name}
        value={value}
        key={index}
        id={index}
        confirmEditValue={confirmEditValue}
        confirmEditName={confirmEditName}
        deleteRow={() => deleteRow(index)}
        moveTop={() => moveTop(index)}
        moveBot={() => moveBot(index)}
      />
    );
  });

  return (
    <div className='App'>
      <table>
        <tbody>
          <tr className='titles'>
            <td>Name</td>
            <td>Value</td>
          </tr>
          {elements}
        </tbody>
      </table>
      <h5>TextArea</h5>
      <textarea
        value={text}
        onChange={textChangeHandler}
        name='add'
        id='3'
        cols='10'
        rows='6'
        placeholder='type data in JSON format'
      />
      <br />
      <div className='buttons'>
        <button onClick={saveHandler}>Save</button>
        <button onClick={loadHandler}>Load</button>
        <button onClick={clearHandler}>Clear</button>
      </div>
      <div className='addForm'>
        <form onSubmit={addOnSubmit}>
          <input
            onChange={(e) => setAdd({ name: e.target.value, value: add.value })}
            type='text'
            value={add.name}
            placeholder='type name...'
          />
          <input
            onChange={(e) => setAdd({ name: add.name, value: e.target.value })}
            type='text'
            value={add.value}
            placeholder='type value...'
          />
          <button type='submit'>Add table row</button>
        </form>
      </div>
      {tooltip}
    </div>
  );
}

export default App;

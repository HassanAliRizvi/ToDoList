import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import reportWebVitals from './reportWebVitals';
import ToDoItem from './React components/ToDoItem';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToDoItem/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

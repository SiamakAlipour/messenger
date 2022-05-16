import React from 'react';
import './Input.scss';

const Input = ({ type, onChange, placeholder }) => (
  <input type={type} placeholder={placeholder} onChange={onChange} />
);

export default Input;

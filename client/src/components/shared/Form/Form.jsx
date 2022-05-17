import React from 'react';

const Form = ({ submit, children }) => (
  <form action="" onSubmit={submit}>
    {children}
  </form>
);

export default Form;

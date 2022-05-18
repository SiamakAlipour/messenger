/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './SignLayout.scss';

function SignLayout({ footer, children }) {
  return (
    <div className="SignLayout">
      <div className="SignLayout__title">
        <h3>Hi Lets get started</h3>
      </div>

      <div className="SignLayout__content">
        {children}
        <div className="SignLayout__footer">{footer}</div>
      </div>
    </div>
  );
}
export default SignLayout;

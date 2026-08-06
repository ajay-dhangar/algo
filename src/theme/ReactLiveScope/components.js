import React from 'react';

export const ButtonExample = (props) => (
  <button
    {...props}
    style={{
      border: 'solid red',
      borderRadius: 20,
      padding: 10,
      cursor: 'pointer',
      ...props.style,
    }}
  />
);

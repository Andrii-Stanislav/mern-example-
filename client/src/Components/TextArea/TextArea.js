import React from 'react';

import StyledTextArea from './StyledTextArea';

function TextArea({
  placeholder,
  type,
  width,
  name,
  onChange,
  value,
  require,
}) {
  return (
    <StyledTextArea
      onChange={onChange}
      value={value}
      name={name}
      width={width}
      type={type}
      placeholder={placeholder}
      require={require}
      rows="4"
    ></StyledTextArea>
  );
}

export default TextArea;

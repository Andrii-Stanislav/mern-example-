import React from 'react';
import styled from 'styled-components';

const StyledSvgBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  cursor: pointer;
`;

export default function SvgBox({ height, width, onClick, children }) {
  return (
    <StyledSvgBox width={width} height={height} onClick={onClick}>
      {children}
    </StyledSvgBox>
  );
}

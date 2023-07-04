import React from 'react';

import { StyledSortDir } from './StyledSortDir';

function SortDir({ title, direction, onClick }) {
  return (
    <StyledSortDir onClick={onClick} direction={direction}>
      {title}
    </StyledSortDir>
  );
}

export default SortDir;

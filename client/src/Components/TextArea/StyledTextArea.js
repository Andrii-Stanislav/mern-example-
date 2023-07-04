import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  display: block;
  max-width: ${props => props.maxWidth || '100%'};
  width: ${props => props.width || 'auto'};
  padding: 12px 16px;
  border: 1px solid #b3c9e6;
  border-radius: 4px;
  resize: vertical;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.17;
  color: #717171;
`;

export default StyledTextArea;

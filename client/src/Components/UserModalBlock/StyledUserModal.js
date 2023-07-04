import styled from 'styled-components';

const StyledAccount = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.17;
  margin-bottom: 4px;
  color: ${props =>
    props.account.toLowerCase() === 'god mode'
      ? 'rgb(128, 89, 40)'
      : 'rgb(113, 113, 113)'};
`;

export default StyledAccount;

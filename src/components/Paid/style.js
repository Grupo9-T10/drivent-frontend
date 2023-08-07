import styled from 'styled-components';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export const ContainerPayments = styled.div`
  display: flex;
  align-items: center;
  h2 {
    margin-left: 12px;
    color: #454545;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  h3 {
    margin-left: 12px;
    color: #454545;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Check = styled(BsFillCheckCircleFill)`
  font-size: 44px;
  color: #36b853;
`;

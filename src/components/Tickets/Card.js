import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Card = ({ label, price, selected, onClick }) => {
  return (
    <Container selected= {selected} onClick={onClick}>
      <StyledTypography variant="subtitle1" >{label}</StyledTypography>
      <StyledTypography variant="subtitle2" color='textSecondary' >R$ {price}</StyledTypography>
    </Container>
  );
};

export default Card;

const StyledTypography = styled(Typography)`
  display: block;
`;
const Container = styled.div`
  margin-bottom: 20px!important;
  margin-right: 24px!important;
  padding-top: 50px;
  width: 145px;
  height: 145px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  background-color: ${(props) => props.selected ? '#FFEED2' : 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;


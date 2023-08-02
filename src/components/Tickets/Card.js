import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Card() {
  return (
    <Container>
      <StyledTypography variant="subtitle1" >Presencial</StyledTypography>
      <StyledTypography variant="subtitle2" color='textSecondary' >R$ 250</StyledTypography>
    </Container>
  );
};

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
  background-color: blueviolet;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


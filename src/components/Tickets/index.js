import styled from 'styled-components';
import { Typography } from '@material-ui/core';
//import { Wrapper } from '@material-ui/pickers/wrappers/Wrapper';
import Card from './Card';
import { CardWrapper } from './CardWrapper';

export default function Tickets() {
  const finalValue = 600;
  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" color='textSecondary'>Primeiro, escolha sua modalidade de ingresso</StyledTypography>
      <CardWrapper>
        <Card />
        <Card />
      </CardWrapper>
      <StyledTypography variant="h6" color='textSecondary'>Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
      <CardWrapper>
        <Card />
        <Card />
      </CardWrapper>
      <StyledTypography variant="h6" color='textSecondary'>Fechado! O tatal ficou em <BoldTxt>R$ {finalValue}</BoldTxt>. Agora é só confirmar:</StyledTypography>
      
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const BoldTxt = styled.span`
  font-weight: bold;
`;

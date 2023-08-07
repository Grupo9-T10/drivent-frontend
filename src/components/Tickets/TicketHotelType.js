import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Card from './Card';
import { CardWrapper } from './CardWrapper';

const TicketHotelType = ({ onSelect }) => {
  const [selectedHotelTicketType, setSelectedHotelTicketType] = useState(null);
    
  const handleOptionTicketType = (option) => {
    setSelectedHotelTicketType(option);
    onSelect(option);
  };

  return (
    <TicketHotelTypeContainer>
      <StyledTypography variant="h6" color='textSecondary'>Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
      <CardWrapper>
        <Card 
          label= "Sem Hotel"
          price= "0"
          selected={selectedHotelTicketType === false}
          onClick={() => handleOptionTicketType(false)}
        />
        <Card 
          label= "Com Hotel"
          price= "350"
          selected={selectedHotelTicketType === true}
          onClick={() => handleOptionTicketType(true)}
        />
      </CardWrapper>
    </TicketHotelTypeContainer>
  );
};

export default TicketHotelType;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const TicketHotelTypeContainer = styled.div `
    margin-bottom: 20px;
`;


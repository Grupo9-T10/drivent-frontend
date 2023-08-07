import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Card from './Card';
import { CardWrapper } from './CardWrapper';

const TicketType = ({ onSelect }) => {
  const [selectedTicketType, setSelectedTicketType] = useState(null);
    
  const handleOptionTicketType = (option) => {
    setSelectedTicketType(option);
    onSelect(option);
  };

  return (
    <TicketTypeContainer>
      <StyledTypography variant="h6" color='textSecondary'>
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>
      <CardWrapper>
        <Card 
          label= "Presencial"
          name= "Presencial" 
          price="250"        
          selected={selectedTicketType === false} 
          onClick={() => handleOptionTicketType(false)} 
        /> 
        <Card 
          label= "Online" 
          name= "Online"
          price= "100" 
          selected={selectedTicketType === true} 
          onClick={() => handleOptionTicketType(true)} 
        />
      </CardWrapper>
    </TicketTypeContainer>
  );
};

export default TicketType;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const TicketTypeContainer = styled.div `
    margin-bottom: 20px;
`;

/*
<Card 
label= "Presencial" 
price='250' 
selected={selectedTicketType === 'Presencial'} 
onClick={() => handleOptionTicketType('Presencial')} 
/> 
<Card 
label= "Online" 
price='100' 
selected={selectedTicketType === 'Online'} 
onClick={() => handleOptionTicketType('Online')} 
/>
*/

/*
SELECT * FROM "Ticket";
SELECT * FROM "TicketType";
SELECT * FROM "Event";
SELECT * FROM "Enrollment";
SELECT * FROM "Payment";

INSERT INTO "TicketType" (name, price, "isRemote", "includesHotel", "createdAt", "updatedAt")
VALUES ('Online', 100, true, false, now(), now());

INSERT INTO "TicketType" (name, price, "isRemote", "includesHotel", "createdAt", "updatedAt")
VALUES ('Sem Hotel', 250, false, false, now(), now());

INSERT INTO "TicketType" (name, price, "isRemote", "includesHotel", "createdAt", "updatedAt")
VALUES ('Com Hotel', 600, false, true, now(), now());
*/
/*
const TicketType = ({ options, onSelect }) => {
  const [selectedTicketType, setSelectedTicketType] = useState(null);
    
  const handleOptionTicketType = (option) => {
    setSelectedTicketType(option);
    onSelect(option);
  };

  return (
    <TicketTypeContainer>
      <StyledTypography variant="h6" color='textSecondary'>
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>
      <CardWrapper>
        {options.map((ticket) => (
          <Card
            key={ticket.id}
            label={ticket.name}
            price={ticket.price}
            selected={selectedTicketType === ticket.id}
            onClick={() => handleOptionTicketType(ticket.id)}
          />
        ))}
      </CardWrapper>
    </TicketTypeContainer>
  );
};
*/

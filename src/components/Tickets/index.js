import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Button from '../Form/Button';
//import { toast } from 'react-toastify';
//import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import TicketType from './TicketType';
import TicketHotelType from './TicketHotelType';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import useTicketType from '../../hooks/api/useTicket';
import useSaveTicket from '../../hooks/api/useSaveTicket';

dayjs.extend(dayjs.extend(CustomParseFormat));

export default function Tickets() {
  const [isRemote, setIsRemote] = useState(null);
  const [includesHotel, setIncludesHotel] = useState(null);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const [total, setTotal] = useState(0);

  const { ticketTypes } = useTicketType();  //chega os 3 tipos 
  //console.log(ticketTypes);
  //console.log(isRemote);
  //console.log(includesHotel);

  const { saveTicketLoading, saveTicket } = useSaveTicket();

  useEffect(() => {
    if( isRemote !== null && includesHotel !== null) {
      findTicketTypeId();
      console.log(ticketTypeId);
    };
  }, [isRemote, includesHotel, ticketTypes]);

  const handleOptionTicketType = (option) => {
    setIsRemote(option);
    if(option === true) {
      setIncludesHotel(false);
      findTicketTypeId(ticketTypes);
    };
  };

  const handleOptionTicketHotelType = (option) => {
    setIncludesHotel(option);
  };

  const findTicketTypeId = () => {
    const selectedTicket = ticketTypes.find(
      (ticket) => ticket.isRemote === isRemote && ticket.includesHotel === includesHotel
    );

    if(selectedTicket) {
      setTicketTypeId(selectedTicket.id);
      setTotal(selectedTicket.price);
    } else {
      setTicketTypeId(null);
      setTotal(0);
    }
  };

  const ticketReservation = () => {
    if(isRemote === null) {
      alert('Selecione o tipo de ingresso antes de reservar.');
      return;
    }

    if(!isRemote && includesHotel === null) {
      alert('Selecione o tipo de hospedagem antes de reservar');
      return;
    }

    window.location.href = '/payments';
  };

  return(
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      
      <TicketType 
        options= {ticketTypes}
        onSelect= {handleOptionTicketType} 
      />
      {(isRemote === false) && (
        <>
          <TicketHotelType onSelect={handleOptionTicketHotelType} />
          {(includesHotel !== null) && (
            <>
              <StyledTypography variant="h6" color='textSecondary'>Fechado! O total ficou em <BoldTxt>R$ {total}</BoldTxt>. Agora é só confirmar:
              </StyledTypography>

              <SubmitContainer>
                <Button onClick= {ticketReservation}>
                RESERVAR INGRESSO
                </Button>
              </SubmitContainer>
            </>
          )}
        </>
      )}
      {(isRemote === true) && (
        <>
          <StyledTypography variant="h6" color='textSecondary'>Fechado! O total ficou em <BoldTxt>R$ {total}</BoldTxt>. Agora é só confirmar:</StyledTypography>

          <SubmitContainer>
            <Button onClick= {ticketReservation}>
          RESERVAR INGRESSO
            </Button>
          </SubmitContainer>
        </>
      )}    
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const BoldTxt = styled.span`
  font-weight: bold;
`;

const SubmitContainer = styled.div`
  margin-top: 0px!important;
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;

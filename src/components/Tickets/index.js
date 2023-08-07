import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Button from '../Form/Button';
import { toast } from 'react-toastify';

import TicketType from './TicketType';
import TicketHotelType from './TicketHotelType';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import useTicketType from '../../hooks/api/useTicketType';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import useEnrollment from '../../hooks/api/useEnrollment';

dayjs.extend(dayjs.extend(CustomParseFormat));

export default function Tickets() {
  const [isRemote, setIsRemote] = useState(null);
  const [includesHotel, setIncludesHotel] = useState(null);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState(null);
  const [ticketStatus, setTicketStatus] = useState('RESERVED');

  const { ticketTypes } = useTicketType(); //chega os 3 tipos
  const { saveTicket } = useSaveTicket();
  const { enrollment } = useEnrollment();

  useEffect(() => {
    if (enrollment) {
      setUserData({
        name: enrollment.name,
        cpf: enrollment.cpf,
        birthday: enrollment.birthday,
        phone: enrollment.phone,
        cep: enrollment.address.cep,
        street: enrollment.address.street,
        city: enrollment.address.city,
        number: enrollment.address.number,
        state: enrollment.address.state,
        neighborhood: enrollment.address.neighborhood,
        addressDetail: enrollment.address.addressDetail,
      });
    }
  }, [enrollment]);

  useEffect(() => {
    if (isRemote !== null && includesHotel !== null) {
      findTicketTypeId();
    }
  }, [isRemote, includesHotel, ticketTypes]);

  const handleOptionTicketType = (option) => {
    setIsRemote(option);
    if (option === true) {
      setIncludesHotel(false);
      findTicketTypeId(ticketTypes);
    } else {
      setIncludesHotel(null);
      findTicketTypeId();
    }
  };

  const handleOptionTicketHotelType = (option) => {
    setIncludesHotel(option);
  };

  const findTicketTypeId = () => {
    const selectedTicket = ticketTypes.find(
      (ticket) => ticket.isRemote === isRemote && ticket.includesHotel === includesHotel
    );

    if (selectedTicket) {
      setTicketTypeId(selectedTicket.id);
      setTotal(selectedTicket.price);
    } else {
      setTicketTypeId(null);
      setTotal(0);
    }
  };

  const ticketReservation = async() => {
    if (isRemote === null) {
      alert('Selecione o tipo de ingresso antes de reservar.');
      return;
    }

    if (!isRemote && includesHotel === null) {
      alert('Selecione o tipo de hospedagem antes de reservar');
      return;
    }

    try {
      const ticketData = {
        ticketTypeId: ticketTypeId,
        enrollmentId: userData.id,
        status: ticketStatus,
      };

      await saveTicket(ticketData);
      setTicketStatus('RESERVED');
      window.location.href = '/dashboard/payment';
      toast('Informações salvas com sucesso!');
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  };

  return (
    <>
      {!userData ? (
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
          <StyledAlert>
            <StyledTypography variant="h6" color="textSecondary">
              Você precisa completar sua inscrição antes <br />
              de prosseguir pra escolha de ingresso
            </StyledTypography>
          </StyledAlert>
        </>
      ) : (
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

          <TicketType options={ticketTypes} onSelect={handleOptionTicketType} />
          {isRemote === false && (
            <>
              <TicketHotelType onSelect={handleOptionTicketHotelType} />
              {includesHotel !== null && (
                <>
                  <StyledTypography variant="h6" color="textSecondary">
                    Fechado! O total ficou em <BoldTxt>R$ {total}</BoldTxt>. Agora é só confirmar:
                  </StyledTypography>

                  <SubmitContainer>
                    <Button onClick={ticketReservation}>RESERVAR INGRESSO</Button>
                  </SubmitContainer>
                </>
              )}
            </>
          )}
          {isRemote === true && (
            <>
              <StyledTypography variant="h6" color="textSecondary">
                Fechado! O total ficou em <BoldTxt>R$ {total}</BoldTxt>. Agora é só confirmar:
              </StyledTypography>

              <SubmitContainer>
                <Button onClick={ticketReservation}>RESERVAR INGRESSO</Button>
              </SubmitContainer>
            </>
          )}
        </>
      )}
    </>
  );
}

const StyledAlert = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 243px;
`;
export const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const BoldTxt = styled.span`
  font-weight: bold;
`;

const SubmitContainer = styled.div`
  margin-top: 0px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

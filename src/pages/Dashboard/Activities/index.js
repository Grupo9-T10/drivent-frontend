import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import ActivitiesList from '../../../components/Activities/ActivitiesList.js';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import { getTicketInformation } from '../../../services/ticketApi.js';
import api from '../../../services/api.js';
export default function Activities() {
  const { userData } = useContext(UserContext);
  const [ticketIsPaid, setTicketIsPaid] = useState(false);
  const [ticket, setTicket] = useState(undefined);
  const [event, setEvent] = useState(undefined);
  const [days, setDays] = useState([]);
  useEffect(() => {
    loadTicket();
    loadDays();
  }, []);

  function loadTicket() {
    api
      .get('/tickets', {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setTicket(res.data);
      })
      .catch((err) => {
        setTicket('No ticket');
      });
  }

  async function loadDays() {
    const event = await api.get('/event');
    console.log(event, 'evento');
  }

  if (!ticket) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <p>Carregando...</p>
      </>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ActPageContainer>
        {ticket === 'No ticket' || ticket.status === 'RESERVED' ? (
          <p>
            Voce precisa ter confirmado pagamento antes
            <br /> de fazer a escolha de atividades
          </p>
        ) : ticket.status === 'PAID' && ticket.TicketType.isRemote === true ? (
          <p>
            Sua modalidade de ingresso não necessita escolher <br />
            atividade.Voce terá acesso a todas as atividades
          </p>
        ) : (
          <>
            <StyledTypography variant="h6" color="textSecondary">
              Primeiro, filtre pelo dia do evento:
            </StyledTypography>
            <DaysButton>
              <button>Sexta, 27/08</button>
              <button>Sexta, 27/08</button>
              <button>Sexta, 27/08</button>
            </DaysButton>
            <ActivitiesList />
          </>
        )}
      </ActPageContainer>
    </>
  );
}
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const ActPageContainer = styled.div`
  p {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #8e8e8e;
    margin-top: 25%;
  }

  h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;

const DaysButton = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  gap: 10px;
  button {
    font-family: 'Roboto', sans-serif;
    width: 15%;
    border: none;
    background-color: #e0e0e0;
    border-radius: 5px;
    box-shadow: 1px 1px 10px -2px #6e6e6e;
    :hover {
      cursor: pointer;
    }
  }
`;

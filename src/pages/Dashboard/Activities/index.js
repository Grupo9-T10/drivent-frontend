import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import ActivitiesList from '../../../components/Activities/ActivitiesList.js';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext.js';
import api from '../../../services/api.js';
import DaysButton from '../../../components/Activities/DaysButton.js';
export default function Activities() {
  const { userData } = useContext(UserContext);
  const [reload, setReload] = useState(undefined);
  const [ticket, setTicket] = useState(undefined);
  const [event, setEvent] = useState(undefined);
  const [activities, setActivities] = useState(undefined);
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
    try {
      const event = await api.get('/event');
      setEvent(event.data);
    } catch (err) {}
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
            <StyledTypography variant="h6!reload)" color="textSecondary">
              Primeiro, filtre pelo dia do evento:
            </StyledTypography>
            {event ? <DaysButton event={event} token={userData.token} setActivities={setActivities} /> : <></>}
            {activities && activities.length === 0 ? (
              <p>Não há atividades para esse dia</p>
            ) : activities ? (
              <ActivitiesList
                activities={activities}
                userId={userData.user.id}
                token={userData.token}
                setReload={setReload}
                reload={reload}
              />
            ) : (
              <></>
            )}
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

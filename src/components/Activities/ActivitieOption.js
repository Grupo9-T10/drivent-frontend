import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import api from '../../services/api.js';

export default function ActivitieOption({ data, userActivities, userId, token, setUserActivities }) {
  const LocalizedFormat = require('dayjs/plugin/localizedFormat');
  dayjs.extend(LocalizedFormat);
  const startTime = dayjs(data.startTime).add(3, 'hours').format('hh:mm');
  const endTime = dayjs(data.startTime)
    .add(data.duration + 180, 'minutes')
    .format('HH:mm');

  function reserveActivitie(activitieId) {
    const body = { activitieId, userId };
    const promise = api.post('/activities/register', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise
      .then((res) => {
        console.log(res);
        setUserActivities([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ContainerAct size={data.duration / 60} entered={userActivities.includes(data.id)}>
      <Infos>
        <h6>{data.name}</h6>
        <h5>
          {startTime} - {endTime}
        </h5>
      </Infos>
      <IngressDiv>
        {data.vacanciesCurrent === 0 ? (
          <>
            <ClosedIcon />
            <VaganciInfo color={'red'}>Esgotado</VaganciInfo>
          </>
        ) : (
          <>
            <EnterIcon onClick={() => reserveActivitie(data.id)} />
            <VaganciInfo color={'green'}>{data.vacanciesCurrent} vagas</VaganciInfo>
          </>
        )}
      </IngressDiv>
    </ContainerAct>
  );
}

const ContainerAct = styled.div`
  background-color: ${(props) => (props.entered ? '#CDF6DB' : '#f1f1f1')};
  height: ${(props) => `${80 * props.size}px`};
  width: 100%;
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 75%;
  gap: 10px;
  h6 {
    color: black;
    font-size: small;
    font-family: 'Roboto', sans-serif;
    font-weight: 550;
  }
  h5 {
    color: #343434;
    font-size: smaller;
    font-weight: lighter;
    font-family: 'Roboto', sans-serif;
  }
`;

const VaganciInfo = styled.h5`
  margin-left: 7px;
  width: 100%;
  color: ${(props) => props.color};
  font-size: 10px;
`;

const IngressDiv = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: thin solid #cfcfcf;
  text-align: center;
`;

const EnterIcon = styled(CgEnter)`
  color: green;
  font-size: 23px;
  margin-left: 8px;
`;

const ClosedIcon = styled(AiOutlineCloseCircle)`
  color: red;
  font-size: 23px;
  margin-left: 8px;
`;

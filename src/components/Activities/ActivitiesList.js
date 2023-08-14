import styled from 'styled-components';
import ActivitieOption from './ActivitieOption.js';
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
export default function ActivitiesList({ activities, userId, token }) {
  const [localPrincipal, setLocalPrincipal] = useState([]);
  const [localLateral, setLocalLateral] = useState([]);
  const [workshopLocal, setWorkshopLocal] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  useEffect(() => {
    organizeActivitiesLocal();
    getUsersActivities();
  }, [activities]);

  function organizeActivitiesLocal() {
    const principal = [];
    const lateral = [];
    const workshop = [];
    activities.forEach((a) => {
      if (a.local === 'Auditório Principal') {
        principal.push(a);
      }

      if (a.local === 'Auditório Lateral') {
        lateral.push(a);
      }

      if (a.local === 'Sala de Workshop') {
        workshop.push(a);
      }
    });
    setLocalPrincipal(principal);
    setLocalLateral(lateral);
    setWorkshopLocal(workshop);
  }

  function getUsersActivities() {
    const promise = api.get(`/activities/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise
      .then((res) => {
        const data = res.data;
        const ids = [];
        data.forEach((r) => ids.push(r.id));
        setUserActivities(ids);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <LocalsContainer>
        <Local>
          <LocalName>Auditório Principal</LocalName>
          <LocalOptions>
            <ScrooledDiv>
              {localPrincipal.map((a) => (
                <ActivitieOption
                  data={a}
                  userActivities={userActivities}
                  userId={userId}
                  token={token}
                  setUserActivities={setUserActivities}
                />
              ))}
            </ScrooledDiv>
          </LocalOptions>
        </Local>
        <Local>
          <LocalName>Auditório Lateral</LocalName>
          <LocalOptions>
            <ScrooledDiv>
              {localLateral.map((a) => (
                <ActivitieOption
                  data={a}
                  userActivities={userActivities}
                  userId={userId}
                  token={token}
                  setUserActivities={setUserActivities}
                />
              ))}
            </ScrooledDiv>
          </LocalOptions>
        </Local>
        <Local>
          <LocalName>Sala de Workshop</LocalName>
          <LocalOptions>
            <ScrooledDiv>
              {workshopLocal.map((a) => (
                <ActivitieOption
                  data={a}
                  userActivities={userActivities}
                  setUserActivities={setUserActivities}
                  userId={userId}
                  token={token}
                />
              ))}
            </ScrooledDiv>
          </LocalOptions>
        </Local>
      </LocalsContainer>
    </>
  );
}

const LocalsContainer = styled.div`
  width: 100%;
  height: 54vh;
  margin-top: 40px;
  display: flex;
`;

const Local = styled.div`
  height: 55vh;
  width: 33.4%;
  position: relative;
`;

const LocalName = styled.div`
  display: flex;
  height: 5vh;
  align-items: center;
  justify-content: center;
  color: #7b7b7b;
  font-family: 'Roboto', sans-serif;
  font-size: 19px;
`;

const LocalOptions = styled.div`
  border: 2.2px solid #d7d7d7;
  height: 50vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ScrooledDiv = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #abaaac;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;

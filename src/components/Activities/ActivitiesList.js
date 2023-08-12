import styled from 'styled-components';
import ActivitieOption from './ActivitieOption.js';

export default function ActivitiesList() {
  return (
    <>
      <LocalsContainer>
        <Local>
          <LocalName>Auditório Principal</LocalName>
          <LocalOptions>
            <ScrooledDiv>
              <ActivitieOption />
              <ActivitieOption />
              <ActivitieOption />
            </ScrooledDiv>
          </LocalOptions>
        </Local>
        <Local>
          <LocalName>Auditório Lateral</LocalName>
          <LocalOptions></LocalOptions>
        </Local>
        <Local>
          <LocalName>Sala de Workshop</LocalName>
          <LocalOptions></LocalOptions>
        </Local>
      </LocalsContainer>
    </>
  );
}

const LocalsContainer = styled.div`
  width: 100%;
  height: 55vh;
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

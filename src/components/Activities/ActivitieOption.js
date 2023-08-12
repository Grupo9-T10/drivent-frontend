import styled from 'styled-components';
import { CgEnter } from 'react-icons/cg';
import { AiOutlineCloseCircle } from 'react-icons/ai';
export default function ActivitieOption() {
  return (
    <ContainerAct>
      <Infos>
        <h6>Lol:Montando o Pc ideal</h6>
        <h5>09:00 - 10-00</h5>
      </Infos>
      <IngressDiv>
        {/*<ClosedIcon />
         */}
        <EnterIcon />
        <h5>N vagas</h5>
      </IngressDiv>
    </ContainerAct>
  );
}

const ContainerAct = styled.div`
  background-color: #f1f1f1;
  height: 160px;
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

const IngressDiv = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: thin solid #cfcfcf;
  text-align: center;
  h5 {
    margin-left: 7px;
    width: 100%;
    color: green;
    font-size: 10px;
  }
`;

const EnterIcon = styled(CgEnter)`
  color: green;
  font-size: 23px;
  margin-left: 5px;
`;

const ClosedIcon = styled(AiOutlineCloseCircle)`
  color: red;
  font-size: 23px;
  margin-left: 5px;
`;

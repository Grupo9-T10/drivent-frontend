import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { BsPerson } from 'react-icons/bs';
export default function HotelInfo() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <PageContainer>
        <h1>Primeiro, escolha seu hotel</h1>
        <HotelsContainer>
          <HotelBox>
            <img src='https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg'/>
            <h1>Nome do hotel</h1>

            <h2>Tipos de acomodação:</h2>
            <h3>Tipos</h3>

            <h2>Vagas disponíveis:</h2>
            <h3>Num de vagas</h3>
          </HotelBox>
          <HotelBox>
            <img src='https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg'/>
            <h1>Nome do hotel</h1>

            <h2>Tipos de acomodação:</h2>
            <h3>Tipos</h3>

            <h2>Vagas disponíveis:</h2>
            <h3>Num de vagas</h3>
          </HotelBox>
        </HotelsContainer>

        <h1>Ótima pedida! Agora escolha seu quarto:</h1>
        <RoomsContainer>
          <RoomBox>
            <h1>123</h1>
            <StyledIcon />

          </RoomBox>

          <RoomBox>
            <h1>123</h1>
            <StyledIcon />

          </RoomBox>
        </RoomsContainer>

      </PageContainer>

    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const PageContainer = styled.div`
  font-family: Roboto;
  h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin-top: 30px;
    margin-bottom: 20px;

  };
`;

const HotelsContainer = styled.div`
display: flex;
`;
const HotelBox = styled.div`
  font-family: Roboto;
  width: 196px;
  height: 264px;
  padding: 15px;

  img{
    width: 168px;
    height: 109px;
    border-radius: 5px;
  };

  h1{
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #343434;
    margin-top: 10px;
  };

  h2{
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #3C3C3C;
    margin-top: 15px;
  };

  h3{
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #3C3C3C;
;
  };
`;

const RoomsContainer = styled.div`
display: flex;
  `;

const RoomBox = styled.div`
width: 190px;
height: 45px;
border-radius: 10px;
border: 1px;
border-color: #CECECE;
border-style: solid;
display: flex;
justify-content: space-between;
padding: 10px;
margin-right: 10px;
  h1{
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 0;
    color: #454545;
  }
`;

const StyledIcon = styled(BsPerson)`
  font-size: 25px;
  color: black;
`;

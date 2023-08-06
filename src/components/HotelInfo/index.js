import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';

import UserContext from '../../contexts/UserContext';
import { checkRoomAvailability, getHotels, getHotelsRooms } from '../../services/hotelsApi';

export default function HotelInfo() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  useEffect(loadHotels, []);
   
  async function loadHotels() {
    try {
      const response = await getHotels(userData.token, userData.user.id);
      const hotelPromises = response.map((hotel) => loadRooms(hotel.id));
      const roomsResponses = await Promise.all(hotelPromises);
  
      const updatedHotels = response.map((hotel, index) => ({
        ...hotel,
        rooms: roomsResponses[index].Rooms,
      }));
        
      setHotels(updatedHotels);
    } catch (error) {
      console.error(error);
    }
  };

  async function loadRooms(hotelId) {
    try {
      const response = await getHotelsRooms(userData.token, hotelId);
      const roomsPromises = response.Rooms.map((room) => checkRoomAvailability(userData.token, room.id));

      const roomsAvailability = await Promise.all(roomsPromises);

      const occupiedRoomIds = roomsAvailability.flatMap((availability) =>
        availability.map((item) => item.roomId)
      );

      setRooms(response.Rooms);
      setOccupiedRooms(occupiedRoomIds);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick(id) {
    loadRooms(id);
    setSelectedHotelId(id);
  };

  function handleIcon(room) {
    if (room.capacity === 1) {
      return occupiedRooms.includes(room.id) ?
        <StyledIconOcupado isFull={true} disabled={true}/> :
        <StyledIcon />;
    };

    if (room.capacity === 2) {
      if (occupiedRooms.includes(room.id)) {
        const occurrences = occupiedRooms.filter((number) => number === room.id).length;
        return room.capacity === occurrences ?
          <>
            <StyledIconOcupado isFull={true} />
            <StyledIconOcupado isFull={true}/>
          </> 
          :
          <>
            <StyledIconOcupado isFull={false}/>
            <StyledIcon />
          </>;
      };
      return <>
        <StyledIcon />
        <StyledIcon />
      </>;
    };

    if (room.capacity === 3) {
      if (occupiedRooms.includes(room.id)) {
        const occurrences = occupiedRooms.filter((number) => number === room.id).length;
        return room.capacity === occurrences ?
          <>
            <StyledIconOcupado isFull={true}/>
            <StyledIconOcupado isFull={true}/>
            <StyledIconOcupado isFull={true}/>
          </> 
          :
          (2 === occurrences ?
            <>
              <StyledIcon />
              <StyledIconOcupado isFull={false}/>
              <StyledIconOcupado isFull={false}/>
            </>
            :
            <>
              <StyledIcon />
              <StyledIcon />
              <StyledIconOcupado isFull={false}/>
            </>
          );
      };
      return <>
        <StyledIcon />
        <StyledIcon />
        <StyledIcon />
      </>;
    }
  };

  function checkRoomsInfo(rooms) {
    let info = '';
    if (rooms.some((room) => room.capacity === 1 )) {
      info += 'Single, ';
    }
    if (rooms.some((room) => room.capacity === 2 )) {
      info += 'Double, ';
    }
    if (rooms.some((room) => room.capacity === 3)) {
      info += 'Triple';
    }
    return info;
  };

  function checkIfRoomIsfull(room) {
    const occurrences = occupiedRooms.filter((number) => number === room.id).length;
    return room.capacity === occurrences ? true : false;
  };

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <PageContainer>
        <h1>Primeiro, escolha seu hotel:</h1>
        <HotelsContainer>
          {hotels.map(hotel =>
            <HotelBox 
              key={hotel.id}
              hotel={hotel}
              isSelected={selectedHotelId === hotel.id}
              onClick={() => handleClick(hotel.id)}>

              <img src={hotel.image} />
              <h1>{hotel.name}</h1>

              <h2>Tipos de acomodação:</h2>
              <h3>{checkRoomsInfo(hotel.rooms)}</h3>

              <h2>Vagas disponíveis:</h2>
              <h3>{hotel.rooms.reduce((total, room) => total + room.capacity, 0)}</h3>
            </HotelBox> 
          )}
        </HotelsContainer>
        {rooms === undefined || selectedHotelId === null ? '' :  
          <>     
            <h1>Ótima pedida! Agora escolha seu quarto:</h1>
            <RoomsContainer>
              {rooms.map(room => 
                <RoomBox
                  key={room.id}
                  isSelected={selectedRoomId === room.id}
                  isFull={checkIfRoomIsfull(room)}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  <h1>{room.capacity}</h1>
                  <h2>{handleIcon(room)}</h2>
                </RoomBox>            
              )}
            </RoomsContainer>
          </> 
        }
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
  border-radius: 10px;
  margin-right: 15px;
  background-color: ${(props) => (props.isSelected ? '#FFEED2' : '#EBEBEB')};


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
background-color: ${(props) => (props. isFull ? '#E9E9E9' : (props.isSelected ? '#FFEED2' : '#FFFFFF'))};
pointer-events: ${(props) => (props.isFull ? 'none': 'auto')};

  h1{
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 0;
    color: ${(props) => (props.isFull ? '#9D9D9D': '#454545')};
  }
`;

const StyledIcon = styled(BsPerson)`
  font-size: 25px;
  color: ${(props) => (props.isSelected ? '#FF4791' : 'black')};
`;

const StyledIconOcupado = styled(BsFillPersonFill)`
  font-size: 25px;
  color: ${(props) => (props.isFull ? '#8C8C8C' : 'black')};
  pointer-events: none;
`;

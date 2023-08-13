import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import UserContext from '../../contexts/UserContext';
import { checkRoomAvailability, getHotels, getHotelsRooms } from '../../services/hotelsApi';
import { getTicketInformation } from '../../services/ticketApi';
import { changeBooking, getBookingByUserId, postBooking } from '../../services/bookingApi';
import { toast } from 'react-toastify';

export default function HotelInfo() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  const [ticketIncludesHotel, setTicketIncludesHotel] = useState(false);
  const [ticketIsPaid, setTicketIsPaid] = useState(false);
  const [booking, setBooking] = useState(null);
  const [newBooking, setNewBooking] = useState(false);

  useEffect(loadHotels, []);

  async function loadHotels() {
    try {
      loadTicket();
      loadBooking();
      const response = await getHotels(userData.token, userData.user.id);
      const hotelPromises = response.map((hotel) => loadRooms(hotel.id));
      const roomsResponses = await Promise.all(hotelPromises);
  
      const updatedHotels = response.map((hotel, index) => ({
        ...hotel,
        rooms: roomsResponses[index].Rooms,
      }));
      
      setHotels(updatedHotels);
    } catch (error) {
      toast('Erro ao carregar os hotéis');
    };
  }

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
      toast('Erro ao carregar os quartos');
    }
  };

  async function loadTicket() {
    try {
      const ticketInfo = await getTicketInformation(userData.token);
      if (ticketInfo.status === 'PAID' || ticketInfo) {
        setTicketIsPaid(true);
      };
      if (ticketInfo.TicketType.isRemote === false && ticketInfo.TicketType.includesHotel === true) {
        setTicketIncludesHotel(true);
      };
    }catch (error) {
      toast('Erro ao carregar as informações do ticket');
    };
  };

  async function loadBooking() {
    try {
      const bookingRoom = await getBookingByUserId(userData.token);

      if(bookingRoom) {
        const bookingHotel = await loadRooms(bookingRoom.Room.hotelId);

        const occurrences = (occupiedRooms.filter((number) => number === bookingRoom.Room.id).length);

        const bookingInfo = {
          id: bookingRoom.id,
          hotelImage: bookingHotel.image,
          hotelName: bookingHotel.name,
          room: bookingRoom.Room.name,
          roomType: bookingRoom.Room.capacity === 1 ? 'Single' : (bookingRoom.Room.capacity === 2 ? 'Double' : 'Triple'),
          ocupation: occurrences === 0 ? 'Você' : `Você e mais ${occurrences}`
        };
        
        setBooking(bookingInfo);
      }      
    }catch (error) {
      setBooking(false);
      return '';
    };
  };

  async function handleSubmit() {
    try {
      if (booking) {
        await changeBooking({ roomId: selectedRoomId }, userData.token, booking.id);
      }
      else {
        await postBooking({ roomId: selectedRoomId }, userData.token);
      }
      setNewBooking(false);
      toast('Reserva feita com sucesso!');
      loadBooking();
    }catch (error) {
      toast('Ocorreu um erro durante a reserva');
    };
  };

  function handleClick(id) {
    loadRooms(id);
    setSelectedHotelId(id);
  };

  function handleIcon(room) {
    if (room.capacity === 1) {
      return occupiedRooms.includes(room.id) ?
        <StyledIconOcupado isFull={true} disabled={true}/> :
        (selectedRoomId === room.id ? 
          <StyledIconSelected/> :
          <StyledIcon />
        );
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
            {selectedRoomId === room.id ? 
              <StyledIconSelected/> :
              <StyledIcon />
            }
            <StyledIconOcupado isFull={false}/>
          </>;
      };
      return <>
        <StyledIcon />
        {selectedRoomId === room.id ? 
          <StyledIconSelected/> :
          <StyledIcon />
        }
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
              {selectedRoomId === room.id ? 
                <StyledIconSelected/> :
                <StyledIcon />
              }
              <StyledIconOcupado isFull={false}/>
              <StyledIconOcupado isFull={false}/>
            </>
            :
            <>
              <StyledIcon />
              {selectedRoomId === room.id ? 
                <StyledIconSelected/> :
                <StyledIcon />
              }
              <StyledIconOcupado isFull={false}/>
            </>
          );
      };
      return <>
        {selectedRoomId === room.id ? 
          <StyledIconSelected/> :
          <StyledIcon />
        }
        <StyledIcon />
        <StyledIcon />
      </>;
    }
  };

  function checkRoomsInfo(rooms) {
    let info = [];
    if (rooms.some((room) => room.capacity === 1 )) {
      info.push(1);
    }
    if (rooms.some((room) => room.capacity === 2 )) {
      info.push(2);
    }
    if (rooms.some((room) => room.capacity === 3)) {
      info.push(3);
    }
    if (info.includes(1) && info.includes(2) && info.includes(3)) return 'Single, Double e Triple';
    if (info.includes(1) && info.includes(2)) return 'Single e Double';
    if (info.includes(1) && info.includes(3)) return 'Single e Triple';
    if (info.includes(2) && info.includes(3)) return 'Double e Triple';
    if (info.includes(1)) return 'Single';
    if (info.includes(2)) return 'Double';
    if (info.includes(3)) return 'Triple';
  };

  function checkIfRoomIsfull(room) {
    const occurrences = occupiedRooms.filter((number) => number === room.id).length;
    return room.capacity === occurrences ? true : false;
  };

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <PageContainer>
        {!ticketIsPaid ? 
          <p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p>
          :
          !ticketIncludesHotel ?
            <p>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</p>
            :
            booking && !newBooking ? 
              <>
                <h1>Você já escolheu seu quarto:</h1>
                <HotelBox booking={booking}>
                  <img src={booking.hotelImage} alt={booking.hotelName} />
                  <h1>{booking.hotelName}</h1>
            
                  <h2>Quarto reservado:</h2>
                  <h3>{booking.room} ({booking.roomType})</h3>
            
                  <h2>Pessoas no seu quarto:</h2>
                  <h3>{booking.ocupation}</h3>
                </HotelBox>
                <button onClick={() => setNewBooking(true)}>TROCAR DE QUARTO</button> 
              </> 
              :
              <>
                <h1>Primeiro, escolha seu hotel:</h1>
                <HotelsContainer>
                  {hotels.map(hotel =>
                    <HotelBox 
                      key={hotel.id}
                      hotel={hotel}
                      isSelected={selectedHotelId === hotel.id}
                      onClick={() => handleClick(hotel.id)}>

                      <img src={hotel.image} alt={hotel.name}/>
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
                <button disabled={!selectedRoomId} onClick={handleSubmit}>RESERVAR QUARTO</button> 
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
  p {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    color: #8E8E8E;
    margin-top: 25%;
  }
  h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
    margin-top: 30px;
    margin-bottom: 20px;
  };
  button {
    width: 182px;
    height: 37px;
    border: transparent;
    border-radius: 4px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    margin-top: 37px;
    display: ${(props) => (props.disabled ? 'none' : 'inline')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')} ;
  }
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
  background-color: ${(props) => (props.isSelected || props.booking? '#FFEED2' : '#EBEBEB')};
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
background-color: ${(props) => (props.isFull ? '#E9E9E9' : (props.isSelected ? '#FFEED2' : '#FFFFFF'))};
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

const StyledIconSelected= styled(BsFillPersonFill)`
  font-size: 25px;
  color: #FF4791;
`;

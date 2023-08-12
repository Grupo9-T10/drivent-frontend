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

const StyledIconSelected= styled(BsFillPersonFill)`
  font-size: 25px;
  color: #FF4791;
`;
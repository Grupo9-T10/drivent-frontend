import styled from 'styled-components';

export const ContainerPayment = styled.div`
display: flex;
width: 706px;
height: 225px;
padding: 0px 23px 0px 0px;
justify-content: space-between;
align-items: center;
position: relative;
left: -26.5px;
`;

export const ContainerForm = styled.form`
width: 340px;
height: 182px;
display: flex;
flex-direction: column;
justify-content: space-between;
p{
  font-size: 16px;
  color: #ABABAB;
  margin-top: 3px;
}
input{
  width: 100%;
  height: 45px;
  padding: 0.375rem 0.75rem;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  ::placeholder{
    color:#ABABAB;
  }
  cursor: pointer;
}
&>div{
  :last-child{
    display: flex;
    justify-content: space-between;
    input{
      :first-child{
        width: 65%;
      }
      :last-child{
        width: 30%;
      }
    }
  }  
}
`;

export const Button = styled.button`
  width: 182px;
  height: 37px;
  border: transparent;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  margin-top: 37px;
`;

import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Button, ContainerForm, ContainerPayment } from './styles';
import { sendPay } from '../../services/paymentApi';
import creditCardType from 'credit-card-type';
import { toast } from 'react-toastify';

export default function Payments() {
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCard((prev) => ({ ...prev, focus: evt.target.name }));
  };

  async function handleSubmit() {
    const ticketId = 1;
    const { focus, ...cardData } = card;
    const issuer = creditCardType(card.number).type;
    try {
      await sendPay({ ticketId, cardData: { ...cardData, issuer } });
    } catch (error) {
      toast('Ocorreu um erro durante o pagamento!');
    }

  }

  return (
    <>
      <ContainerPayment>
        <Cards
          number={card.number}
          expiry={card.expiry}
          cvc={card.cvc}
          name={card.name}
          focused={card.focus}
        />
        <ContainerForm>
          <div>
            <input
              className='form-control'
              type="number"
              name="number"
              placeholder="Card Number"
              value={card.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <p>E.g.: 49..., 51..., 36..., 37...</p>
          </div>
          <input
            type="name"
            name="name"
            placeholder="Name"
            value={card.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div>
            <input
              type="expiry"
              name="expiry"
              placeholder="Valid Thru"
              value={card.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="cvc"
              name="cvc"
              placeholder="CVC"
              value={card.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </ContainerForm>
      </ContainerPayment>
      <Button type='submit' onClick={handleSubmit}>FINALIZAR PAGAMENTO</Button>
    </>
  );
}

import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Button, ContainerForm, ContainerPayment, SectionTitle } from './styles';
import creditCardType from 'credit-card-type';
import { toast } from 'react-toastify';
import usePayment from '../../hooks/api/usePayment';
import useTicket from '../../hooks/api/useTicket';
import { StyledTypography } from '../Tickets';

export default function Payments() {
  let { ticket } = useTicket();
  const { payment } = usePayment();
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
    const { focus, ...cardData } = card;
    console.log(card.number)
    const issuer = creditCardType(card.number)[0].type;
    console.log(issuer)
    try {
      console.log({ ticketId: ticket.id, cardData: { ...cardData, issuer } })
      await payment({ ticketId: ticket.id, cardData: { ...cardData, issuer } });
      toast('Pagamento realizado com sucesso');
      window.location.href = '/dashboard/hotel';
    } catch (error) {
      toast('Ocorreu um erro durante o pagamento!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SectionTitle>Pagamento</SectionTitle>
      <ContainerPayment>
        <Cards number={card.number} expiry={card.expiry} cvc={card.cvc} name={card.name} focused={card.focus} />
        <ContainerForm>
          <div>
            <input
              className="form-control"
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
      <Button type="submit" onClick={handleSubmit}>
        FINALIZAR PAGAMENTO
      </Button>
    </>
  );
}

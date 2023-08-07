import { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Button, ContainerForm, ContainerPayment, SectionTitle, TicketCard } from './styles';
import creditCardType from 'credit-card-type';
import { toast } from 'react-toastify';
import usePayment from '../../hooks/api/usePayment';
import useTicket from '../../hooks/api/useTicket';
import { StyledTypography } from '../Tickets';
import Paid from '../Paid';

export default function Payments() {
  const { ticket } = useTicket();
  const [isRemote, setIsRemote] = useState(null);
  const [includesHotel, setIncludesHotel] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [paid, setPaid] = useState(null);
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

  useEffect(() => {
    if (ticket) {
      setIncludesHotel(ticket.TicketType.includesHotel);
      setIsRemote(ticket.TicketType.isRemote);
      setTicketStatus(ticket.status);
    }
  }, [ticket]);

  async function handleSubmit() {
    const { focus, ...cardData } = card;
    const issuer = creditCardType(card.number)[0].type;
    try {
      await payment({ ticketId: ticket.id, cardData: { ...cardData, issuer } });
      setPaid(true);
      toast('Pagamento realizado com sucesso');
    } catch (error) {
      toast('Ocorreu um erro durante o pagamento!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <SectionTitle>Ingresso escolhido</SectionTitle>
      {isRemote ? <TicketCard><p>Online</p><p>R$100,00</p></TicketCard> : includesHotel ? <TicketCard><p>Presencial + Com Hotel</p><p>R$600,00</p></TicketCard> : <TicketCard><p>Presencial + Sem Hotel</p><p>R$250,00</p></TicketCard>}

      <SectionTitle>Pagamento</SectionTitle>
      {ticketStatus === 'RESERVED' && !paid? <><ContainerPayment>
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
      </Button></> : <Paid />}

    </>
  );
}

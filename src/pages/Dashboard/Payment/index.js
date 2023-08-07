import React, { useEffect, useState } from 'react';
import Payments from '../../../components/Payments';
import Tickets from '../../../components/Tickets';
import useTicket from '../../../hooks/api/useTicket';
import Paid from '../../../components/Paid';

export default function Payment() {
  const [hasTicket, setHasTicket] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(null);

  const { ticket } = useTicket();
  useEffect(() => {
    if (ticket) {
      setHasTicket(true);
      setTicketStatus(ticket.status);
    }
  }, ticket);

  return (
    <>
      {hasTicket && ticketStatus === 'RESERVED' ? <Payments /> : <Tickets />}
      <Paid />
    </>
  );
}

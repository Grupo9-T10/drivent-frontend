import React, { useEffect, useState } from 'react';
import Tickets from '../../../components/Tickets';
import useTicket from '../../../hooks/api/useTicket';
//import Payments from '../../../components/Payments';

export default function Payment() {
  const [ hasTicket, setHasTicket ] = useState(false);
  const [ ticketStatus, setTicketStatus ] = useState(null);

  const { ticket } = useTicket();
  useEffect(() => {
    if(ticket) {
      setHasTicket(true);
      setTicketStatus(ticket.status);
    }
  }, ticket);

  //console.log(ticket);
  //console.log(ticketStatus);
  //console.log(hasTicket);

  return (
    <>
      {hasTicket && ticketStatus === 'RESERVED' ? (
        <>  
          <h1>Componente Payments</h1>
        </> 
      ) : (
        <Tickets />
      )}
    </>
  );
}

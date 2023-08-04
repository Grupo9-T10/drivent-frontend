import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: ticketTypesLoading,
    error: ticketTypesError,
    act: getTicket
  } = useAsync(() => ticketApi.getTicketTypesInformation(token));

  return {
    ticketTypes,
    ticketTypesLoading,
    ticketTypesError,
    getTicket
  };
}

import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();

  const {
    loading: paymentLoading,
    error: paymentError,
    act: payment,
  } = useAsync((data) => paymentApi.sendPay(data, token), false);

  return {
    paymentLoading,
    paymentError,
    payment,
  };
}

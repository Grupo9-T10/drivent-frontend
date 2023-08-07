import { Check, ContainerPayments } from './style';

export default function Paid() {
  return (
    <ContainerPayments>
      <Check />
      <div>
        <h2>Pagamento confirmado!</h2>
        <h3>Prossiga para escolha de hospedagem e atividades</h3>
      </div>
    </ContainerPayments>
  );
}

import Payments from '../../../components/Payments';
// import Tickets from '../../../components/Tickets';
import { useForm } from '../../../hooks/useForm';
import { ContainerNoPayments } from './style';

export default function Payment() {
  const { data } = useForm();

  return (
    <>
      {data.name ? (
        <>
          {/* <Tickets /> */}
          <Payments />
        </>
      ) : (
        <ContainerNoPayments>
          <h3>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</h3>
        </ContainerNoPayments>
      )}
    </>
  );
}

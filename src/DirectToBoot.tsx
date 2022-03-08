import useOrder from "./use-order";

const DirectToBoot = ({orderId}: {orderId: string}) => {
  const {isReady} = useOrder(orderId)

  return <div>
    <h3 data-testid="heading">Direct To Boot</h3>
    <p data-testid="description">Please click the button when you have arrived, one of our friendly staff will bring your order to you.</p>
    <button data-testid="iamhere" disabled={!isReady}>I'm Here</button>
  </div>
}

export default DirectToBoot
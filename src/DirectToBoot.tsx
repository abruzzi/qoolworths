import useOrder from "./useOrder";
import useNotifyArrival from "./useNotifyArrival";

const DirectToBoot = ({orderId}: { orderId: string }) => {
  const {isReady} = useOrder(orderId)
  const {notified, notify, notifiable} = useNotifyArrival(orderId)

  return <div>
    <h3 data-testid="heading">Direct To Boot</h3>
    <p data-testid="description">Please click the button when you have arrived, one of our friendly staff will bring
      your order to you.</p>
    {
      notifiable ? (notified ? <p data-testid="store-is-notified">Notified</p> :
        <button data-testid="iamhere" disabled={!isReady} onClick={notify}>I'm Here</button>) : (
        <button data-testid="store-phone-number">123</button>)
    }
  </div>
}

export default DirectToBoot
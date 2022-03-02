import {useEffect, useState} from "react";
import axios from "axios";

const DirectToBoot = ({orderId}: {orderId: string}) => {
  const [isReady, setReady] = useState<boolean>(false)

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`https://qoolworths.com.au/orders/${orderId}`)
        setReady(response.data.status === 'ready')
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrderStatus()
  }, [orderId])

  return <div>
    <h3 data-testid="heading">Direct To Boot</h3>
    <p data-testid="description">Please click the button when you have arrived, one of our friendly staff will bring your order to you.</p>
    <button data-testid="iamhere" disabled={!isReady}>I'm Here</button>
  </div>
}

export default DirectToBoot
import {useState} from "react";
import axios from "axios";

const useNotifyArrival = (orderId: string) => {
  const [notified, setNotified] = useState<Boolean>(false)
  const [notifiable, setNotifiable] = useState<Boolean>(true)

  const notify = async () => {
    try{
      const response = await axios.post(`https://qoolworths.com.au/orders/${orderId}`)
      setNotifiable(response.data.notified)
      setNotified(response.data.notified)
    } catch (error) {
      setNotifiable(false)
      setNotified(false)
    }
  }

  return {
    notify,
    notified,
    notifiable
  }
}

export default useNotifyArrival
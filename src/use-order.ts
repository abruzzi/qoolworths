import {useState} from "react";
import axios from "axios";
import useInterval from "./useInterval";

const pollingDelay = 1000;
const stopPollingDelay = 0;

const useOrder = (orderId: string) => {
  const [isReady, setReady] = useState<boolean>(false)

  const [delay, setDelay] = useState<number>(pollingDelay)
  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(`https://qoolworths.com.au/orders/${orderId}`)
      const isOrderReady = response.data.status === 'ready';

      setReady(isOrderReady)
      setDelay(isOrderReady ? stopPollingDelay : pollingDelay)
    } catch (error) {
      console.error(error)
    }
  }

  useInterval(fetchOrderStatus, delay)

  return { isReady }
}

export default useOrder
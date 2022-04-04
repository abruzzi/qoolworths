import {useState} from "react";

const  useRoundUp = (price, enabled) => {
  return {total: 0, roundUpAmount: 0}
}

const Payment = ({price}: {price: number}) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const {total, roundUpAmount} = useRoundUp(price, enabled)

  const onChange = () => setEnabled(e => !e)
  return (
    <div>
      <p>You need to pay: {price}</p>
      <p>Do you want to donate {roundUpAmount}</p>
      <input type="checkbox" checked={enabled} onChange={onChange}/>
    </div>
  )
}
import "./Balance.css"

type Props = {
  amount: number;
  isAdmin: boolean;
  view: boolean;
  btnText1: string;
  action: () => void;
  action2: () => void;
  value: number;
  onChange: (value: number) => void;
}

function Balance({ amount, value, isAdmin, view, btnText1, action, action2, onChange }: Props) {
  return (
    <div className="balance">
      <h1 className='hBalance'>Saldo: ${amount.toLocaleString()}</h1>
      <button onClick={action2} style={{ display: isAdmin ? 'flex' : 'none', borderRadius: '100%', backgroundColor: 'red', color: 'lightblue'}}>{btnText1}</button>
      <input onChange={(e) => {onChange(Number(e.target.value))}} value={value} style={{ display: view ? 'flex' : 'none' }} type="number"></input>
      <button onClick={action} style={{  display: view ? 'flex' : 'none' }}>Aceptar</button>
    </div>
  )
}

export default Balance
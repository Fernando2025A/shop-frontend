import './ProfileDashboard.css'

type Props = {
  username: string,
  email: string,
  balance: number,
  //id: number,
  memberShip: number,
  avatar: string,
  btnAction: () => void;
}

function ProfileDashboard({ username, email, btnAction, balance, memberShip, avatar }: Props) {
  return (
    <div className='profile-dashboard'>
      <img style={{ width: '100px', borderRadius: "50%", height: '100px', border: '2px solid rgb(111, 0, 255)'}} src={`/images/${avatar}`}></img>
      <h2>{username}</h2>
      <p>{email}</p>
      <p>{memberShip}</p>
      <h3>Saldo disponible</h3>
      <p className='amount'>${balance}</p>
      <button onClick={btnAction} className='btn'>Cerrar sesión</button>
    </div>
  )
}

export default ProfileDashboard
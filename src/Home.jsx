import logo from "/logo.svg"
// import Homepage from './Homepage'
import { Link } from 'react-router-dom'

export default function Home(){


		return (
		<>
		<div className="main--content">
		<img src={logo}/>
		<p>Adresse e-mail</p>
		<input
		type="text"
		className="login"
		/>
		<p>Mot de passe</p>
		<input
		type="text"
		className="login"
		/>
		<div className='login--button'>
		<Link to="/Homepage"><p>Connect</p></Link>
		</div>
		</div>
		</>
	)
}

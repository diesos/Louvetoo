import Logo from '/logo.svg'

export default function Nav(){
	return (
		<nav>
			<img src={Logo} alt="Logo of Louvetoo" />
			<ul>
				<li>
					Home
				</li>
				<li>
					Child
				</li>
				<li>
					Profil
				</li>
			</ul>
		</nav>
	)
}

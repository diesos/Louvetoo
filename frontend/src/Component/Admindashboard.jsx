import AdminCards from "./AdminCards";
import { Link } from 'react-router-dom';
import { faUser, faChild, faGamepad} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admindashboard() {

return (
	<>
	<p style=
	{{
	textAlign: 'center' ,
	fontWeight: '800',
	marginTop: '15px'
	}}>Bienvenu sur le panel Admin.
	</p>
	<Link to='/adminchild'><AdminCards
	icon={<FontAwesomeIcon icon={faChild} style={{fontSize: '2.2em', color: 'white'}} />}
	title="Gérer les Enfants"
	detail="Ajouter, modifier ou supprimer un enfant"
	color="pink"
	/></Link>
	<Link to='/adminusers'><AdminCards
	icon={<FontAwesomeIcon icon={faUser} style={{fontSize: '2em', color: 'white'}} />}
	title="Gérer les Utilisateurs"
	detail="Ajouter, modifier ou supprimer un utilisateur"
	color='blue'
	/></Link>
	<Link to='/adminactivite'><AdminCards
		icon={<FontAwesomeIcon icon={faGamepad} style={{fontSize: '2em', color: 'white'}} />}
	title="Gérer les Activités"
	detail="Ajouter, modifier ou supprimer une activité"
	color='purple'
	/></Link>
	</>
)}

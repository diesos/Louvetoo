export default function AdminCards(props){

	return(
		<div className={`cards ${props.color}`}>
		<div className="cards--inner">
		{props.icon}
		<h3>{props.title}</h3>
		<p>{props.detail}</p>
		</div>
		</div>
	)
}

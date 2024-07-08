export default function AdminCards(props){

	return(
		<div className={`cards ${props.color}`} style={{display:'flex', flexDirection:'row'}}>
		<div style={{alignContent:'center'}}>{props.icon}</div>
		<div className="cards--inner" >

		<h3>{props.title}</h3>
		<p>{props.detail}</p>
		</div>
		</div>
	)
}

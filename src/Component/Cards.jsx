export default function Cards(prop){

	const actionArray = [
		"Deposit",
		"Withdraw",
		"Lunch",
		"Change",
		"Activity"
	]

	function selectActivity(param) {
		switch(param) {
			case "Deposit":
				return "a été déposé";
			case "Withdraw":
				return "a été retiré";
			case "Lunch":
				return "a déjeuner";
			case "Change":
				return "a été changé";
			case "Activity":
				return "a pratiqué une activité";
			default:
				return "";
		}
	}
	const actionClass = actionArray[prop.value]
	const activityClass = selectActivity(actionArray[prop.value])

	console.log(activityClass)

	return(
		<div className={`cards --${actionClass}`}>
		<div className="cards--inner">
		<h3>{actionArray[prop.value]} |</h3>
		<p>Votre enfant  {activityClass}</p>
		</div>
		</div>
	)
}

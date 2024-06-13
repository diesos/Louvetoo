export function getCurrentDate(separator=''){

	let newDate = new Date()
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();
	let hours = newDate.getHours();
	let minutes = newDate.getMinutes();
	let day = newDate.getDay() - 1;
	const dayOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

	return `${dayOfWeek[day]} ${hours}:${minutes} ${date}/${separator}${month<10?`0${month}`:`${month}`}/${year}`
	}

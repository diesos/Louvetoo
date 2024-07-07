import { useState, useEffect } from "react";

export default function Cards2(props){
	const {prenom, name, date_naissance, allergie, diet, createdAt} = props;

	return(
		<div className={`cards`}>
		<div className="cards--inner">
		<h3>{prenom} {name} </h3>
		<p>Age : {date_naissance - 2024} ans
		</p>
		<p>Date de naissance : {date_naissance} </p>
		<p>Allergie(s): {allergie}</p>
		<p>Diet(s): {diet}</p>
		<p>Crée le : {createdAt}</p>
		</div>
		</div>
	)
}

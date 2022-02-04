import React from 'react';

function CandidatRow(props) {
	//atributul candidat il accesez prin intermediul lui props
	return (
		<div className={`card background${props.index % 4 + 1}`}>
			<p>
				<a href={`#/candidates/${props.candidat.id}`}>Candidat: {props.candidat.name}- {props.candidat.email} </a>
				{/* link catre candidati urmat de id-ul candidatului */}
			</p>
		</div>		
	);
}

export default CandidatRow;
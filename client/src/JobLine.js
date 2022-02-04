//linia jobului
import React, {useState, useEffect} from 'react';
import CandidatRow from './CandidatRow';

function JobLine(props) {
	//cu ajutorul lui props vom lua setari ale componentei cand e utilizata-->atributele date vor fi 
	//vizibile prin props

	const [candidates, setCandidates] = useState([]);
	const style = {
		height: `${props.height}%`,
	};
	//incarc candidatii pentru postarea curenta
	const loadCandidates = async (jobpostingId) => {
		const response = await fetch(`/models/candidates?jobpostingId=${jobpostingId}`);
		if (response.status === 200) {
			setCandidates(await response.json());
		}
	};
	useEffect(() => loadCandidates(props.jobPosting.id), [props.jobPosting.id]);
	return (
		<div className={`column background${props.index % 4 + 1}`} style={style}>
			<p className="column-title">
				<a href={`#/jobpostings/${props.jobPosting.id}`}>{props.jobPosting.description} </a>
                <a href={`#/candidates/new?jobpostingId=${props.jobPosting.id}`} className="add">+</a>
				{/* pentru adaugare --jobPosting.id -->id-rl postului in care am apasat pe +,deci in care  vrem sa adaugam un nou candidat*/}
                <p className='pSecundar'>{props.jobPosting.deadline}</p>
				{/* generez editarea */}
	
			</p>
            {/* mapam fiecare candidat */}
			<div className="cards">
				{
					candidates.map((candidat, index) => <CandidatRow candidat={candidat} index={props.index} key={index}/>)
				}
			</div>
		</div>
	);
}

export default JobLine;
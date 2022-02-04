import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";


function CandidateForm(props) {
	const navigate = useNavigate();
	const {candidateId} = useParams();
	const {search} = useLocation();
	const queryParameters = new URLSearchParams(search);
	const jobpostingId = queryParameters.get('jobpostingId');
	const [candidate, setCandidate] = useState({
		name: '',
		cv: '',
		email: '',
		jobpostingId: jobpostingId ? jobpostingId : 'new'
	
	});
	const [jobPostings, setJobPostings] = useState([]);


	const loadCandidate = async (candidateId) => {
		if (candidateId && candidateId !== 'new') {
			const response = await fetch(`/models/candidates/${candidateId}`);
			if (response.status === 200) {
				setCandidate(await response.json());
			}
		}
	}

	const loadJobPostings = async () => {
		const response = await fetch(`/models/jobpostings`);
		if (response.status === 200) {
			setJobPostings(await response.json());
		}
	};
	
	useEffect(() => loadJobPostings(), [jobPostings]);
	useEffect(() => loadCandidate(candidateId), [candidateId]);


	function set(property, value) {
		const record = {...candidate};
		record[property] = value;
		setCandidate(record);
        

	}

	async function saveCandidate() {
       
		if (candidateId === 'new') {
			const response = await fetch(`/models/candidates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(candidate)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
            if (await window.confirm('Are you sure you want to change?')){
			const response = await fetch(`/models/candidates/${candidateId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(candidate)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
    }
    
	}
	async function deleteCandidate() {
      
		if (candidate.id && candidateId !== 'new'&& await window.confirm('Are sure want to delete?')) {
			const response = await fetch(`/models/candidates/${candidateId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
        }

    
	}


	return (

		<div>
				<div className="butoaneStart">
		<input type="button" className="butonAdd" value="Home"
						onClick={()=>navigate('/')}/>
		</div>
		<div className="form">
			<h1>Candidate</h1>
			<form  onSubmit={()=>{saveCandidate()} }
                 onReset={() => navigate('/')}>
				<label>Name <span>(at least 5 characters)</span></label>
				<input required type="text" minlength="5" value={candidate.name}
					onChange={event=>set('name', event.target.value)}/>
					{/* trebuie sa am onChange altfel nu ma lasa sa editez */}
					{/* event.target.value e ce scrie in controlul respevctiv */}
                    <span></span>
                    

                    <label>Cv  <span>(at least 100 characters)</span></label>
				<textarea required minlength="100" maxLength="1000"  value={candidate.cv} rows="3" cols="5" placeholder="Enter text"
					onChange={event => set('cv', event.target.value)}/>
                    <span></span>

                      
                 <label>Email</label>
				<input required type="email"   pattern=".+@gmail\.com" placeholder="format:.+@gmail\.com " value={candidate.email}
					onChange={event => set('email', event.target.value)}/>
                    <span></span>
            

{/*                     
				<label>Farmacie</label>
				<div className="select">
					<select value={medicament.farmacieId}
						onChange={event => set('farmacieId', event.target.value)}>
						<option value="new">-- New --</option>
						{
							farmacii.map((farmacie, index) =>
								(<option key={index} value={farmacie.id}>{farmacie.name}</option>))
						}
					</select>	
					<input type="button" className="edit" value="Edit"
						onClick={() => navigate(`/farmacii/${medicament.farmacieId}`)}/>	
				</div>
 */}


				<div className="buttons">
					<input type="submit" value="Save"/>

					{/* delete e conditionat ca studentul  sa existe deja */}
					{candidateId && candidateId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteCandidate}/>}


					<input type="reset" value="Cancel"/>
					{/* pe onClick pot pune navigate('/') */}


				</div>
			</form>
		
		</div>		
		</div>
	);
}

export default CandidateForm;
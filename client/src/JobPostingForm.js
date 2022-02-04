//form de editare pentru jobPosting

import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
//am importat useNavigate ma aajuta sa dau back la pagina
//am nevoie de params pt a putea accesa parametrii

function JobPostingForm(props) {
	const navigate = useNavigate();//sa ma duc pe next
	const {jobpostingId} = useParams();//iau id-ul 

	//constanta pentru a edita sala
	const [jobPosting, setJobPosting] = useState({
		description: '',
        deadline:''
	});

	//incarc jobul cu id-ul care imi este dat in url
	//iau jobul  din server
	const loadJobPosting = async (jobpostingId) => {
		if (jobpostingId && jobpostingId !== 'new') {
			const response = await fetch(`/models/jobpostings/${jobpostingId}`);
			if (response.status === 200) {
				setJobPosting(await response.json());//deserializam
			}
		}
	}
	useEffect(() => loadJobPosting(jobpostingId), [jobpostingId]);// sa se execute loodstudent cu studentId


	async function saveJobPosting() {
		if (jobpostingId === 'new') {
			//avem post(student noua)
			const response = await fetch('/models/jobpostings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jobPosting)
			});
			if (response.status === 201) {
				navigate('/');
			}
		} else {
            if (await window.confirm('Are you sure you want to change?')){
			const response = await fetch(`/models/jobpostings/${jobpostingId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jobPosting)
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
    }
	}
	async function deleteJobPosting() {
		if (jobpostingId && jobpostingId !== 'new'&& await window.confirm('Are sure want to delete?')){
			const response = await fetch(`/models/jobpostings/${jobpostingId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				navigate('/');
			}
		}
	}

	//pt onChange-- seteaza proprietatea name cu valoarea
	function set(property, value) {
		const record = {...jobPosting};//facem un record (clona a lui jobPosting) ca sa avem o noua adresa
		record[property] = value;
		setJobPosting(record);
	}
    var utc = new Date().toISOString().slice(0, 10);
	return (

<div>
		<div className="butoaneStart">
		<input type="button" className="butonAdd" value="Home"
						onClick={()=>navigate('/')}/>
		</div>
		<div className="form">
			<h1>JobPosting</h1>
			<form onSubmit={saveJobPosting} onReset={() => navigate('/')}>
				<label>Description<span>(at least 3 characters)</span></label>
				<input required type="text" minlength="3" value={jobPosting.description}
					onChange={event => set('description', event.target.value)}/>
					{/* trebuie sa am onChange altfel nu ma lasa sa editez */}
					{/* event.target.value e ce scrie in controlul respevctiv */}
                    <span></span>


                    <label>Deadline</label>
				<input required type="date" value={jobPosting.deadline} min={utc.toString()}
					onChange={event => set('deadline', event.target.value)}/>


				<div className="buttons">
					<input type="submit" value="Save"/>

					{/* delete e conditionat ca jobul  sa existe deja */}
					{jobpostingId && jobpostingId !== 'new' && <input type="button" className="delete"
						value="Delete" onClick={deleteJobPosting}/>}


					<input type="reset" value="Cancel"/>
					{/* pe onClick pot pune navigate('/') */}


				</div>
			</form>
			{/* <div id="dialog" className="modal-dialog"/> */}
		</div>		
		</div>
	);
}

export default JobPostingForm;
import Sequelize from "sequelize";
import { JobPosting, Candidate } from './repository.mjs';

//filtrare

function where(request){
	if(request.query.filter){
		return request.query.filter.split(',').reduce((filter,condition)=>{
			let data=condition.split('-');
			filter[data[0]]={[Sequelize.Op[data[1]]]:data[2]};
			return filter;
		},{})
	}
	else{
		return undefined
	}
}
//sortare crescator/descrescator
function order(request){
	if(request.headers['x-sort']){
		return request.headers['x-sort'].split(',').reduce((sort,field)=>{
			sort.push([field.substring(1),field.charAt(0) === '+' ? 'ASC':'DESC']);
			return sort;
		},[]);
	}
	else{
		return undefined;
	}
}

// function attributes(req){
//     if(req.headers['x-fields']){ //ce nu e standard trb prefixat cu x-
//         return  req.headers['x-fields'].split(',');
//     } else{
//         return undefined;
//     }
// }




// o functie pentru a obtine toate anunturile
async function getJobPostings(request, response) {
	try {
		const postings = await JobPosting.findAll({
			where: where(request),
			order:order(request)
			
		});//metoda findll() intoarce toate obiectele din colectie
		if (postings.length > 0) {//daca am  inregistrari
			response.status(200).json(postings);//serializez json in body rooms
		} else {
			response.status(204).send();//no content
		}
	} catch (error) {
		response.status(500).json(error);//erorile se serializeaza cu un status code
	}
}
async function getJobPosting(request, response) {
	try {
		if (request.params.id) {
			const posting = await JobPosting.findByPk(request.params.id);
			if (posting) {
				response.json(posting);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function addJobPosting(request, response) {
	try {
		if (request.body.description
			&& request.body.deadline ) {//verificam daca ce vine din client e ok
			await JobPosting.create(request.body);//il creez
			response.status(201).send();
		} else {
			response.status(400).send();//daca nu e valid-> bad request
		}
	} catch (error) {
		response.status(500).json(error);
	}
}
async function savePosting(request, response) {
	try {
		const posting = await JobPosting.findByPk(request.params.id);
		if (posting) {
			Object.entries(request.body).forEach(([name, value]) => posting[name] = value);
			await posting.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}
async function removeJobPosting(request, response) {
	try {
		if (request.params.id) {
			const posting = await JobPosting.findByPk(request.params.id);
			if (posting) {
				await posting.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function getCandidates(request, response) {
	try {
		const candidates = await Candidate.findAll({
			where: request.query.jobpostingId
				? {jobpostingId: {[Sequelize.Op.eq]: request.query.jobpostingId}}
				: undefined,
			//   attributes: ['id', 'name', 'cv', 'email','jobpostingId']
			order:order(request)

		});
		if (candidates.length > 0) {
			response.status(200).json(candidates);
		} else {
			response.status(204).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}
async function getCandidate(request, response) {
	try {
		if (request.params.id) {
			const candidate = await Candidate.findByPk(request.params.id);
			if (candidate) {
				response.json(candidate);
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function addCandidate(request, response) {
	try {
		if (request.body.name
			&& request.body.cv
			&& request.body.email
			&& request.body.jobpostingId) {
			await Candidate.create(request.body);
			response.status(201).send();
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function saveCandidate(request, response) {
	try {
		const candidate = await Candidate.findByPk(request.params.id);
		if (candidate) {
			Object.entries(request.body).forEach(([name, value]) => candidate[name] = value);
			await candidate.save();
			response.status(204).send();
		} else {
			response.status(404).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

async function removeCandidate(request, response) {
	try {
		if (request.params.id) {
			const candidate = await Candidate.findByPk(request.params.id);
			if (candidate) {
				await candidate.destroy();
				response.status(204).send();
			} else {
				response.status(404).send();
			}
		} else {
			response.status(400).send();
		}
	} catch (error) {
		response.status(500).json(error);
	}
}

export{getJobPostings,addJobPosting,getJobPosting,savePosting,removeJobPosting,
    getCandidates,addCandidate,getCandidate,saveCandidate,removeCandidate}
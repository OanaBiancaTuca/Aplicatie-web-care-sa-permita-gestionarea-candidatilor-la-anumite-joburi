import express from 'express';
import{getJobPostings,addJobPosting,getJobPosting,savePosting,removeJobPosting,
getCandidates,addCandidate,getCandidate,saveCandidate,removeCandidate} from './service.mjs';

const router=express.Router();

//tot ce tine de jobPosting
router.route('/jobpostings')// toate apelurile care apartin de jobpostings
	.get((request, response) => getJobPostings(request, response))// primesc ub request si un response
	.post((request, response) => addJobPosting(request, response));



router.route('/jobpostings/:id')
	.get((request, response) => getJobPosting(request, response))
	.patch((request, response) => savePosting(request, response))//patch--update
	.delete((request, response) => removeJobPosting(request, response));

router.route('/candidates')
	.get((request, response) => getCandidates(request, response))
	.post((request, response) => addCandidate(request, response));


router.route('/candidates/:id')
	.get((request, response) => getCandidate(request, response))
	.patch((request, response) => saveCandidate(request, response))
	.delete((request, response) => removeCandidate(request, response));

    export default router;
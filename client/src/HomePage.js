//punct de intrare 

import {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import JobLine from './JobLine';

function Home() {//functie pentru componenta bord

//afisez linii care sa contina numele joburilor si candidatii care au aplicat pentru fiecare dintre aceasta

//useState stie sa-mi initializeze componenta

const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);//o lista vida

  const loadJobPostings = async () => {
    const response = await fetch ('/models/jobpostings');
    if (response.status === 200) {//statusul setat de noi 200 
      setJobPostings(await response.json());
    }
  };
  useEffect(() => loadJobPostings(), []);

  return (
    <div>   	
    <div className="butoaneStart">
    <input type="button" className="butonAdd" value="Home"
					onClick={()=>navigate('/')}/>
        	<input type="button" className="butonAdd" value="Add jobPosting"
					onClick={()=>navigate('jobpostings/new')}/> 
          	<input type="button" className="butonAdd" value="Add candidate"
					onClick={()=>navigate('candidates/*/new')}/> 
           
    </div>
  
  <div className="container">
    {
      jobPostings.map((jobPosting, index) => <JobLine key={index} jobPosting={jobPosting} index={index} height={100 / jobPosting.length - 1} />)
 
    }
  </div>
  </div>
  )
}
export default Home;

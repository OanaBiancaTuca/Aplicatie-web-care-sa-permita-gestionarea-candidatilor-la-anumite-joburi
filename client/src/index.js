import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import CandidateForm from './CandidateForm';
import CandidateForm2 from './GeneralCandidateForm';
import Home from './HomePage';
import JobPostingForm from './JobPostingForm';
import './index.css';



ReactDOM.render(

  <HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobpostings/:jobpostingId" element={<JobPostingForm />} />
    <Route path="/candidates/:candidateId" element={<CandidateForm />} />
    <Route path="/candidates/*/:candidateId/" element={<CandidateForm2 />} />

  </Routes>
</HashRouter>,
  document.getElementById('root')
);


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosisResult, setDiagnosisResult] = useState('');

  // Fetch symptoms from symptoms.json on component mount
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get('/symptoms.json?url');
        setSymptoms(response.data.symptoms);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleSymptomSelect = (symptom) => {
    if (!selectedSymptoms.some((s) => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSymptomRemove = (symptomId) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s.id !== symptomId));
  };

  const handleDiagnose = () => {
    // Simulate diagnosis based on selected symptoms
    const selectedSymptomNames = selectedSymptoms.map((symptom) => symptom.name);
    const diagnosedConditions = simulateDiagnosis(selectedSymptomNames);

    setDiagnosisResult(diagnosedConditions.join(', ')); // Update diagnosis result
  };

  const simulateDiagnosis = (selectedSymptoms) => {
    // Simulate diagnosis logic based on symptoms (replace with actual logic or API call)
    const matchedSymptoms = symptoms.filter((symptom) =>
      selectedSymptoms.includes(symptom.name)
    );
    let relatedConditions = new Set();
    matchedSymptoms.forEach((symptom) =>
      symptom.related_conditions.forEach((condition) => relatedConditions.add(condition))
    );
    return Array.from(relatedConditions);
  };

  if (!symptoms || symptoms.length === 0) {
    return <p>Loading symptoms...</p>;
  }

  return (
    <div>
      <h2>Symptom Checker</h2>
      <ul>
        {symptoms.map((symptom) => (
          <li key={symptom.id}>
            <button onClick={() => handleSymptomSelect(symptom)}>
              {symptom.name}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Selected Symptoms:</h3>
        <ul>
          {selectedSymptoms.map((symptom) => (
            <li key={symptom.id}>
              {symptom.name} 
              <button onClick={() => handleSymptomRemove(symptom.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleDiagnose}>Diagnose</button>
      </div>
      {diagnosisResult && (
        <div>
          <h3>Diagnosis Results:</h3>
          <p>{diagnosisResult}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;

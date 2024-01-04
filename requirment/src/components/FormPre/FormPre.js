import React from 'react';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';

const FormPreview = () => {
  const location = useLocation();
  const values = location.state && location.state.values;


    console.log('Received formData in FormPreview:', values);

    function handleSubmit() {
      console.log(values);
      fetch("http://127.0.0.1:8000/api/form/", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${token}`,

          },

      })
          .then((res) => {
              console.log(res);
              if (res.status === 201) {
                  // document.getElementById("signForm").reset();
                  // setFlashMessage("Registration successful!");
                  // setTimeout(removeFlashMessage, 1000);
              } else if (res.status === 401) {
                  console.log("Unauthorized request");
                  // navigate("/");
              }
          })
          .catch((err) => {
              console.log(err);
          });
      console.log(values.image);
  }
  
    return (
        <>
        <Header/>
        
       
     <div>
       <h2>Form Preview</h2>
       <p>Post: {values.post}</p>
       <p>Applicant Name: {values.applicantName}</p>
       <p>Father Name: {values.fatherName}</p>
       <p>Date of Birth: {values.dob}</p>
       <p>Correspondent Address: {values.correspondentAddress}</p>
       <p>Permanent Address: {values.permanentAddress}</p>
       <p>Mobile Number: {values.mobileNumber}</p>
       <p>Email: {values.email}</p>
       <p>Nationality: {values.nationality}</p>

       <h3>Education</h3>
       {values.education.map((edu, index) => (
        <div key={index}>
          <p>Education: {edu.education}</p>
          <p>Board/University: {edu.boardUniversity}</p>
          <p>Passing Year: {edu.passingYear}</p>
          <p>Percentage: {edu.percentage}</p>
        </div>
      ))}

      <h3>Experience</h3>
      {values.experience.map((exp, index) => (
        <div key={index}>
          <p>Organization: {exp.organization}</p>
          <p>Years: {exp.years}</p>
          <p>Remarks: {exp.remarks}</p>
        </div>
      ))}

      <p>Category: {values.category}</p>
      <p>Gender: {values.gender}</p>
      <p>Physically Challenged: {values.isPhysicallyChallenged ? 'Yes' : 'No'}</p>

      <h3>Image Preview</h3>
      {values.image && <img src={URL.createObjectURL(values.image)} alt="Selected Image" />}

      <h3>Signature Preview</h3>
      {values.signature && <img src={URL.createObjectURL(values.signature)} alt="Selected Signature" />}

       <div>
        <h3>Declaration</h3>
         <p>
           I hereby declare that the information provided in this form is true, complete, and accurate to the best of my
          knowledge. I understand that any false statement or omission may result in disqualification from consideration
           or, if already employed, in disciplinary action, up to and including termination.
         </p>
         <p>
           I further understand that submission of this form does not guarantee acceptance or approval, and decisions
           will be made based on the criteria specified by the Organization.
         </p>
         
       </div>
     </div>
     <button onClick={handleSubmit()}>Submit</button>
    </>
  );
};

export default FormPreview;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../Header/Header';
import './JobForm.css';
import FormPreview from '../FormPre/FormPre';
import { useNavigate } from 'react-router-dom';
const initialValues = {
  post: '',
  applicantName: '',
  fatherName: '',
  dob: '',
  correspondentAddress: '',
  permanentAddress: '',
  mobileNumber: '',
  email: '',
  nationality: '',
  education: [
    { education: '', boardUniversity: '', passingYear: '', percentage: '' },
    { education: '', boardUniversity: '', passingYear: '', percentage: '' },
    { education: '', boardUniversity: '', passingYear: '', percentage: '' },
  ],
  experience: [
    { organization: '', years: '', remarks: '' },
    { organization: '', years: '', remarks: '' },
    { organization: '', years: '', remarks: '' },
  ],
  category: '',
  gender: '',
  isPhysicallyChallenged: false,
  image: null,
  signature: null,
  declaration: false,
};

const validationSchema = Yup.object({
  post: Yup.string().required('Required'),
  applicantName: Yup.string().required('Required'),
  fatherName: Yup.string().required('Required'),
  dob: Yup.date().required('Required'),
  correspondentAddress: Yup.string().required('Required'),
  permanentAddress: Yup.string().required('Required'),
  mobileNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  nationality: Yup.string().required('Required'),
  education: Yup.array().of(
    Yup.object().shape({
      education: Yup.string().required('Required'),
      boardUniversity: Yup.string().required('Required'),
      passingYear: Yup.number().required('Required'),
      percentage: Yup.number().required('Required'),
    })
  ).min(1, 'At least one education entry is required'), // Ensure at least one education entry
  experience: Yup.array().of(
    Yup.object().shape({
      organization: Yup.string().required('Required'),
      years: Yup.number().required('Required'),
      remarks: Yup.string().required('Required'),
    })
  ).min(1, 'At least one experience entry is required'), // Ensure at least one experience entry
  category: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  isPhysicallyChallenged: Yup.boolean().oneOf([true, false], 'Required'),
  image: Yup.mixed().required('Required'),
  signature: Yup.mixed().required('Required'),
  declaration: Yup.boolean().oneOf([true, false], 'You must accept the terms and conditions'),
});


const JobApplicationForm = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values,{ resetForm }) => {
      fetch("http://127.0.0.1:8000/api/job-application/", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,

          },

      })
          .then((res) => {
              console.log(res);
              if (res.status === 201) {
                  // document.getElementById("signForm").reset();
                  // setFlashMessage("Registration successful!");
                  // setTimeout(removeFlashMessage, 1000);
                  console.log('Form submitted:',values);
              } else if (res.status === 401) {
                  console.log("Unauthorized request");
                  // navigate("/");
              }
          })
          .catch((err) => {
              console.log(err);
          });

      // Send data to the server
        //  resetForm();
    },


  });
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values, { resetForm }) => {
//       console.log('Formik values:', formik.values);

// const formData = new FormData();

// // Append non-file values to FormData
// Object.keys(formik.values).forEach((key) => {
//   if (key === 'education' || key === 'experience') {
//     // Handle array fields (education and experience)
//     formik.values[key].forEach((item, index) => {
//       Object.keys(item).forEach((subKey) => {
//         formData.append(`${key}[${index}].${subKey}`, item[subKey]);
//       });
//     });
//   } else {
//     formData.append(key, formik.values[key]);
//   }
// });

// // Log FormData before sending
// console.log('FormData before sending:', formData);
      
//       fetch("http://127.0.0.1:8000/api/form/", {
//         method: "POST",
//         body: formData,
//         headers: {
//           // No need to set Content-Type, it will be set automatically for FormData
//           // "Content-Type": "multipart/form-data",
//           // "Authorization": `Bearer ${token}`,
//         },
//       })
//         .then((res) => {
//           console.log(res);
//           if (res.status === 201) {
//             console.log('Form submitted:', values);
//           } else if (res.status === 401) {
//             console.log("Unauthorized request");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//       resetForm();
//     },
//   });

  const handlePreview = () => {
    if (formik.isValid) {
      console.log('I am on submit');
      console.log(formik.values);
      // Redirect to the preview page and pass form values as state
      navigate('/preview', { state: { values: formik.values } });
    }
  };
  console.log('Formik errors:', formik.errors);
  return (
    <>
      <Header></Header>
      <div className='form-container'>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {/* Post */}
          <label htmlFor="post">Post</label>
          <select {...formik.getFieldProps('post')} onBlur={() => formik.setFieldTouched('post')}>
            <option value="" label="Select a post" />
            <option value="post1" label="Post 1" />
            <option value="post2" label="Post 2" />
            {/* Add other options */}
          </select>
          {formik.touched.post && formik.errors.post ? <div className="error">{formik.errors.post}</div> : null}

          {/* Applicant Name */}
          <label htmlFor="applicantName">Applicant Name</label>
          <input
            type="text"
            id="applicantName"
            {...formik.getFieldProps('applicantName')}
            onBlur={() => formik.setFieldTouched('applicantName')}
          />
          {formik.touched.applicantName && formik.errors.applicantName ? (
            <div className="error">{formik.errors.applicantName}</div>
          ) : null}

          {/* Father Name */}
          <label htmlFor="fatherName">Father Name</label>
          <input
            type="text"
            id="fatherName"
            {...formik.getFieldProps('fatherName')}
            onBlur={() => formik.setFieldTouched('fatherName')}
          />
          {formik.touched.fatherName && formik.errors.fatherName ? (
            <div className="error">{formik.errors.fatherName}</div>
          ) : null}

          {/* Date of Birth */}
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...formik.getFieldProps('dob')}
            onBlur={() => formik.setFieldTouched('dob')}
          />
          {formik.touched.dob && formik.errors.dob ? <div className="error">{formik.errors.dob}</div> : null}

          {/* Correspondent Address */}
          <label htmlFor="correspondentAddress">Correspondent Address</label>
          <input
            type="text"
            id="correspondentAddress"
            {...formik.getFieldProps('correspondentAddress')}
            onBlur={() => formik.setFieldTouched('correspondentAddress')}
          />
          {formik.touched.correspondentAddress && formik.errors.correspondentAddress ? (
            <div className="error">{formik.errors.correspondentAddress}</div>
          ) : null}

          {/* Permanent Address */}
          <label htmlFor="permanentAddress">Permanent Address</label>
          <input
            type="text"
            id="permanentAddress"
            {...formik.getFieldProps('permanentAddress')}
            onBlur={() => formik.setFieldTouched('permanentAddress')}
          />
          {formik.touched.permanentAddress && formik.errors.permanentAddress ? (
            <div className="error">{formik.errors.permanentAddress}</div>
          ) : null}

          {/* Mobile Number */}
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            {...formik.getFieldProps('mobileNumber')}
            onBlur={() => formik.setFieldTouched('mobileNumber')}
          />
          {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
            <div className="error">{formik.errors.mobileNumber}</div>
          ) : null}

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...formik.getFieldProps('email')}
            onBlur={() => formik.setFieldTouched('email')}
          />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

          {/* Nationality */}
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            {...formik.getFieldProps('nationality')}
            onBlur={() => formik.setFieldTouched('nationality')}
          />
          {formik.touched.nationality && formik.errors.nationality ? (
            <div className="error">{formik.errors.nationality}</div>
          ) : null}

          {/* Education */}
          <label>Education</label>
          {formik.values.education.map((edu, index) => (
            // Inside the map function for Education fields
            <div key={index} className="education-fields">
              {/* Education Input Fields */}
              <input
                type="text"
                placeholder="Education"
                {...formik.getFieldProps(`education[${index}].education`)}
                onBlur={() => formik.setFieldTouched(`education[${index}].education`)}
              />
              <input
                type="text"
                placeholder="Board/University"
                {...formik.getFieldProps(`education[${index}].boardUniversity`)}
                onBlur={() => formik.setFieldTouched(`education[${index}].boardUniversity`)}
              />
              <input
                type="number"
                placeholder="Passing Year"
                {...formik.getFieldProps(`education[${index}].passingYear`)}
                onBlur={() => formik.setFieldTouched(`education[${index}].passingYear`)}
              />
              <input
                type="number"
                placeholder="Percentage"
                {...formik.getFieldProps(`education[${index}].percentage`)}
                onBlur={() => formik.setFieldTouched(`education[${index}].percentage`)}
              />

              {/* Display Validation Errors */}
              {/* {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.education}</div>
              ) : null}
              {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.boardUniversity}</div>
              ) : null}
              {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.passingYear}</div>
              ) : null}
              {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.percentage}</div>
              ) : null} */}
            </div>

          ))}

          {/* Experience */}
          <label>Experience</label>
          {formik.values.experience.map((exp, index) => (
            <div key={index} className="education-fields">
              <input
                type="text"
                placeholder="Organization"
                {...formik.getFieldProps(`experience[${index}].organization`)}
                onBlur={() => formik.setFieldTouched(`experience[${index}].organization`)}
              />
              <input
                type="number"
                placeholder="Years"
                {...formik.getFieldProps(`experience[${index}].years`)}
                onBlur={() => formik.setFieldTouched(`experience[${index}].years`)}
              />
              <input
                type="text"
                placeholder="Remarks"
                {...formik.getFieldProps(`experience[${index}].remarks`)}
                onBlur={() => formik.setFieldTouched(`experience[${index}].remarks`)}
              />
              {/* {formik.touched.experience && formik.errors.experience ? (
                <div>{formik.errors.experience[index]?.organization}</div>
              ) : null}
              {formik.touched.experience && formik.errors.experience ? (
                <div>{formik.errors.experience[index]?.years}</div>
              ) : null}
              {formik.touched.experience && formik.errors.experience ? (
                <div>{formik.errors.experience[index]?.remarks}</div>
              ) : null} */}
            </div>
          ))}

          {/* Category */}
          <div className="category-field">
            {/* Category Label */}
            <label htmlFor="category">Category</label>
            {/* Category Dropdown */}
            <select
              {...formik.getFieldProps('category')}
              onBlur={() => formik.setFieldTouched('category')}
            >
              <option value="" label="Select a category" />
              <option value="gen" label="General" />
              <option value="sc" label="SC" />
              <option value="st" label="ST" />
              <option value="ews" label="EWS" />
              <option value="ebc1" label="EBC-1" />
              <option value="ebc2" label="EBC-2" />
            </select>

            {/* Display Validation Errors */}
            {formik.touched.category && formik.errors.category ? (
              <div className="error">{formik.errors.category}</div>
            ) : null}
          </div>


          {/* Gender */}
          {/* // Inside the render code for Gender field */}
          <div className="gender-field">
            {/* Gender Label */}
            <label>Gender</label>

            {/* Gender Radio Buttons */}
            <div role="group" aria-labelledby="gender">
              <label>
                <input
                  type="radio"
                  {...formik.getFieldProps('gender')}
                  value="male"
                  checked={formik.values.gender === 'male'}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  {...formik.getFieldProps('gender')}
                  value="female"
                  checked={formik.values.gender === 'female'}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  {...formik.getFieldProps('gender')}
                  value="tg"
                  checked={formik.values.gender === 'tg'}
                />
                TG
              </label>
            </div>

            {/* Display Validation Errors */}
            {formik.touched.gender && formik.errors.gender ? (
              <div className="error" style={{ marginLeft: '15px' }}>{formik.errors.gender}</div>
            ) : null}
          </div>
          <div className="gender-field">
            {/* Physically Challenged */}
            <label>Physically Challenged</label>
            <div role="group" aria-labelledby="physicallyChallenged">
              <label>
                <input
                  type="radio"
                  {...formik.getFieldProps('isPhysicallyChallenged')}
                  value="true" // Use "true" and "false" as strings
                  checked={formik.values.isPhysicallyChallenged === "true"} // Check against "true" as string
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  {...formik.getFieldProps('isPhysicallyChallenged')}
                  value="false" // Use "true" and "false" as strings
                  checked={formik.values.isPhysicallyChallenged === "false"} // Check against "false" as string
                />
                No
              </label>
            </div>
            {formik.touched.isPhysicallyChallenged && formik.errors.isPhysicallyChallenged ? (
              <div className="error" style={{ marginLeft: '15px' }}>{formik.errors.isPhysicallyChallenged}</div>
            ) : null}
          </div>

          <hr></hr>
          {/* Image Upload */}

          <div className="image-field">
            {/* Image Upload */}
            <div className="file-upload">
              <label htmlFor="image" style={{}}>Image Upload</label>
              <input
                type="file"
                id="image"
                onChange={(event) => {
                  const selectedImage = event.currentTarget.files[0];
                  formik.setFieldValue('image', selectedImage);

                  // Display the selected image
                  if (selectedImage) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      document.getElementById('image-preview').src = e.target.result;
                    };
                    reader.readAsDataURL(selectedImage);
                  }
                }}
              />

              {/* Display selected image preview */}
              {formik.values.image && (
                <img
                  id="image-preview"
                  src=""
                  alt="Selected Image"
                  className="img-file-preview"
                />
              )}

              {/* Display Validation Errors */}
              {formik.touched.image && formik.errors.image ? (
                <div className="error">{formik.errors.image}</div>
              ) : null}
            </div>

            {/* Signature Upload */}
            <div className="file-upload">
              <label htmlFor="signature">Signature Upload</label>
              <input
                type="file"
                id="signature"
                onChange={(event) => {
                  const selectedSignature = event.currentTarget.files[0];
                  formik.setFieldValue('signature', selectedSignature);

                  // Display the selected signature
                  if (selectedSignature) {
                    const signatureReader = new FileReader();
                    signatureReader.onload = (e) => {
                      document.getElementById('signature-preview').src = e.target.result;
                    };
                    signatureReader.readAsDataURL(selectedSignature);
                  }
                }}
              />

              {/* Display selected signature preview */}
              {formik.values.signature && (
                <img
                  id="signature-preview"
                  src=""
                  alt="Selected Signature"
                  className="sig-file-preview"
                />
              )}

              {/* Display Validation Errors */}
              {formik.touched.signature && formik.errors.signature ? (
                <div className="error">{formik.errors.signature}</div>
              ) : null}
            </div>
          </div>

          <hr></hr>
          {/* Declaration */}
          <div style={{ display: 'flex', alignItems: 'start', margin: '16px' }}>

            <label>
              <span>
                <input
                  type="checkbox"
                  id="declaration"
                  {...formik.getFieldProps('declaration')}
                  checked={formik.values.declaration}
                />

              </span>

            </label><p style={{ marginLeft: '10px', fontWeight: 'bold' }}>
              I hereby declare that the information provided in this form is true, complete, and accurate to the best of my knowledge. I understand that any false statement or omission may result in disqualification from consideration or, if already employed, in disciplinary action, up to and including termination.
              <br />
              I further understand that submission of this form does not guarantee acceptance or approval, and decisions will be made based on the criteria specified by Organization.
            </p>

          </div>
          {formik.touched.declaration && formik.errors.declaration ? (
            <div className="error" >{formik.errors.declaration}</div>
          ) : null}
          <button type="submit">Submit</button>
          <button type="submit" onClick={handlePreview}>Preview</button>
        </form>

        {/* <button type="submit" onClick={handleSubmit}>Submit</button> */}
        {/* <button type="submit" >Submit</button> */}
      </div>
    </>
  );
};

export default JobApplicationForm;

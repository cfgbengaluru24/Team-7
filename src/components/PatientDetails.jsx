import React, { useState } from 'react';
import './Form.css';

import addFormData from ''

function PatientDetails() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bloodGroup: '',
    age: '',
    gender: '',
    pincode: '',
    haemoglobinValue: '',
    oralHealthIndex: '',
    prescription: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // To hold the uploaded image URL
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addFormData(formData);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setError('');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        bloodGroup: '',
        age: '',
        gender: '',
        pincode: '',
        haemoglobinValue: '',
        oralHealthIndex: '',
        prescription: '',
        image: null,
      });
      setImageUrl(null);
    }, 1000);
  };
  return (
    <div className="form-container">
      <h2>Patient Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="name-fields">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <div className="blood-age-fields">
            <div className="form-field">
              <label htmlFor="bloodGroup">Blood Group</label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <div className="haemoglobin-oral-fields">
            <div className="form-field">
              <label htmlFor="haemoglobinValue">Haemoglobin Value</label>
              <input
                type="number"
                id="haemoglobinValue"
                name="haemoglobinValue"
                value={formData.haemoglobinValue}
                onChange={handleChange}
                min="0" // Ensure the value cannot go below 0
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="oralHealthIndex">Oral Health Index</label>
              <input
                type="number"
                id="oralHealthIndex"
                name="oralHealthIndex"
                value={formData.oralHealthIndex}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="prescription">Prescription</label>
          <textarea
            id="prescription"
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {imageUrl && <img src={imageUrl} alt="Uploaded" className="uploaded-image" />}
        </div>
        {/* <button>
            Audio Inputy
        </button> */}
        <button type="submit">
        Submit
        </button>
      </form>
      {/* {submissionSuccess && <p className="success-message">Your details have been submitted successfully!</p>} */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
export default PatientDetails;
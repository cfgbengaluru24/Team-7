import React, { useState } from 'react';
import addFormData from './addFormData';

function Profile() {
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

    if (name === 'image') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
      setImageUrl(URL.createObjectURL(file));
    }
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Patient Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4 flex space-x-2">
          <div className="w-1/2">
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4 flex space-x-2">
          <div className="w-1/2">
            <label htmlFor="haemoglobinValue" className="block text-sm font-medium text-gray-700">Haemoglobin Value</label>
            <input
              type="number"
              id="haemoglobinValue"
              name="haemoglobinValue"
              value={formData.haemoglobinValue}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="oralHealthIndex" className="block text-sm font-medium text-gray-700">Oral Health Index</label>
            <input
              type="number"
              id="oralHealthIndex"
              name="oralHealthIndex"
              value={formData.oralHealthIndex}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Prescription</label>
          <textarea
            id="prescription"
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 max-h-40" />}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submissionSuccess && <p className="mt-4 text-green-600">Your details have been submitted successfully!</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default Profile;

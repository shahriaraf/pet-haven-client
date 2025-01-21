import React, { useState } from "react";
import axios from "axios";

const CreateDonationCampaign = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    petPicture: null,
    maxDonationAmount: "",
    lastDate: "",
    shortDescription: "",
    longDescription: "",
  });

  const [uploading, setUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, petPicture: e.target.files[0] });
  };

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!formData.petPicture) return null;

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
    const uploadPreset = "YOUR_UPLOAD_PRESET";

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", formData.petPicture);
    formDataToUpload.append("upload_preset", uploadPreset);

    setUploading(true);
    try {
      const response = await axios.post(cloudinaryUrl, formDataToUpload);
      setUploading(false);
      return response.data.secure_url; // URL of the uploaded image
    } catch (error) {
      setUploading(false);
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Cloudinary
    const petPictureUrl = await uploadImage();

    if (!petPictureUrl) {
      alert("Failed to upload the image. Please try again.");
      return;
    }

    // Add date and time of creation
    const createdAt = new Date().toISOString();

    // Data to send to the database
    const donationData = {
      petPicture: petPictureUrl,
      maxDonationAmount: formData.maxDonationAmount,
      lastDate: formData.lastDate,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      createdAt,
    };

    // Send data to the database
    try {
      const response = await axios.post("http://localhost:5000/create-donation-campaigns", donationData);
      alert("Donation campaign created successfully!");
      console.log("Response:", response.data);
      setFormData({
        petPicture: null,
        maxDonationAmount: "",
        lastDate: "",
        shortDescription: "",
        longDescription: "",
      });
    } catch (error) {
      console.error("Failed to create donation campaign:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4" style={{ color: "#6d165D" }}>
        Create Donation Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pet Picture */}
        <div>
          <label className="block mb-2 font-semibold">Pet Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Maximum Donation Amount */}
        <div>
          <label className="block mb-2 font-semibold">Maximum Donation Amount</label>
          <input
            type="number"
            name="maxDonationAmount"
            value={formData.maxDonationAmount}
            onChange={handleChange}
            placeholder="Enter maximum amount"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Last Date */}
        <div>
          <label className="block mb-2 font-semibold">Last Date of Donation</label>
          <input
            type="date"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-2 font-semibold">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Enter a short description"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-2 font-semibold">Long Description</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            placeholder="Enter a detailed description"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-[#6d165D] text-white px-4 py-2 rounded hover:bg-[#ECA511] transition"
          >
            {uploading ? "Uploading..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationCampaign;

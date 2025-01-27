import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AxiosPublic from "./Hooks/axiosPublic";
import { AuthContext } from "./Provider/Authprovider";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const EditDonation = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Assumes the donation ID is passed as a route parameter
  const axiosPublic = AxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the donation data to pre-fill the form
    const fetchDonationData = async () => {
      try {
        const response = await axiosPublic.get(`/donations/${id}`);
        const data = response.data;
        if (data) {
          setValue("petName", data.petName);
          setValue("maxDonationAmount", data.maxDonationAmount);
          setValue("lastDate", new Date(data.lastDate).toISOString().split("T")[0]);
          setValue("shortDescription", data.shortDescription);
          setValue("longDescription", data.longDescription);
          setImageUrl(data.petPicture);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
        setLoading(false);
      }
    };

    fetchDonationData();
  }, [id, setValue, axiosPublic]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosPublic.post(imageHostingAPI, formData);
      setImageUrl(response.data.data.display_url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        petName: data.petName,
        petPicture: imageUrl,
        maxDonationAmount: parseFloat(data.maxDonationAmount),
        lastDate: new Date(data.lastDate),
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
      };

      const response = await axiosPublic.patch(`/update-donation/${id}`, updatedData);

      if (response.status === 200) {
        alert("Donation campaign updated successfully!");
      } else {
        alert("Failed to update donation campaign.");
      }
    } catch (error) {
      console.error("Error updating donation campaign:", error);
      alert("Failed to update donation campaign. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 mt-32 mb-8 bg-slate-100 shadow-lg shadow-gray-400 text-black rounded-lg"
    >
      {/* Pet Picture */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Picture:</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg text-black"
        />
        {imageUrl && (
          <p className="text-green-600 mt-2">Image uploaded successfully!</p>
        )}
      </div>

      {/* Maximum Donation Amount */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Maximum Donation Amount:
        </label>
        <input
          type="number"
          {...register("maxDonationAmount", { required: true })}
          placeholder="Maximum Donation Amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        />
      </div>

      {/* Pet Name */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Name:</label>
        <input
          type="text"
          {...register("petName", { required: true })}
          placeholder="Enter the pet's name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        />
      </div>

      {/* Last Date of Donation */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Last Date of Donation:
        </label>
        <input
          type="date"
          {...register("lastDate", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        />
      </div>

      {/* Short Description */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Short Description:
        </label>
        <input
          type="text"
          {...register("shortDescription", { required: true })}
          placeholder="Short Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        />
      </div>

      {/* Long Description */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Long Description:
        </label>
        <textarea
          {...register("longDescription", { required: true })}
          placeholder="Long Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-[#ECA511] text-[#6d165D] font-semibold rounded-lg hover:bg-[#6d165D] hover:text-[#ECA511] transition duration-300"
      >
        Update Donation Campaign
      </button>
    </form>
  );
};

export default EditDonation;

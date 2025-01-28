import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AxiosPublic from "./Hooks/axiosPublic";
import { AuthContext } from "./Provider/Authprovider";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const CreateDonationCampaign = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const axiosPublic = AxiosPublic();
  const { user } = useContext(AuthContext);

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
    if (!imageUrl) {
      alert("Please upload a pet image!");
      return;
    }

    try {
      const campaignData = {
        petName: data.petName,
        petPicture: imageUrl,
        maxDonationAmount: parseFloat(data.maxDonationAmount),
        lastDate: new Date(data.lastDate),
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        userEmail: user.email
      };

      const response = await fetch(
        "https://pet-haven-server-sigma.vercel.app/create-donation-campaigns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campaignData),
        }
      );

      if (response.ok) {
        alert("Donation campaign created successfully!");
        reset();
        setImageUrl("");
      } else {
        const result = await response.json();
        alert(result.error || "Failed to create donation campaign.");
      }
    } catch (error) {
      console.error("Error creating donation campaign:", error);
      alert("Failed to create donation campaign. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-4xl max-w-[330px] mx-auto p-8 mt-10 mb-8 bg-slate-100 shadow-lg shadow-gray-400 text-black rounded-lg"
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
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-[#ECA511] text-[#6d165D] font-semibold rounded-lg hover:bg-[#6d165D] hover:text-[#ECA511] transition duration-300"
      >
        Create Donation Campaign
      </button>
    </form>
  );
};

export default CreateDonationCampaign;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";


import AxiosPublic from "./Hooks/axiosPublic";
import { AuthContext } from "./Provider/Authprovider";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPet = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const axiosPublic = AxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user);

  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "reptile", label: "Reptile" },
    { value: "other", label: "Other" },
  ];

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosPublic.post(image_hosting_api,
        formData
      );
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
      const petData = {
        petImage: imageUrl,
        petName: data.petName,
        userEmail: user.email,
        petAge: data.petAge,
        petLocation: data.petLocation,
        petCategory: data.petCategory.value,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,

      };

      const response = await fetch("https://pet-haven-server-sigma.vercel.app/add-pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        alert("Pet added successfully!");
        reset();
        setImageUrl("");
      } else {
        const result = await response.json();
        alert(result.error || "Failed to add pet.");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 mt-10 mb-8 bg-slate-100 shadow-lg shadow-gray-400 text-black rounded-lg"
    >

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Image:</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg text-black"
        />
        {imageUrl && (
          <p className="text-green-600 mt-2">Image uploaded successfully!</p>
        )}
      </div>

      <div className="flex gap-6 mb-6">
        {/* Pet Name */}
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Pet Name:</label>
          <input
            type="text"
            {...register("petName", { required: true })}
            placeholder="Pet Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Email:</label>
          <input
            value={user.email}
            type="email"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
        </div>

        {/* Pet Age */}
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Pet Age:</label>
          <input
            type="text"
            {...register("petAge", { required: true })}
            placeholder="Pet Age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
        </div>
      </div>

      <div className="flex gap-6 mb-6">
        {/* Pet Category */}
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Pet Category:</label>
          <Select
            options={petCategories}
            onChange={(option) => setValue("petCategory", option)}
            className="w-full border border-gray-300 rounded-lg text-black"
          />
        </div>

        {/* Pet Location */}
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Pet Location:</label>
          <input
            type="text"
            {...register("petLocation", { required: true })}
            placeholder="Pet Location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
        </div>
      </div>


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
        Add Pet
      </button>
    </form>
  );
};

export default AddPet;

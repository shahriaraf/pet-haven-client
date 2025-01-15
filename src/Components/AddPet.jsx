import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";

const AddPet = () => {
  const [imageUrl, setImageUrl] = useState("");
  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "reptile", label: "Reptile" },
    { value: "other", label: "Other" },
  ];

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
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
      const response = await fetch("http://localhost:5000/add-pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          petCategory: data.petCategory.value,
          petImage: imageUrl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Pet added successfully!");
        setValue("petName", "");
        setValue("petAge", "");
        setValue("petLocation", "");
        setValue("shortDescription", "");
        setValue("longDescription", "");
        setImageUrl("");
      } else {
        alert(result.error || "Failed to add pet. Please try again.");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-8 mt-36 mb-8 bg-[#6d165D] text-white shadow-lg rounded-lg">
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Image:</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        {imageUrl && <p className="text-green-600 mt-2">Image uploaded successfully!</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Name:</label>
        <Controller
          name="petName"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Pet Name"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />
          )}
        />
        {errors.petName && <p className="text-red-500 mt-1 text-sm">{errors.petName.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Age:</label>
        <Controller
          name="petAge"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Pet Age"
              className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg"
            />
          )}
        />
        {errors.petAge && <p className="text-red-500 mt-1 text-sm">{errors.petAge.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Category:</label>
        <Controller
          name="petCategory"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={petCategories}
              onChange={(option) => setValue("petCategory", option)}
              className="w-full border text-black border-gray-300 rounded-lg"
            />
          )}
        />
        {errors.petCategory && <p className="text-red-500 mt-1 text-sm">{errors.petCategory.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Pet Location:</label>
        <Controller
          name="petLocation"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Pet Location"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />
          )}
        />
        {errors.petLocation && <p className="text-red-500 mt-1 text-sm">{errors.petLocation.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Short Description:</label>
        <Controller
          name="shortDescription"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Short Description About Pet"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />
          )}
        />
        {errors.shortDescription && <p className="text-red-500 mt-1 text-sm">{errors.shortDescription.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Long Description:</label>
        <Controller
          name="longDescription"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Long Description About Pet"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
            />
          )}
        />
        {errors.longDescription && <p className="text-red-500 mt-1 text-sm">{errors.longDescription.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-[#ECA511] text-[#6d165D] hover:text-[#ECA511] font-semibold rounded-lg hover:bg-[#440a39] transition duration-300"
      >
        {errors ? "Submitting..." : "Add Pet"}
      </button>
    </form>
  );
};

export default AddPet;

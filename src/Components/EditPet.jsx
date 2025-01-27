import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import AxiosPublic from "./Hooks/axiosPublic";
import { AuthContext } from "./Provider/Authprovider";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const EditPet = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Assumes pet ID is passed as a route parameter
  const axiosPublic = AxiosPublic();
  const { user } = useContext(AuthContext);

  const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "reptile", label: "Reptile" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axiosPublic.get(`/pets/${id}`);
        const data = response.data;
        if (data) {
          setValue("petName", data.petName);
          setValue("petAge", data.petAge);
          setValue("petLocation", data.petLocation);
          setValue("shortDescription", data.shortDescription);
          setValue("longDescription", data.longDescription);
          setValue(
            "petCategory",
            petCategories.find((category) => category.value === data.petCategory)
          );
          setImageUrl(data.petImage);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setLoading(false);
      }
    };

    fetchPetData();
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
        petImage: imageUrl,
        petName: data.petName,
        userEmail: user.email,
        petAge: data.petAge,
        petLocation: data.petLocation,
        petCategory: data.petCategory.value,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
      };

      const response = await fetch(`https://pet-haven-server-sigma.vercel.app/update-pet/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Pet updated successfully!");
      } else {
        const result = await response.json();
        alert(result.error || "Failed to update pet.");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
      alert("Failed to update pet. Please try again.");
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
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Pet Category:</label>
          <Select
            options={petCategories}
            onChange={(option) => setValue("petCategory", option)}
            defaultValue={petCategories.find((category) => category.value === "other")}
            className="w-full border border-gray-300 rounded-lg text-black"
          />
        </div>

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
        Update Pet
      </button>
    </form>
  );
};

export default EditPet;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  // Fetch pets data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:5000/pets');
        const data = await response.json();
        const unadoptedPets = data.filter((pet) => !pet.adopted);
        setPets(unadoptedPets);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      }
    };

    fetchPets();
  }, []);

  // Filter pets based on search term and category
  useEffect(() => {
    let filtered = pets;

    if (searchTerm) {
      filtered = filtered.filter((pet) =>
        pet.petName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((pet) => pet.petCategory === categoryFilter);
    }

    // Sort pets by date in descending order (assuming pets have a `dateAdded` field)
    filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    setFilteredPets(filtered);
  }, [pets, searchTerm, categoryFilter]);

  return (
    <div className="max-w-7xl mx-auto p-6 pt-36">
      <h1 className="text-3xl font-bold text-[#6d165D] text-center mb-12">Available Pets</h1>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="w-1/2 p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="px-3 py-1 border rounded-full "
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Reptile">Reptile</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <div key={pet._id} className="bg-slate-100 shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
            <img
              src={pet.petImage}
              alt={pet.petName}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{pet.petName}</h2>
              <p className="text-gray-600">Age: {pet.petAge}</p>
              <p className="text-gray-600">Location: {pet.petLocation}</p>
              <div className="mt-4">
                <Link to={`/pets/${pet._id}`}><button
                  className="w-full py-2 bg-[#6d165D] text-white rounded-lg hover:text-[#6d165D] hover:bg-[#ECA511] transition duration-300"
                >
                  View Details
                </button></Link> 
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;

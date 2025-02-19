import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from './Skeleton/CardSkeleton';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pets data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('https://pet-haven-server-sigma.vercel.app/pets');
        const data = await response.json();
        const unadoptedPets = data.filter((pet) => !pet.adopted);
        setPets(unadoptedPets);
        setLoading(false);
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

  if (loading) return <CardSkeleton></CardSkeleton>

  return (
    <div className="max-w-7xl mx-auto p-6 pt-36">

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="w-1/2 p-2 border rounded-lg bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="px-3 py-1 bg-transparent border rounded-full "
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option className='bg-transparent' value="">All Categories</option>
          <option className='bg-transparent' value="Dog">Dog</option>
          <option className='bg-transparent' value="Cat">Cat</option>
          <option className='bg-transparent' value="Bird">Bird</option>
          <option className='bg-transparent' value="Reptile">Reptile</option>
          <option className='bg-transparent' value="Other">Other</option>
        </select>
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 card sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <div key={pet._id} className="shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
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

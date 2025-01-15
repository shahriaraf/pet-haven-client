import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const Petlist = ({ user }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [selectedPet, setSelectedPet] = useState(null); // Modal state
    const { ref, inView } = useInView();

    // Fetch pets using TanStack Query
    const fetchPets = async ({ pageParam = 1 }) => {
        const response = await axios.get('/pets', {
            params: { page: pageParam, limit: 10, search, category },
        });
        return response.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['pets', { search, category }],
        queryFn: fetchPets,
        getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length + 1 : undefined),
    });

    // Fetch next page when in view
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    // Handle modal submission
    const handleAdoptionSubmit = async (formData) => {
        try {
            await axios.post('/adopt', formData);
            alert('Adoption request submitted successfully!');
            setSelectedPet(null); // Close modal
        } catch (error) {
            console.error('Failed to submit adoption request:', error);
            alert('Failed to submit the adoption request.');
        }
    };

    return (
        <div className="petlist-container">
            {/* Search and Filter */}
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">All Categories</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>
            </div>

            {/* Pet Grid */}
            <div className="pet-grid">
                {data?.pages.flatMap((page) =>
                    page.map((pet) => (
                        <div key={pet.id} className="pet-card">
                            <img src={pet.image} alt={pet.name} />
                            <h3>{pet.name}</h3>
                            <p>Age: {pet.age}</p>
                            <p>Location: {pet.location}</p>
                            <button onClick={() => setSelectedPet(pet)}>Adopt</button>
                        </div>
                    ))
                )}
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={ref} className="loader">
                {isFetchingNextPage && <p>Loading more pets...</p>}
            </div>

            {/* Modal */}
            {selectedPet && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adopt {selectedPet.name}</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = {
                                    petId: selectedPet.id,
                                    petName: selectedPet.name,
                                    petImage: selectedPet.image,
                                    userName: user.name,
                                    userEmail: user.email,
                                    phone: e.target.phone.value,
                                    address: e.target.address.value,
                                };
                                handleAdoptionSubmit(formData);
                            }}
                        >
                            <div className="modal-info">
                                <img src={selectedPet.image} alt={selectedPet.name} />
                                <p>Pet ID: {selectedPet.id}</p>
                                <p>Name: {selectedPet.name}</p>
                                <p>User Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                required
                            />
                            <textarea
                                name="address"
                                placeholder="Address"
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setSelectedPet(null)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Petlist;

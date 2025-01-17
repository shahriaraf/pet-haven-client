import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Donation = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1); // Current page for infinite scrolling
  const [hasMore, setHasMore] = useState(true); // Flag to check if more campaigns can be loaded
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/donation-campaigns?page=${page}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // Stop fetching if no more campaigns are available
      } else {
        setCampaigns((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Failed to fetch donation campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial campaigns
  useEffect(() => {
    fetchCampaigns(page);
  }, [page]);

  // Infinite scrolling event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="max-w-7xl mx-auto p-6 pt-36">
      <h1 className="text-3xl font-bold text-[#6d165D] text-center mb-12">Donation Campaigns</h1>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-slate-100 shadow-lg shadow-gray-400 rounded-lg overflow-hidden"
          >
            <img
              src={campaign.petImage}
              alt={campaign.petName}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{campaign.petName}</h2>
              <p className="text-gray-600">
                <strong>Max Donation:</strong> ${campaign.maxDonationAmount}
              </p>
              <p className="text-gray-600">
                <strong>Donated:</strong> ${campaign.donatedAmount}
              </p>
              <div className="mt-4">
                <Link to={`/campaigns/${campaign._id}`}>
                  <button className="w-full py-2 bg-[#6d165D] text-white rounded-lg hover:text-[#6d165D] hover:bg-[#ECA511] transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center mt-6">Loading...</div>}

      {/* No More Campaigns */}
      {!hasMore && !loading && (
        <div className="text-center mt-6 text-gray-500">No more campaigns available.</div>
      )}
    </div>
  );
};

export default Donation;

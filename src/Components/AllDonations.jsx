import { useState, useEffect } from "react";
import AxiosSecure from "./Hooks/AxiosSecure";
import "react-loading-skeleton/dist/skeleton.css";
import TableSkeleton from "./Skeleton/TableSkeleton";

const AllDonations = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = AxiosSecure();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axiosSecure.get("/admin/donation-campaigns");
        setCampaigns(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching donation campaigns:", error);
        setError("Failed to fetch campaigns. Please try again.");
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/admin/donation-campaigns/${id}`);
      setCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign._id !== id)
      );
      alert("Donation campaign deleted successfully!");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("Failed to delete the campaign. Please try again.");
    }
  };

  const handlePauseToggle = async (id, isPaused) => {
    try {
      await axiosSecure.patch(`/admin/donation-campaigns/${id}`, {
        paused: isPaused,
      });
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign._id === id ? { ...campaign, paused: isPaused } : campaign
        )
      );
    } catch (error) {
      console.error("Error updating campaign status:", error);
    }
  };

  if (isLoading) return <TableSkeleton></TableSkeleton>

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Donation Campaigns</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="p-2 border">Picture</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Max Donation</th>
              <th className="p-2 border">Last Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td className="p-2 border">
                  <img
                    src={campaign.petPicture}
                    alt="Campaign"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{campaign.shortDescription}</td>
                <td className="p-2 border">${campaign.maxDonationAmount}</td>
                <td className="p-2 border">
                  {new Date(campaign.lastDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {campaign.paused ? "Paused" : "Active"}
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mr-2"
                    onClick={() => handleDelete(campaign._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`${
                      campaign.paused ? "bg-green-500" : "bg-yellow-500"
                    } text-white px-3 py-1 rounded hover:opacity-90 transition`}
                    onClick={() =>
                      handlePauseToggle(campaign._id, !campaign.paused)
                    }
                  >
                    {campaign.paused ? "Unpause" : "Pause"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonations;

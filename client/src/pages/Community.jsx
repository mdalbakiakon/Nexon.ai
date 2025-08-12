import { useUser, useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Flame, Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Community = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const fetchCreations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const toggleLikeLocally = (id) => {
    if (!user) return;

    setCreations((prev) =>
      prev.map((creation) =>
        creation.id === id
          ? {
              ...creation,
              likes: creation.likes.includes(user.id)
                ? creation.likes.filter((uid) => uid !== user.id)
                : [...creation.likes, user.id],
            }
          : creation
      )
    );
  };

  const imageLikeToggle = async (id) => {
    if (!user) return;

    // Optimistic UI update
    toggleLikeLocally(id);

    // Show loading toast and keep its ID to update later
    const toastId = toast.loading("Updating like...");

    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (!data.success) {
        // Revert UI on failure
        toggleLikeLocally(id);

        toast.error(data.message, { id: toastId });
      } else {
        toast.success(data.message, { id: toastId });
      }
    } catch (error) {
      // Revert UI on error
      toggleLikeLocally(id);
      toast.error(error.message, { id: toastId });
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ? (
    <div
      className="h-[calc(100vh-56px)] flex flex-col p-6
        bg-[linear-gradient(to_bottom,transparent_75%,white_100%),url(/gradientBackground.png)]
        bg-cover bg-no-repeat"
    >
      <div className="flex items-center gap-0">
        <Flame className="w-6 text-primary font-semibold" />
        <h1 className="text-xl font-semibold">Creations</h1>
      </div>
      <div className="bg-transparent h-full w-full">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />

            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-xl">
              <div className="flex flex-col justify-center items-start">
                <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
              </div>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 my-1 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;

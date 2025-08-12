import { useState, useEffect } from "react";
import { Crown, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setCreations(data.creations)
      }

      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setLoading(false)
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div
      className="h-[calc(100vh-56px)] flex flex-col p-6
        bg-[linear-gradient(to_bottom,transparent_75%,white_100%),url(/gradientBackground.png)]
        bg-cover bg-no-repeat"
    >
      {/* Top stats */}
      <div className="flex justify-start gap-5 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-transparent rounded-xl border border-gray-300">
          <div className="text-primary ">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div>
            <Sparkles className="w-12 h-12 p-3 text-white rounded-xl bg-primary" />
          </div>
        </div>

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-transparent rounded-xl border border-gray-300">
          <div className="text-primary ">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div>
            <Crown className="w-12 h-12 p-3 text-white rounded-xl bg-primary" />
          </div>
        </div>
      </div>

      {
        loading ? (
          <div className="flex justify-center items-center h-3/4">
            <span className="w-10 h-10 my-1 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
          </div>
        ) : (
          <div className="mt-6 mb-6 flex-1 flex flex-col">
            <p className="mb-4 text-xl text-primary font-semibold">Recent Creation</p>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      }

    </div>
  );
};

export default Dashboard;

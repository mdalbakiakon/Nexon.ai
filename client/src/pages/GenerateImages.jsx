import React, { useState } from 'react';
import { Image } from 'lucide-react';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


const GenerateImages = () => {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

  const imageStyle = [
    "Realistic",
    "Ghibli",
    "Anime",
    "Comic",
    "Cartoon",
    "Fantasy",
    "3D",
    "Portrait"
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, { headers: { Authorization: `Bearer ${await getToken()}` } })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }


    } catch (error) {
        toast.error(error.message)
    }
    setLoading(false)
  };

  return (
    <div
      className="h-[calc(100vh-56px)] flex flex-col p-6
      bg-[linear-gradient(to_bottom,transparent_75%,white_100%),url(/gradientBackground.png)]
      bg-cover bg-no-repeat"
    >
      <div className="flex justify-start gap-5 flex-wrap text-primary">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 bg-transparent rounded-lg border border-gray-300"
        >
          <div className="flex items-center gap-2">
            <Image className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">AI Image Generator</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Describe Your Image</p>
          <textarea
            rows={4}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-primary"
            placeholder="Describe what image you want to generate..."
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <p className="mt-4 text-sm font-medium">Style</p>
          <div className="mt-3 flex gap-3 flex-wrap max-w-[75%] text-primary">
            {imageStyle.map((item) => (
              <span
                key={item}
                onClick={() => setSelectedStyle(item)}
                className={`text-xs px-3 py-1 border rounded-full cursor-pointer border-gray-300 ${
                  selectedStyle === item
                    ? "bg-primary text-white"
                    : "text-gray-600"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

            <div className='my-6 flex items-center gap-2'>
              <label className='relative cursor-pointer'>
                <input type='checkbox' onChange={(e)=>setPublish(e.target.checked)} checked={publish} className='sr-only peer' />
                <div className='w-9 h-5 bg-primary rounded-full peer-checked:bg-green-500 transition'>

                </div>
                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
              </label>
              <p className='text-primary text-sm'>Make this image public</p>
            </div>

          <button
            disabled ={loading}
            type="submit"
            className="text-white font-semibold flex items-center justify-center gap-2 w-full bg-primary px-4 py-2 rounded-lg text-sm cursor-pointer"
          >
            {loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>: <Image className="w-5" />}
            Generate Image
          </button>
        </form>

        <div className="w-full max-w-lg p-4 bg-transparent rounded-lg flex flex-col border border-gray-300 min-h-[384px] max-h-[600px]">
          <div className="flex items-center gap-2">
            <Image className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Generated Image</h1>
          </div>

          {
            !content ? (          <div className="flex flex-col flex-1 items-center justify-center gap-3">
            <Image className="w-8 h-8 text-gray-400" />
            <p className="text-base text-gray-400 text-center">
              Enter a topic and click "Generate Image" to get started
            </p>
          </div>):(
            <div className='mt-3 h-full'>
              <img src={content} alt='image' className='w-full h-full rounded-lg shadow-xl'/>
            </div>
          )
          }

        </div>
      </div>
    </div>
  );
};

export default GenerateImages;

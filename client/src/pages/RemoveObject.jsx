import { Scissors } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


const RemoveObject = () => {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      if (object.split(" ").length > 1) {
        return toast("Please only one object name")
      }

      const formData = new FormData()
      formData.append('image', input)
      formData.append('object', object)


      const { data } = await axios.post('/api/ai/remove-image-object', formData, { headers: { Authorization: `Bearer ${await getToken()}` } })

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
            <Scissors className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Object Remover</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Upload image</p>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
            required
            onChange={(e) => setInput(e.target.files[0])}
          />
          <p className="mt-6 text-sm text-primary font-medium">Describe object name to remove</p>


          <textarea
            rows={4}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-primary"
            placeholder="e.g., watch or spoon. Only single object name..."
            required
            value={object}
            onChange={(e) => setObject(e.target.value)}
          />

          <button
            disabled={loading}
            type="submit"
            className="text-white mt-6 font-semibold flex items-center justify-center gap-2 w-full bg-primary px-4 py-2 rounded-lg text-sm cursor-pointer"
          >
            {
              loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <Scissors className="w-5" />
            }
            Remove Object
          </button>
        </form>

        <div className="w-full max-w-lg p-4 bg-transparent rounded-lg flex flex-col border border-gray-300 min-h-[384px] max-h-[600px]">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>

          {
            !content ? (<div className="flex flex-col flex-1 items-center justify-center gap-3">
              <Scissors className="w-8 h-8 text-gray-400" />
              <p className="text-base text-gray-400 text-center">
                Upload an image and click "Remove Object" to get started
              </p>
            </div>) : (
              <div className='mt-3 h-full'>
                <img src={content} alt='image' className='w-full h-full rounded-lg shadow-xl' />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default RemoveObject

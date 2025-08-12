import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from 'react-markdown';

const ReviewResume = () => {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('resume', input)

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

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
        
        {/* Upload Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 bg-transparent rounded-lg border border-gray-300"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Resume Reviewer</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Upload resume</p>
          <input
            type="file"
            accept="application/pdf"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
            required
            onChange={(e) => setInput(e.target.files[0])}
          />
          <p className="text-xs text-primary font-light mt-1">Support PDF formats only</p>
          <button
            disabled={loading}
            type="submit"
            className="text-white mt-6 font-semibold flex items-center justify-center gap-2 w-full bg-primary px-4 py-2 rounded-lg text-sm cursor-pointer"
          >
            {
              loading
                ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                : <FileText className="w-5" />
            }
            Review Resume
          </button>
        </form>

        {/* Analysis Result Box */}
        <div className="w-full max-w-lg p-4 bg-transparent rounded-lg flex flex-col border border-gray-300 min-h-[384px] max-h-[600px]">
          {/* Fixed Header */}
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Analysis Result</h1>
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-1 overflow-y-auto overflow-x-hidden pr-2">
            {
              !content ? (
                <div className="flex flex-col flex-1 items-center justify-center gap-3 text-center text-gray-400">
                  <FileText className="w-8 h-8" />
                  <p className="text-base">
                    Upload a PDF and click "Review Resume" to get started
                  </p>
                </div>
              ) : (
                <div className='reset-tw'>
                  <Markdown>
                    {content}
                  </Markdown>
                </div>
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReviewResume;

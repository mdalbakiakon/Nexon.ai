import React, { useState } from 'react'
import { Edit, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`
      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
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
  }

  return (
    <div
      className="h-[calc(100vh-56px)] flex flex-col p-6
      bg-[linear-gradient(to_bottom,transparent_75%,white_100%),url(/gradientBackground.png)]
      bg-cover bg-no-repeat"
    >
      <div className="flex justify-start gap-5 flex-wrap text-primary">
        <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-transparent rounded-lg border border-gray-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Article Configuration</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Article Topic</p>
          <input
            type="text"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-primary"
            placeholder="The future of Artificial Intelligence is..."
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <p className="mt-4 text-sm font-medium">Article Length</p>
          <div className="mt-3 flex gap-3 flex-wrap max-w-[75%] text-primary">
            {articleLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-3 py-1 border rounded-full cursor-pointer border-gray-300 ${selectedLength.text === item.text
                    ? 'bg-primary text-white'
                    : 'text-gray-600'
                  }`}
              >
                {item.text}
              </span>
            ))}
          </div>
          <br />
          <button disabled={loading} className='text-white font-semibold flex items-center justify-center gap-2 w-full bg-primary px-4 py-2 rounded-lg text-sm cursor-pointer'>
            {
              loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>:
              <Edit className='w-5' />
            }
            Generate Article
          </button>
        </form>

        <div className='w-full max-w-lg p-4 bg-transparent rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px]'>
          <div className="flex items-center gap-2">
            <Edit className="w-6 text-primary font-semibold" />
            <h1 className="text-xl font-semibold">Generated Article</h1>
          </div>

          {!content ? (
            <div className="flex flex-col flex-1 items-center justify-center gap-3">
              <Edit className="w-8 h-8 text-gray-400" />
              <p className="text-base text-gray-400 text-center">
                Enter a topic and click "Generate Article" to get started
              </p>
            </div>
          ) : (
            <div className='mt-3 h-full overflow-y-auto text-sm text-primary'>
              <div className='reset-tw'>
              <Markdown>
                {content}
              </Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WriteArticle

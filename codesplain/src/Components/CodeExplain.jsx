import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CodeExplain = ({explanation}) => {
  return (
    <div className='w-full max-w-4xl mt-12 bg-white border border-zinc-200 p-8 md:p-10 rounded-2xl shadow-sm text-zinc-900 animate-in fade-in slide-in-from-bottom-2 duration-300'>
        <h2 className='text-xl font-bold mb-6 text-zinc-950 tracking-tight border-b border-zinc-100 pb-4'>Explanation</h2>
        <div className='markdown-body text-zinc-700 leading-relaxed text-base'>
          <Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
        </div>
    </div>
  )
}

export default CodeExplain
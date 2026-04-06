import { useActionState } from "react"
import { explain } from "../actions"
import CodeExplain from "./CodeExplain"
import Error from "./Error"

const CodeForm = () => {
    const [formState,formAction,isPending]=useActionState(explain,null)
  return (
    <div className="w-full max-w-4xl bg-white border border-zinc-200 p-8 md:p-10 rounded-2xl shadow-sm transition-all duration-300">
        <form action={formAction}>
            <label className="block mb-2 font-semibold text-zinc-800 text-sm">Language</label>

            <select name="language" id="" className="border border-zinc-200 rounded-lg p-3 w-full mb-6 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-shadow">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
            <option value="java">Java</option>
            </select>

            <label className="block mb-2 font-semibold text-zinc-800 text-sm">Your Code</label>

            <textarea name="code" required placeholder="Paste your code here..."
            className="border border-zinc-200 rounded-lg w-full p-4 font-mono text-sm bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-shadow min-h-[220px]"
            ></textarea>


            <div className="flex justify-end mt-4">
               <button type="submit"
                disabled={isPending} 
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-zinc-950 text-white font-medium hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                   {isPending ? (
                       <>
                           <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           <span>Analyzing...</span>
                       </>
                   ): "Explain Code"}
               </button>
            </div>

        </form>
        {
            formState?.success?(
                <CodeExplain explanation={formState?.data.explaination}/>
            ):(
                formState?.success===false &&(
                   <Error error={formState?.error}/>
                )
            )
        }
    </div>
  )
}

export default CodeForm
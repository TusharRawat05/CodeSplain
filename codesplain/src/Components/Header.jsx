
const Header = () => {
  return (
    <header className="flex justify-center items-center w-full max-w-4xl mb-10 mt-8">
        <div className="flex flex-col items-center gap-1">
            <h1 className="text-5xl md:text-6xl font-black text-zinc-950 tracking-tighter">CodeSplain</h1>
            <p className="text-zinc-500 font-medium tracking-wide text-sm">AI Code Explainer</p>
        </div>
    </header>
  )
}

export default Header
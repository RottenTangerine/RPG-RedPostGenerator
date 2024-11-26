import Generator from "./Generator/Generator.tsx";


function App() {

    return (
        <>
            <div className="grid place-items-center">
                <h1 className="mt-20 font-extrabold text-4xl">小红书文章生成器</h1>
                <p className="font-light text-xs">Red Post Generator</p>
                <p className="mt-4">嘴太笨不知道怎么夸？用这个！</p>
            </div>

            <Generator/>
        </>
    );
}

export default App;

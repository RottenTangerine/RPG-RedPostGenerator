import {ResponseInfo} from "../Generator.tsx";

function PostFrame({response}: ResponseInfo){
    return(
        <div className="w-[500px] mx-auto mt-20 shadow-2xl rounded-lg p-6">
            <h1 className="text-xl font-extrabold">{response.Title}</h1>
            <div className="mt-6">
                <div dangerouslySetInnerHTML={{__html: response.Content}}></div>
            </div>
            <div>
                <ul className="mt-4 *:inline-flex *:items-center *:font-medium *:text-pink-700 *:px-2 *:py-1 *:text-xs *:rounded-full *:ring-1 *:ring-inset *:ring-pink-700/10">
                        {response.Tags.map(item => ( <li key={item} className="mr-2">{item}</li>))}
                    </ul>
            </div>
        </div>
)
}

export default PostFrame;
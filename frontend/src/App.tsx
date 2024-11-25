// import Example from "./Example.tsx";
import Image from "./Image/Image.tsx";
import { useState } from "react";

function App() {
    const [response, setResponse] = useState<string>('');

    const handleResponseUpload = (response_data:string) => {
        setResponse(response_data);
    };

    return (
        <>
            {/*<Example/>*/}
            <Image responseUpload={handleResponseUpload}/>
            {response && <h1>{response}</h1>}
        </>
    );
}

export default App;

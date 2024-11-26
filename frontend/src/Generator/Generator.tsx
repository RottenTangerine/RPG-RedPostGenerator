import ImageFrame from "./ImageFrame/ImageFrame.tsx";
import PostFrame from "./PostFrame/PostFrame.tsx";
import {useState} from "react";

export interface ResponseInfo {
    response: { "Title": string, "Content": string, "Tags": string[] }
}

function Generator() {
    const [response, setResponse] = useState<ResponseInfo | undefined>(undefined);

    const handleResponseUpload = (response_data: ResponseInfo) => {
        setResponse(response_data);
    };

    return (
        <>
            <div className="grid xl:grid-cols-4">
                <div></div>
                <ImageFrame responseUpload={handleResponseUpload}/>
                {(() => { if (typeof response !== "undefined") { return <PostFrame response={response} />; } return null; })()}
                <div></div>
            </div>
        </>
    );
}

export default Generator;
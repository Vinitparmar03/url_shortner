import { useState } from "react";
import axios from "axios";

export const Home = () =>{
    const [copied, setCopied] = useState(false);
    const [longUrl, setLongUrl] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");

    const generateUrl = async () => {
        try{   
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/url/`,{
                longUrl
            })

            setGeneratedUrl(`${window.location.origin}/${response.data.data}`);
            
        }catch(error){
            console.log(error)
        }
    }

   const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(generatedUrl);
            } else {
                const textArea = document.createElement("textarea");

                textArea.value = generatedUrl;

                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";

                document.body.appendChild(textArea);

                textArea.focus();
                textArea.select();

                document.execCommand("copy");

                textArea.remove();
            }

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 3000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full mx-10 mt-5">
            <div className="w-100 mt-10">
                <h1 className="text-center text-4xl">Shorten Your Links, Share <span className="text-primary">Anywhere</span></h1>
                <h5 className="text-gray-500 text-center text-sm mt-2">Transform Long URLs into short, shareable links in seconds, Track, analyze, and optimize your links effortlessly</h5>
            </div>

            <div className="w-[500px] bg-white shadow-lg rounded-lg p-6 mt-8">
                <input
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Paste your long URL here..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
                />

                <button onClick={generateUrl}
                    className="w-full mt-4 bg-primary text-white py-3 rounded-lg cursor-pointer"
                >
                    Generate Small Link
                </button>
            </div>

            <div className="w-[500px] bg-white shadow-lg rounded-lg p-6 mt-6">
                <h3 className="font-semibold mb-3">Shortened Link</h3>

                <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3">
                    <span className="text-primary">
                        {generatedUrl}
                    </span>

                    <button disabled={!generatedUrl} onClick={handleCopy} className="cursor-pointer text-sm bg-primary text-white px-3 py-1 rounded">
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>
        </div>
    )
}

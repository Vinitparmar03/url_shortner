import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
    const { shortLink } = useParams();

    useEffect(() => {
        const getOriginalUrl = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/url/${shortLink}`
                );

                setTimeout(() => {
                    window.location.replace(
                        response.data.longUrl
                    );
                }, 1500);

            } catch (error) {
                console.log(error);
            }
        };

        getOriginalUrl();
    }, [shortLink]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[450px]">

                <div className="flex justify-center mb-6">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>

                <h1 className="text-2xl font-semibold">
                    Redirecting...
                </h1>

                <p className="text-gray-500 mt-3">
                    Please wait while we take you to your destination.
                </p>

                <div className="mt-6 bg-gray-100 rounded-lg p-3">
                    <span className="text-primary font-medium">
                        /{shortLink}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default RedirectPage;
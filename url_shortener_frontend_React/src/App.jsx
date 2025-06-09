import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const handleShorten = async () => {
    if (!longUrl) {
      toast.error("Please enter a URL");
      return;
    }
  
    try {
      // Send the URL shortening request
      const response = await axios.post("http://localhost:8080/shorten", null, {
        params: { originalUrl: longUrl },
      });
  
      // Handle plain string response
      const shortenedUrl = response.data; // Directly use the response data
      if (shortenedUrl) {
        setShortUrl(shortenedUrl); // Update the state with the short URL
        toast.success("URL Shortened Successfully!");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      // Check if the error is a response error and if the status is 429 (rate limiting)
      if (error.response && error.response.status === 503) {
        toast.error("Rate limit exceeded. Please slow down your requests.");
      } else {
        toast.error("Error shortening URL");
      }
      console.error(error);
    }
  };
  

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>

        {/* Input Field */}
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        {/* Shorten Button */}
        <button
          onClick={handleShorten}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Shorten URL
        </button>

        {/* Display Shortened URL */}
        {shortUrl && (
          <div className="mt-4 p-2 bg-gray-200 rounded flex items-center justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 ml-2"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
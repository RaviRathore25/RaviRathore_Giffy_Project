"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import dotenv from "dotenv";

type Gif = {
  id: string;
  url: string;
  title: string;
};

const GiphySearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit: number = 3;
  dotenv.config();

  const GIPHY_API_KEY: string = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
  const GIPHY_API_URL: string = "https://api.giphy.com/v1/gifs/search";

  const searchGifs = async (url: string) => {
    try {
      const response = await axios.get(url, {
        params: {
          api_key: GIPHY_API_KEY,
          q: query,
          offset,
        },
      });
      console.log(response.data);
      const newGifs: Gif[] = response.data.data.map((gif: any) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,
        title: gif.title,
      }));
      if (offset === 0) {
        setGifs(newGifs);
      } else {
        setGifs((prevGifs) => [...prevGifs, ...newGifs]);
      }
    } catch (error) {
      console.error("Opps, Somthing went wrong!", error);
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchGifs(GIPHY_API_URL);
    }
  }, [query, offset]);

  const handleSearch = () => {
    setOffset(0);
    searchGifs(GIPHY_API_URL);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    redirect("/signin");
  };

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <div className="min-h-screen flex  flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <img
          className="logo"
          src="data:image/jpeg;base64,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"
          width={85}
          alt="logo"
        />
        <div className="max-w-4xl w-full space-y-8 p-8 bg-gray-100 rounded-lg shadow-md">
          <div className="flex justify-between">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for GIFs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full rounded-lg border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Search 🔍
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center rounded-lg overflow-hidden">
            {gifs.slice(offset, offset + limit).map((gif) => (
              <img
                key={gif.id}
                src={gif.url}
                alt={gif.title}
                className="w-1/3 p-2 rounded-lg"
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            >
              ⬅️ Previous
            </button>
            <button
              onClick={handleNext}
              disabled={offset + limit >= gifs.length}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Next ➡️
            </button>
          </div>
        </div>

        <button
          className="text-white mt-4 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg"
          onClick={handleSignOut}
        >
          Logout
        </button>
        <footer>
          <h5>
            <b>
              Designed & Maintained with{" "}
              <span className="text-red-800">&#9825;</span> by{" "}
              <a href="https://linktr.ee/i_m_k_s_s" target="_blank">
                Sunny
              </a>{" "}
              &copy; 2023 All rights reserved
            </b>
          </h5>
        </footer>
      </div>
    </>
  );
};

export default GiphySearch;

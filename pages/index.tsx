import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { Genre, Vibes } from "../components/DropDown";
import ComboBox from "../components/ComboBox";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import {genres, vibes, eras} from "../public/static/baseData"

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [vibe, setVibe] = useState<string>("Happy");
  const [genre, setGenre] = useState<string>("Comedy");
  const [era, setEra] = useState<string>("2000 - 2023");
  const [movies, setMovies] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Suggest 10 movies that have ${vibe} vibes. the genre must be ${genre}. and the movies must have been made in ${era}.`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setMovies("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setMovies((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Watch Match</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Don't know what to watch? Let's find
        </h1>

        <div className="max-w-xl w-full mt-8">
          <div className="flex items-center space-x-3">
            <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe or mood.</p>
          </div>
          <div className="block mt-2">
            <DropDown
              dropDownType={"Vibe"}
              value={vibe}
              options={vibes}
              setStateFunction={(newVibe) => setVibe(newVibe)}
            />
          </div>
          <div className="flex mt-2 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Select a genre.</p>
          </div>
          <div className="block mt-2">
            <DropDown
              dropDownType="Genre"
              value={genre}
              options={genres}
              setStateFunction={(newGenre) => setGenre(newGenre)}
            />
          </div>
          <div className="flex mt-2 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Select an era</p>
          </div>
          <div className="block mt-2">
            <DropDown
              dropDownType={"Era"}
              value={era}
              options={eras}
              setStateFunction={(newEra) => setEra(newEra)}
            />
          </div>
          <div className="flex mt-2 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">A movie director you love</p>
          </div>
          <div className="block">
            <ComboBox />
          </div>
          <div className="flex mt-2 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">A movie you've liked recently</p>
          </div>
          <div className="block">
            <ComboBox />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Find out!
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {movies && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Here they are:
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {movies
                  .substring(movies.indexOf("1") + 3)
                  .split("2.")
                  .map((movie) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(movie);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={movie}
                      >
                        <p>{movie}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

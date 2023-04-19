import Image from "next/image";
import Link from "next/link";
import Github from "./GitHub";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full border-b-2">
      <a
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-2"
        href="https://github.com/Nutlope/twitterbio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>Star on GitHub</p>
      </a>
    </header>
  );
}

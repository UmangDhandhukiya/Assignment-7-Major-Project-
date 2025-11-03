import React, { useRef } from "react";
import { useAppContext } from "../context/AppContext";


/**
 * Renders the main Header component, featuring a title, description, and search bar.
 * Parameters: None. It interacts with the global application context to update the search input.
 * The component uses a 'useRef' hook to capture the value from the search input field upon form submission.
 */
const Header = () => {

  const {setInput} = useAppContext()
  const inputRef = useRef()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setInput(inputRef.current.value)
  }

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex justify-center items-center px-6 py-1.5 mb-4 border border-secondary/40 bg-secondary/10 rounded-full text-sm text-text">
          <p>We Are Providing Daily Blog</p>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold sm:leading-16 text-text">
          Where curious people meet
          <br /> curious{" "}
          <span className="text-secondary"> words and stories</span> <br /> That
          matters.
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-text">
          A creative space to write, read, and connect with minds like
          yours.Discover voices that spark thought and inspire change.
        </p>

        <form onSubmit={handleSubmit} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
          <input
            className="w-full px-4 outline-none"
            type="text"
            placeholder="search blog"
            ref={inputRef}
            required
          />
          <button
            className="bg-secondary px-6 py-2 cursor-pointer text-text text-sm"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

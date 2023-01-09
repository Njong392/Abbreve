import { useState, useEffect, useRef } from "react";
import { LoadingSpinner } from "./loadingSpinner";

const Form = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isUserInputBlank, setIsUserInputBlank] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const previousUserInput = useRef(undefined);
  const hasUserInputChanged = previousUserInput.current !== userInput;

  function clearDataBeforeFetch() {
    setErrorMessage("");
    setData(false);
    setIsUserInputBlank(false);
    setError(false);
  }

  const fetchData = (e) => {
    if (hasUserInputChanged) {
      clearDataBeforeFetch();
    }

    setIsLoading(true);
    e.preventDefault();
    const url = `/server/db/${userInput}.json`;

    if (userInput.trim().length === 0) {
      setIsUserInputBlank(true);
      setIsLoading(false);
    } else {
      fetch(`${url}`)
        .then((response) => {
          if (response.status === 404) {
            setIsUserInputBlank(false);
            setErrorMessage(true);
            setIsLoading(false);
          } else if (!response.ok) {
            setIsLoading(false);
            throw Error("Resource not found");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setError(false);
          setErrorMessage(false);
          setIsUserInputBlank(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setErrorMessage(true);
          setIsUserInputBlank(false);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!isUserInputBlank) {
      previousUserInput.current = userInput;
    }

    clearDataBeforeFetch();
  }, [userInput]);

  return (
    <div className="bg-dark py-12 px-[14px] dark:bg-ash">
      <section className="block justify-center md:pb-16 md:flex items-center">
        <div className="md:w-1/2 md:pr-20 md:text-left text-center">
          <h2 className="text-purple font-bold text-3xl dark:text-deeppurple">
            <span className="text-ash dark:text-dark">
              Start by entering a slang,
            </span>{" "}
            and our dictionary will spit out an abbreviation.{" "}
          </h2>
          <p className="text-gray text-sm mt-5">
            *For now, abbreviations are one-way. For example, Idk can only
            translate to 'I don't know', and not the other way round.
          </p>
        </div>

        <div className="mt-2 md:mt-0">
          <form className="block md:flex items-center gap-2" id="form">
            <div className="bg-ash h-11 rounded-full flex items-center p-3 dark:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-deeppurple">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                type="text"
                placeholder="Search slang full meaning..."
                className="flex-1 w-1/2 h-11 rounded-full ml-2 border-none outline-none text-gray text-lg bg-ash"
                value={userInput}
                onChange={(e) =>
                  setUserInput(e.target.value.toLocaleLowerCase())
                }
              />
            </div>

            <button
              onClick={fetchData}
              disabled={isLoading || !hasUserInputChanged}
              className="bg-deeppurple text-ash font-bold rounded-xl hover:scale-110 p-2 mt-2 md:mt-0">
              Search
            </button>
          </form>

          {isLoading && <LoadingSpinner />}

          {data && (
            <>
              <div className="mt-2 text-purple font-bold text-xl ml-2 dark:text-deeppurple">
                <p role="region" aria-live="assertive">
                  {data.definition}
                </p>
              </div>
              <div className="mt-2 text-purple font-bold text-xs ml-2 dark:text-deeppurple">
                <p>{data.alternatives}</p>
              </div>
            </>
          )}

          {error && (
            <div className="text-purple text-sm mt-2 dark:text-deeppurple">
              Oops. Some connection error occured.
            </div>
          )}

          {isUserInputBlank && (
            <div className="mt-4">
              <p className="text-purple dark:text-deeppurple">
                Search bar 🔍 is Empty! Please input a slang.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3">
              <p className="text-purple dark:text-deeppurple">
                This entry does not exist in our records as of yet :(
              </p>
              <p className="text-ash mt-2 dark:text-dark">
                1. You can help us add this by creating a{" "}
                <a
                  href="https://github.com/Njong392/Abbreve"
                  className=" text-purple dark:text-deeppurple">
                  github issue
                </a>
              </p>
              <p className="text-ash dark:text-dark">
                2. Or, you could fill out this{" "}
                <a
                  href="https://t.co/mp86BLYBhq"
                  className="text-purple dark:text-deeppurple">
                  feedback form
                </a>{" "}
                and we will address the issue
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Form;

import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "./loadingSpinner";
import copyImage from "../assets/copy.png";
const searchParams = new URLSearchParams(window.location.search);
const prefillVar = searchParams.get("share");

const Form = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isUserInputBlank, setIsUserInputBlank] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const previousUserInput = useRef(undefined);
  const hasUserInputChanged = previousUserInput.current !== userInput;
  const [isCopied, setIsCopied] = useState(false);
  const userInputRef = useRef(null);

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

  const copyToClipboard = (e) => {
    e.preventDefault();
    const link = `${window.location.origin}/?share=${userInput}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  useEffect(() => {
    if (!isUserInputBlank) {
      previousUserInput.current = userInput;
    }
  }, [userInput]);

  useEffect(() => {
    if (prefillVar) {
      setUserInput(prefillVar);
      const mockEvent = { preventDefault: () => {} };
      fetchData(mockEvent);
    }
  }, [isUserInputBlank]);

  const handleClearInput = useCallback(() => {
    setUserInput("");
    userInputRef.current?.focus();
  }, []);

  const hadleKeyDownOnClear = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleClearInput();
        e.preventDefault();
      }
    },
    [handleClearInput]
  );

  return (
    <div className="py-5 md:mb-0 lg:py-12 px-[14px] dark:bg-dark">
      <section className="block justify-center md:pb-16 md:flex md:flex-col lg:flex lg:flex-row items-center">
        <div className="md:w-full lg:pr-20 lg:w-1/2 flex flex-col">
          <h2 className="lg:text-left text-center text-deeppurple font-bold text-xl md:text-2xl lg:text-3xl  dark:text-purple">
            <span className="text-dark dark:text-ash ">
              Start by entering a slang,
            </span>{" "}
            and our dictionary will spit out an abbreviation.{" "}
          </h2>
          <p className="text-gray text-left lg:text-left md:text-center px-0 md:px-10 xmd:px-20 lg:px-0 text-sm mt-5">
            *For now, abbreviations are one-way. For example, Idk can only
            translate to 'I don't know', and not the other way round.
          </p>
        </div>

        <div className="mt-2 lg:mt-0 md:mt-4  lg:mb-24">
          <form
            className="block md:flex items-center justify-start gap-2"
            id="form">
            <div className="bg-ash h-11 rounded-full flex items-center p-3 mt-4 md:mt-0 dark:shadow-lg border-solid border-2 border-deeppurple relative">
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
                className="flex-1 w-[14rem] h-6 ml-2 border-none outline-none placeholder:text-black bg-ash mr-6"
                value={userInput}
                ref={userInputRef}
                onChange={(e) => {
                  clearDataBeforeFetch();
                  setUserInput(e.target.value.toLocaleLowerCase());
                }}
              />
              {userInput.length ? (
                <svg
                  viewBox="0 0 10 10"
                  width="0.75em"
                  height="0.75em"
                  stroke="currentColor"
                  strokeWidth="2"
                  onClick={handleClearInput}
                  onKeyDown={hadleKeyDownOnClear}
                  tabIndex="0"
                  className="text-deeppurple absolute right-4 cursor-pointer outline-offset-2">
                  <path d="M1,1 9,9 M9,1 1,9">
                    <title>clear</title>
                  </path>
                </svg>
              ) : null}
            </div>

            <button
              onClick={fetchData}
              disabled={isLoading || !hasUserInputChanged}
              className="bg-deeppurple text-ash font-bold rounded-xl hover:scale-110 p-2 mt-4 md:mt-0 items-center flex justify-center h-[50px] min-w-[100px] w-full transition-all cursor-pointer md:w-auto">
              {isLoading ? <LoadingSpinner /> : "Search"}
            </button>
          </form>

          {data && (
            <div className="bg-ash shadow-lg border-2 border-deeppurple py-2 px-2 rounded-lg mt-4">
              <div className="mt-1 font-bold text-xl ml-2 text-deeppurple">
                <p role="region" aria-live="assertive">
                  {data.definition}
                  <button
                    onClick={(e) => copyToClipboard(e)}
                    className="group relative inline-block float-right w-12 h-7 p-0 border-none focus:outline-none transition-transform duration-100 ease-out">
                    {isCopied ? (
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-sm px-1 -ml-5 h-full">
                        Copied
                      </span>
                    ) : (
                      <img
                        src={copyImage}
                        alt="Copy Link"
                        className="absolute inset-0 w-full h-full object-contain group-hover:scale-110"
                      />
                    )}
                  </button>
                </p>
              </div>
              <div className="mt-2 text-gray font-bold text-md ml-2 dark:text-gray">
                <p>{data.alternatives}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-deeppurple dark:text-purple text-sm mt-2 ">
              Oops. Some connection error occured.
            </div>
          )}

          {isUserInputBlank && (
            <div className="mt-4">
              <p className="text-deeppurple dark:text-purple ">
                Search bar 🔍 is Empty! Please input a slang.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 lg:absolute">
              <p className="text-deeppurple dark:text-purple">
                This entry does not exist in our records as of yet :(
              </p>
              <p className="text-dark mt-2 dark:text-ash">
                1. You can help us add this by creating a{" "}
                <a
                  href="https://github.com/Njong392/Abbreve"
                  className=" text-deeppurple dark:text-purple">
                  github issue
                </a>
              </p>
              <p className="text-dark dark:text-ash w-3/4">
                2. Or, you could fill out this{" "}
                <a
                  href="https://t.co/mp86BLYBhq"
                  className="text-deeppurple dark:text-purple">
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

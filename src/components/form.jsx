import React, { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "./loadingSpinner";
import copyImage from "../assets/copy.png";

const searchParams = new URLSearchParams(window.location.search);
const prefillVar = searchParams.get("share");

const Form = () => {
  const [formState, setFormState] = useState({
    data: null,
    error: false,
    errorMessage: false,
    userInput: "",
    isUserInputBlank: false,
    isLoading: false,
    isCopied: false,
  });

  const previousUserInput = useRef(undefined);
  const hasUserInputChanged = previousUserInput.current !== formState.userInput;

  const clearDataBeforeFetch = () => {
    setFormState((prevState) => ({
      ...prevState,
      errorMessage: "",
      data: null,
      isUserInputBlank: false,
      error: false,
    }));
  };

  const fetchData = (e) => {
    if (hasUserInputChanged) {
      clearDataBeforeFetch();
    }

    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    e.preventDefault();
    const url = `/server/db/${formState.userInput}.json`;

    if (formState.userInput.trim().length === 0) {
      setFormState((prevState) => ({
        ...prevState,
        isUserInputBlank: true,
        isLoading: false,
      }));
    } else {
      fetch(`${url}`)
        .then((response) => {
          if (response.status === 404) {
            setFormState((prevState) => ({
              ...prevState,
              isUserInputBlank: false,
              errorMessage: true,
              isLoading: false,
            }));
          } else if (!response.ok) {
            setFormState((prevState) => ({
              ...prevState,
              isLoading: false,
            }));
            throw Error("Resource not found");
          }
          return response.json();
        })
        .then((data) => {
          setFormState((prevState) => ({
            ...prevState,
            data: data,
            error: false,
            errorMessage: false,
            isUserInputBlank: false,
            isLoading: false,
          }));
        })
        .catch((err) => {
          console.log(err.message);
          setFormState((prevState) => ({
            ...prevState,
            errorMessage: true,
            isUserInputBlank: false,
            isLoading: false,
          }));
        });
    }
  };

  const copyToClipboard = (e) => {
    e.preventDefault();
    const link = `${window.location.origin}/?share=${formState.userInput}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard");
        setFormState((prevState) => ({ ...prevState, isCopied: true }));
        setTimeout(
          () =>
            setFormState((prevState) => ({ ...prevState, isCopied: false })),
          2000
        );
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const deleteAbbreviation = () => {
    setFormState({
      data: null,
      error: false,
      errorMessage: false,
      userInput: "",
      isUserInputBlank: false,
      isLoading: false,
      isCopied: false,
    });
  };

  useEffect(() => {
    if (!formState.isUserInputBlank) {
      previousUserInput.current = formState.userInput;
    }
  }, [formState.userInput]);

  useEffect(() => {
    if (prefillVar) {
      setFormState((prevState) => ({
        ...prevState,
        userInput: prefillVar,
      }));
      const mockEvent = { preventDefault: () => {} };
      fetchData(mockEvent);
    }
  }, [formState.isUserInputBlank]);

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
            <div className="bg-ash h-11 rounded-full flex items-center p-3 mt-4 md:mt-0 dark:shadow-lg border-solid border-2 border-deeppurple">
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
                className="flex-1 w-[14rem] h-6 ml-2 border-none outline-none placeholder:text-black bg-ash"
                value={formState.userInput}
                onChange={(e) => {
                  clearDataBeforeFetch();
                  setFormState((prevState) => ({
                    ...prevState,
                    userInput: e.target.value.toLocaleLowerCase(),
                  }));
                }}
              />
            </div>

            <button
              onClick={fetchData}
              disabled={formState.isLoading || !hasUserInputChanged}
              className="bg-deeppurple text-ash font-bold rounded-xl hover:scale-110 p-2 mt-4 md:mt-0 items-center flex justify-center h-[50px] min-w-[100px] w-full transition-all cursor-pointer md:w-auto">
              {formState.isLoading ? <LoadingSpinner /> : "Search"}
            </button>

            {formState.userInput && (
              <button
                onClick={deleteAbbreviation}
                className="bg-red-500 text-white font-bold rounded-xl hover:scale-110 p-2 mt-4 md:mt-0 items-center flex justify-center h-[50px] min-w-[100px] w-full transition-all cursor-pointer md:w-auto">
                Delete
              </button>
            )}
          </form>

          {formState.data && (
            <div className="bg-ash shadow-lg border-2 border-deeppurple py-2 px-2 rounded-lg mt-4">
              <div className="mt-1 font-bold text-xl ml-2 text-deeppurple">
                <p role="region" aria-live="assertive">
                  {formState.data.definition}
                  <button
                    onClick={(e) => copyToClipboard(e)}
                    className="group relative inline-block float-right w-12 h-7 p-0 border-none focus:outline-none transition-transform duration-100 ease-out">
                    {formState.isCopied ? (
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
                <p>{formState.data.alternatives}</p>
              </div>
            </div>
          )}

          {formState.error && (
            <div className="text-deeppurple dark:text-purple text-sm mt-2 ">
              Oops. Some connection error occurred.
            </div>
          )}

          {formState.isUserInputBlank && (
            <div className="mt-4">
              <p className="text-deeppurple dark:text-purple ">
                Search bar 🔍 is Empty! Please input a slang.
              </p>
            </div>
          )}

          {formState.errorMessage && (
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

import { useState, useEffect } from "react";

const Form = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState("");

  const getDefinitionFromDb = async (query, encodeBeforeSearch = true) => {
    // We need to encode twice to prevent the browser from decoding the query
    // before actually fetching the file!
    const dbFilename = encodeBeforeSearch
      ? encodeURIComponent(encodeURIComponent(query.toLowerCase()))
      : encodeURIComponent(query);
    const url = `/server/db/${dbFilename}.json`;

    try {
      const dbQuery = await fetch(url);

      if (dbQuery.status === 404) {
        return null;
      }

      return await dbQuery.json();
    } catch (err) {
      console.log(err.message);
      return undefined;
    }
  };

  const fetchData = async (query) => {
    if (!userInput.trim()) {
      return;
    }
    let mappings;

    try {
      const mappingsFile = await fetch("/server/encodedAbbrMappings.json");
      mappings = await mappingsFile.json();
    } catch {
      // mappings file was not found
    }

    if (query.trim().length === 0) {
      setError("emptyQuery");
    } else {
      let data = await getDefinitionFromDb(query);

      if (data) {
        setError(null);
        setData(data);
        return;
      }

      if (mappings) {
        for (const encodedAbbr in mappings) {
          const slang = mappings[encodedAbbr];

          if (slang == query) {
            data = await getDefinitionFromDb(encodedAbbr, false);

            if (data) {
              setError(null);
              setData(data);
              return; // Prevent O(n) as early as possible
            }
          }
        }
      }

      setError(data === null ? "slangNotFound" : "unknown");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetchData(userInput);
  };

  const sanitizeInput = (value) => {
    return value.trim().toLowerCase();
  };

  const handlePaste = (event) => {
    return sanitizeInput(event.target.value);
  };

  const handleChange = (event) => {
    const userInput = event.target.value;
    const validInput = sanitizeInput(userInput);
    setUserInput(validInput);
  };

  useEffect(() => {
    setData(null);
    setError(null);
  }, [userInput]);

  return (
    <div className="bg-dark py-12 px-[14px]">
      <section className="block justify-center md:pb-16 md:flex items-center">
        <div className="md:w-1/2 md:pr-20 md:text-left text-center">
          <h2 className="text-purple font-bold text-3xl">
            <span className="text-ash">Start by entering a slang,</span> and our
            dictionary will spit out an abbreviation.{" "}
          </h2>
          <p className="text-gray text-sm mt-5">
            *For now, abbreviations are one-way. For example, Idk can only
            translate to 'I don't know', and not the other way round.
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="block md:flex items-center gap-3"
            id="form">
            <div className="bg-ash h-11 rounded-full flex items-center p-3">
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
                onChange={handleChange}
                onPaste={handlePaste}
              />
            </div>

            <button
              className="bg-deeppurple text-ash font-bold rounded-xl hover:scale-110 p-2 mt-2 md:mt-0"
              type="submit">
              Submit
            </button>
          </form>

          {data && (
            <div className="mt-2 text-purple font-bold text-xl ml-2">
              <p role="region" aria-live="assertive">
                {data.definition}
              </p>
            </div>
          )}

          {data && (
            <div className="mt-2 text-purple font-bold text-xs ml-2">
              <p>{data.alternatives}</p>
            </div>
          )}

          {error === "unknown" && (
            <div className="text-purple text-sm mt-2">
              Oops. Some connection error occured.
            </div>
          )}

          {error === "emptyQuery" && (
            <div className="mt-4">
              <p className="text-purple">
                Search bar 🔍 is Empty! Please input a slang.
              </p>
            </div>
          )}

          {error === "slangNotFound" && (
            <div className="mt-4">
              <p className="text-purple">
                This entry does not exist in our records as of yet :(
              </p>
              <p className="text-ash mt-2">
                1. You can help us add this by creating a{" "}
                <a
                  href="https://github.com/Njong392/Abbreve"
                  className="text-ash text-purple">
                  github issue
                </a>
              </p>
              <p className="text-ash">
                2. Or, you could fill out this{" "}
                <a href="https://t.co/mp86BLYBhq" className="text-purple">
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

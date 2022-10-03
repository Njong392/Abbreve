import { useState } from "react";
const Form = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [userInput, setUserInput] = useState('');
   
    const fetchData = (e) => {
        e.preventDefault();
        const url = '/server/db.json';
        fetch(`${url}`)
        .then(response => {
            if(!response.ok){
                throw Error('Resource not found. 404.');
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
            setError(false);
            
        })
        .catch(err => {
            console.log(err.message);
            setError(true);
        });
    }

    return(
        <div className=" bg-dark py-12 px-14 " >
            <section className="block justify-center pb-16 md:flex">
                <div className='md:w-1/2 md:pr-20 md:text-left text-center'>
                    <h2 className='text-purple font-bold text-3xl'><span className="text-ash">Start by entering a slang,</span> and our dictionary will spit out an abbreviation. </h2> 
                    <p className="text-gray text-sm mt-5">*For now, abbreviations are one-way. For example, Idk can only translate to 'I don't know', and not the other way round.</p>

                    <p className="text-sm mt-5 text-ash">Found something odd? <a href="https://github.com/Njong392/Abbreve"><span className="text-purple">Create a github issue.</span></a></p>     
                </div>

                <div>
                   <form className="block md:flex items-center gap-3" id="form">
                        <div className="bg-ash h-11 rounded-full flex items-center p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-purple">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                            <input type="text" placeholder="Search slang full meaning..." className="flex-1 w-1/2 h-11 rounded-full ml-2 border-none outline-none text-gray text-lg" value={userInput} onChange={(e) => setUserInput(e.target.value.toLocaleLowerCase() )} />
                        </div>

                        <button onClick={fetchData} className="bg-purple text-ash font-bold rounded-xl hover:scale-110 p-2 mt-2 md:mt-0">Submit</button>
                       
                   </form>

                    {error && <div className="text-purple text-sm mt-2">Oopsie. Some error occured :(</div>}
                    {data && <div className="mt-2 text-purple font-bold text-xl ml-2"><p role="region" aria-live="assertive">{data[`${userInput}`]?.definition }</p></div>}
                    {data && <div className="mt-2 text-purple font-bold text-xs ml-2"><p>{ data[`${userInput}`]?.alternatives }</p></div>}

                </div>
              
            </section>

        </div>
    )
}

export default Form;

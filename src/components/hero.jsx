import btw from "../assets/btw.png";
import fyi from "../assets/fyi.png";
import idk from "../assets/idk.png";
import ig from "../assets/ig.png";
import lfg from "../assets/lfg.png";
import nate from "../assets/nate.jpg";
import emy from "../assets/emy.jpg";
import Form from "./form";

const Hero = () => {
  return (
    <main className="bg-dark md:px-14 lg:px-40  py-12 px-[24px] dark:bg-ash">
      <header className="text-center lg:mt-12">
        <div className="text-4xl md:text-5xl lg:text-7xl mb-5 relative">
          <h1 className="text-purple font-bold dark:text-deeppurple">
            Writing on the internet
          </h1>
          <h1 className="text-ash font-bold mt-2 dark:text-dark">
            is changing. IYKYK
          </h1>
          <div className="absolute right-14 bottom-9 xl:visible invisible">
            <div className="w-24 h-4 bg-deeppurple relative -rotate-6">
              <div className="absolute top-[3px]">
                <p className="text-ash text-sm font-semibold dark:text-dark">
                  If You Know,
                </p>
              </div>
            </div>
          </div>
          <div className="absolute right-12 bottom-3 xl:visible invisible">
            <div className="right-8 w-20 h-4 bg-deeppurple relative -rotate-6">
              <div className="absolute top-[3px]">
                <p className="text-ash text-sm font-semibold dark:text-dark">
                  You Know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap justify-center animate-breeze">
        <img src={btw} alt="btw" className="rotate-2 h-[20%] w-[20%]" />
        <img src={fyi} alt="fyi" className="-rotate-3 h-[20%] w-[20%]" />
        <img src={idk} alt="idk" className="rotate-3 h-[20%] w-[20%]" />
        <img src={ig} alt="if" className="rotate-6 h-[20%] w-[20%]" />
        <img src={lfg} alt="lfg" className="-rotate-6 h-[20%] w-[20%]" />
      </div>

      <Form />

      <section className="block justify-center  items-center md:flex md:flex-col-reverse lg:flex lg:flex-row">
        <div className="lg:w-1/2 px-10 pt-5 lg:px-0 lg:pr-20 md:text-left lg:text-center text-center">
          <p className="text-purple font-bold text-2xl lg:text-3xl dark:text-deeppurple">
            <span className="text-ash dark:text-dark">
              Abbreve (A-bree-vay)
            </span>{" "}
            is an open source dictionary for{" "}
            <span className="text-ash dark:text-dark">slang.</span>{" "}
          </p>
          <p className="text-purple font-bold text-2xl lg:text-3xl mt-2 dark:text-deeppurple pb-8">
            Curated by the community, for the community.
          </p>
        </div>

        <div className="border-2 p-4 rounded-lg border-purple lg:rotate-3 hover:lg:rotate-0 hover:lg:ease-in-out hover:lg:duration-300 relative md:mt-0 dark:border-deeppurple">
          <div className="flex gap-2 items-center">
            <img src={nate} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <a
                href="https://twitter.com/Nateemerson/status/1567566265719599105?s=20&t=QAOQu1feHo07evNBHFvAIQ"
                className="text-purple dark:text-deeppurple">
                <p className="font-bold">Nate (DojoJOJO)</p>
                <p className="text-sm">@Nateemerson</p>
              </a>
            </div>
          </div>

          <p className="mt-2">
            <span className="text-gray">Replying to</span>{" "}
            <span className="text-purple dark:text-deeppurple">
              @DunsinWebDev and @njongemy
            </span>
          </p>
          <p className="mt-2 text-ash dark:text-dark">
            idk wtf ur on about... ICYMI IMHO RTFM, KISS, SHIT or GTFO.
          </p>
          <p className="text-sm text-gray">
            18:31 . 07 Sep 22 .{" "}
            <span className="text-purple dark:text-deeppurple">
              {" "}
              Twitter Web App
            </span>
          </p>

          <div className="absolute w-32 border-2 border-purple rounded-lg p-2 -top-14 -right-4 bg-dark rotate-6 invisible lg:visible dark:border-deeppurple">
            <p className="text-ash text-xl font-bold ">
              Reading shouldn't feel like work.
            </p>
          </div>
        </div>
      </section>

      <section className=" justify-center lg:gap-10 mt-10 items-center flex flex-col lg:flex-row">
        <div className="border-2 p-4 rounded-lg border-purple lg:rotate-3 hover:lg:rotate-0 hover:lg:ease-in-out hover:lg:duration-300 relative md:mt-0 dark:border-deeppurple">
          <div className="flex gap-2 items-center">
            <img src={emy} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <a
                href="https://twitter.com/njong_emy/status/1567561277135781888?s=20&t=QAOQu1feHo07evNBHFvAIQ"
                className="text-purple dark:text-deeppurple">
                <p className="font-bold">Emy 🦄⛅</p>
                <p className="text-sm">@njong_emy</p>
              </a>
            </div>
          </div>

          <p className="mt-5 text-ash dark:text-dark">
            Do you find yourself googling the meaning of slang like hmu, lgtm,
            lfg etc ?
          </p>

          <div className="flex justify-between items-center mt-2">
            <div className="h-8 w-3/4 bg-purple rounded-sm p-1 dark:bg-deeppurple">
              <p className="text-dark">Always 😢</p>
            </div>
            <p className="text-ash dark:text-dark">84.8%</p>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div className="h-8 md:w-1/4 w-1/2 bg-purple rounded-sm p-1 dark:bg-deeppurple">
              <p className="text-dark">Never 🙂</p>
            </div>
            <p className="text-ash dark:text-dark">15.2%</p>
          </div>

          <p className="text-sm text-gray mt-2">
            18:11 . 07 Sep 22 .{" "}
            <span className="text-purple dark:text-deeppurple">
              {" "}
              Twitter for Android
            </span>
          </p>
        </div>

        <div className="lg:w-1/2 lg:text-left text-center mt-2 md:mt-3 lg:mt-0">
          <h2 className="text-purple font-bold text-xl md:text-2xl xmd:text-2xl lg:text-3xl xl:text-3xl dark:text-deeppurple">
            <span className="text-ash dark:text-dark">Googling</span> in between
            conversations <span className="text-ash dark:text-dark">is</span>{" "}
            fast becoming{" "}
            <span className="text-ash dark:text-dark">the new normal.</span>
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Hero;
<div className="h-56 w-56 relative border-2 border-purple"></div>;

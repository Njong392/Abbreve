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
    <main className=" bg-ash md:px-14 dark:bg-dark max-w-screen px-4 py-8 sm:px-6 lg:px-8  lg:bg-snow lg:shadow-md">
      <header className="text-center lg:mt-12">
        <div className="text-4xl md:text-5xl lg:text-7xl mb-5 relative">
          <h1 className="text-deeppurple font-extrabold dark:text-purple">
            Writing on the internet
          </h1>
          <h1 className="text-dark dark:text-ash font-extrabold mt-2 ">
            is changing. IYKYK
          </h1>
          <div className="absolute right-28 bottom-9 xl:visible invisible">
            <div className="w-24 h-4 bg-purple relative -rotate-6">
              <div className="absolute top-[4px]">
                <p className="text-dark dark:text-ash text-sm font-semibold ">
                  If You Know,
                </p>
              </div>
            </div>
          </div>
          <div className="absolute right-12 bottom-3 xl:visible invisible">
            <div className="right-9 w-20 h-4 bg-purple relative -rotate-6">
              <div className="absolute top-[3px]">
                <p className="text-dark dark:text-ash text-sm font-semibold ">
                  You Know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="md:flex flex-wrap justify-center animate-breeze sm:hidden ">
        <img
          src={btw}
          alt="btw"
          className="select-none transition ease-in-out delay-75 hover:-rotate-1 hover:scale-105 rotate-2 h-[15%] w-[15%]"
        />
        <img
          src={fyi}
          alt="fyi"
          className="select-none transition ease-in-out delay-75 hover:rotate-0 hover:scale-105 -rotate-3 h-[15%] w-[15%]"
        />
        <img
          src={idk}
          alt="idk"
          className="select-none transition ease-in-out delay-75 hover:rotate-0 hover:scale-105 rotate-3 h-[15%] w-[15%]"
        />
        <img
          src={ig}
          alt="if"
          className="select-none transition ease-in-out delay-75 hover:rotate-3 hover:scale-105 rotate-6 h-[15%] w-[15%]"
        />
        <img
          src={lfg}
          alt="lfg"
          className="select-none transition ease-in-out delay-75 hover:-rotate-3 hover:scale-105 -rotate-6 h-[15%] w-[15%]"
        />
      </div>

      <Form />

      <section className="block justify-center  items-center md:flex md:flex-col-reverse lg:flex lg:flex-row">
        <div className="lg:w-1/2 lg:px-10 pt-5">
          <p className="text-deeppurple font-bold text-2xl lg:text-3xl dark:text-purple">
            <span className="text-dark dark:text-ash ">
              Abbreve (A-bree-vay) is
            </span>{" "}
            an open source dictionary{" "}
            <span className="text-dark dark:text-ash">for slang.</span>{" "}
          </p>
          <p className="text-dark dark:text-ash font-bold text-2xl lg:text-3xl mt-2  pb-8">
            Curated by the community, for the community.
          </p>
        </div>

        <div className="border-2 p-4 rounded-lg border-deeppurple relative md:mt-0 dark:border-purple">
          <div className="flex gap-2 items-center">
            <img src={nate} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <a
                href="https://twitter.com/Nateemerson/status/1567566265719599105?s=20&t=QAOQu1feHo07evNBHFvAIQ"
                className="text-deeppurple dark:text-purple">
                <p className="font-bold">Nate (DojoJOJO)</p>
                <p className="text-sm">@Nateemerson</p>
              </a>
            </div>
          </div>

          <p className="mt-2">
            <span className="text-gray">Replying to</span>{" "}
            <span className="text-deeppurple dark:text-purple">
              @DunsinWebDev and @njongemy
            </span>
          </p>
          <p className="mt-2 text-dark dark:text-ash ">
            idk wtf ur on about... ICYMI IMHO RTFM, KISS, SHIT or GTFO.
          </p>
          <p className="text-sm text-gray">
            18:31 . 07 Sep 22 .{" "}
            <span className="text-deeppurple dark:text-purple">
              {" "}
              Twitter Web App
            </span>
          </p>

          <div className="absolute w-32 border-2 border-deeppurple rounded-lg p-2 -top-14 -right-4 bg-dark rotate-6 invisible lg:visible dark:border-purple">
            <p className="text-ash text-xl font-bold ">
              Reading shouldn't feel like work.
            </p>
          </div>
        </div>
      </section>

      <section className=" justify-center lg:gap-10 mt-10 items-center flex flex-col lg:flex-row">
        <div className="border-2 p-4 rounded-lg border-deeppurple  relative md:mt-0 dark:border-purple lg:w-96">
          <div className="flex gap-2 items-center">
            <img src={emy} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <a
                href="https://twitter.com/njong_emy/status/1567561277135781888?s=20&t=QAOQu1feHo07evNBHFvAIQ"
                className="text-deeppurple dark:text-purple">
                <p className="font-bold">Emy 🦄⛅</p>
                <p className="text-sm">@njong_emy</p>
              </a>
            </div>
          </div>

          <p className="mt-5 text-dark dark:text-ash ">
            Do you find yourself googling the meaning of slang like hmu, lgtm,
            lfg etc ?
          </p>

          <div className="flex justify-between items-center mt-2">
            <div className="h-8 w-3/4 bg-deeppurple rounded-sm p-1 dark:bg-purple">
              <p className="text-dark">Always 😢</p>
            </div>
            <p className="text-dark dark:text-ash ">84.8%</p>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div className="h-8 md:w-1/4 w-1/2 bg-deeppurple rounded-sm p-1 dark:bg-purple">
              <p className="text-dark">Never 🙂</p>
            </div>
            <p className="text-dark dark:text-ash ">15.2%</p>
          </div>

          <p className="text-sm text-gray mt-2">
            18:11 . 07 Sep 22 .{" "}
            <span className="text-deeppurple dark:text-purple">
              {" "}
              Twitter for Android
            </span>
          </p>
        </div>

        <div className="lg:w-1/2 lg:text-left mt-2 md:mt-3 lg:mt-0">
          <h2 className="text-deeppurple font-bold text-xl md:text-2xl xmd:text-2xl lg:text-3xl xl:text-3xl dark:text-purple">
            <span className="text-dark dark:text-ash">Googling</span> in between
            conversations <span className="text-dark dark:text-ash ">is</span>{" "}
            fast becoming{" "}
            <span className="text-dark dark:text-ash ">the new normal.</span>
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Hero;

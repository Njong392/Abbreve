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
    <main className="bg-dark md:px-40 py-12 px-[24px]">
      <header className="text-center mt-12">
        <div className="text-4xl md:text-7xl mb-5 relative">
          <h1 className="text-purple font-bold">Writing on the internet</h1>
          <h1 className="text-ash font-bold mt-2">is changing. IYKYK</h1>
          <div className="absolute right-14 bottom-9 lg:visible invisible">
            <div className="w-24 h-4 bg-deeppurple relative -rotate-6">
              <div className="absolute top-[3px]">
                <p className="text-ash text-sm font-semibold">If You Know,</p>
              </div>
            </div>
          </div>
          <div className="absolute right-12 bottom-3 lg:visible invisible">
            <div className="right-8 w-20 h-4 bg-deeppurple relative -rotate-6">
              <div className="absolute top-[3px]">
                <p className="text-ash text-sm font-semibold">You Know.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="hidden md:flex flex-wrap justify-center animate-breeze">
        <img src={btw} alt="btw" className="rotate-2 h-[20%] w-[20%]" />
        <img src={fyi} alt="fyi" className="-rotate-3 h-[20%] w-[20%]" />
        <img src={idk} alt="idk" className="rotate-3 h-[20%] w-[20%]" />
        <img src={ig} alt="if" className="rotate-6 h-[20%] w-[20%]" />
        <img src={lfg} alt="lfg" className="-rotate-6 h-[20%] w-[20%]" />
      </div>

      <Form />

      <section className="block justify-center gap-10 items-center md:flex">
        <div className="md:w-1/2 md:pr-20 md:text-left text-center">
          <p className="text-purple font-bold text-3xl">
            <span className="text-ash">Abbreve (A-bree-vay)</span> is an open
            source dictionary for <span className="text-ash">slangs.</span>{" "}
          </p>
          <p className="text-purple font-bold text-3xl mt-2">
            Curated by the community, for the community.
          </p>
        </div>

        <div className="border-2 p-4 rounded-lg border-purple md:rotate-3 relative md:mt-0">
          <div className="flex gap-2 items-center">
            <img src={nate} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <a
                href="https://twitter.com/Nateemerson/status/1567566265719599105?s=20&t=QAOQu1feHo07evNBHFvAIQ"
                className="text-purple">
                <p className="font-bold">Nate (DojoJOJO)</p>
                <p className="text-sm">@Nateemerson</p>
              </a>
            </div>
          </div>

          <p className="mt-4">
            <span className="text-gray">Replying to</span>{" "}
            <span className="text-purple">@DunsinWebDev and @njongemy</span>
          </p>
          <p className="mt-2 text-ash">
            idk wtf ur on about... ICYMI IMHO RTFM, KISS, SHIT or GTFO.
          </p>
          <p className="text-sm text-gray">
            18:31 . 07 Sep 22 .{" "}
            <span className="text-purple"> Twitter Web App</span>
          </p>

          <div className="absolute w-32 border-2 border-purple rounded-lg p-2 -top-14 -right-4 bg-dark rotate-6 invisible lg:visible">
            <p className="text-ash text-xl font-bold ">
              Reading shouldn't feel like work.
            </p>
          </div>
        </div>
      </section>

      <section className="block justify-center gap-10 mt-20 items-center md:flex">
        <div className="border-2 p-4 rounded-lg border-purple md:rotate-3 relative md:mt-0">
          <div className="flex gap-2 items-center">
            <img src={emy} alt="" className="h-12 w-12 rounded-full" />
            <div>
              <a
                href="https://twitter.com/njong_emy/status/1567561277135781888?s=20&t=QAOQu1feHo07evNBHFvAIQ"
                className="text-purple">
                <p className="font-bold">Emy 🦄⛅</p>
                <p className="text-sm">@njong_emy</p>
              </a>
            </div>
          </div>

          <p className="mt-5 text-ash">
            Do you find yourself googling the meaning of slangs like hmu, lgtm,
            lfg etc ?
          </p>

          <div className="flex justify-between items-center mt-2">
            <div className="h-8 w-3/4 bg-purple rounded-sm p-1">
              <p className="text-dark">Always 😢</p>
            </div>
            <p className="text-ash">84.8%</p>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div className="h-8 md:w-1/4 w-1/2 bg-purple rounded-sm p-1">
              <p className="text-dark">Never 🙂</p>
            </div>
            <p className="text-ash">15.2%</p>
          </div>

          <p className="text-sm text-gray mt-2">
            18:11 . 07 Sep 22 .{" "}
            <span className="text-purple"> Twitter for Android</span>
          </p>
        </div>

        <div className="md:w-1/2 md:text-left text-center mt-5 md:mt-0">
          <h2 className="text-purple font-bold text-3xl">
            <span className="text-ash">Googling</span> in between conversations{" "}
            <span className="text-ash">is</span> fast becoming{" "}
            <span className="text-ash">the new normal.</span>
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Hero;
<div className="h-56 w-56 relative border-2 border-purple"></div>;

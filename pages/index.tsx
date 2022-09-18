import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import asset_center from "../assets/center.svg";
import asset_center2 from "../assets/center2.svg";
import {
  useHasConnectionTo,
  useNbrTxs,
  useTopReceiveAccounts,
  useTopSendAccounts,
} from "../utils/requests";

interface LeftContentProps {
  hasConnection: any;
  topReceive: any;
}
const LeftContent = ({ hasConnection, topReceive }: LeftContentProps) => {
  useEffect(() => {
    console.log(topReceive);
  }, [topReceive]);
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
          <h2 className="text-white font-bold">YOUR PART OF DEX</h2>
          <ul>
            {["UNISWAP", "fawegw", "vrvreb", "fveqwgrgq"].map((dex, i) => {
              return <li key={`dexes-${i}`}>{dex}</li>;
            })}
          </ul>
        </div>
        <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
          <div className="w-24 h-2 bg-white" />
          <p>Donec ligula justo, interdum a.</p>
        </div>
      </div>
      <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
        <h2 className="text-white font-bold font-quantico flex flex-col items-end justify-center">
          <div className="text-xl w-full">
            YOU ARE {hasConnection ? "" : "NOT"} A
          </div>
          <div className="text-orange-500 text-4xl w-full">TORNADOCHASH</div>
          <div className="text-xl">USER</div>
        </h2>
      </div>
      <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
        <h2 className="text-white font-bold">
          TOP ACCOUNTS YOU RECEIVED ETH FROM
        </h2>
        <ul>
          {topReceive
            ? topReceive?.slice(0, 5).map((elem: any, i: number) => {
                <li
                  className="flex items-center justify-between"
                  key={`top-r-${i}`}
                >
                  {elem.from}
                  <span>{elem.count}</span>
                </li>;
              })
            : [...new Array(3)].map((_, i) => {
                return (
                  <li
                    className="flex items-center justify-between"
                    key={`top-r-sk-${i}`}
                  >
                    0x00...abc{i}
                    <span>xxx</span>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

interface RightContentProps {
  topSend: any;
  nbrTxs: any;
}
const RightContent = ({ topSend, nbrTxs }: RightContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
          <h2 className="text-white font-bold">
            TOP ACCOUNTS YOU RECEIVED ETH FROM
          </h2>
          <ul>
            {topSend
              ? topSend?.slice(0, 5).map((elem: any, i: number) => {
                  <li
                    className="flex items-center justify-between"
                    key={`top-s-sk${i}`}
                  >
                    {elem.to}
                    <span>{elem.count}</span>
                  </li>;
                })
              : [...new Array(3)].map((_, i) => {
                  return (
                    <li
                      className="flex items-center justify-between"
                      key={`top-s-sk${i}`}
                    >
                      0x00...abc{i}
                      <span>xxx</span>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
            {/** */}
          </div>
          <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
            <h2 className="text-white font-bold">
              Number of transactions in the PAST 30 days
            </h2>
            <strong className="text-[5rem] font-quantico">
              {nbrTxs ?? "78"}
            </strong>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col space-y-4 border border-zinc-500">
        <blockquote>
          <p>
            Ut lobortis ornare lacinia. Mauris venenatis faucibus mi eu semper.
            Mauris a libero non dui rhoncus fermentum. Etiam sit amet blandit
            justo
          </p>
          <span>- AUTHOR</span>
        </blockquote>
      </div>
    </div>
  );
};

interface CenteredContentProps {
  setAddr: any;
}

const CenteredShape = ({ setAddr }: CenteredContentProps) => {
  return (
    <div className="center__container relative">
      <form
        action="/send-data-here"
        method="post"
        className="form__addr flex flex-col gap-4 z-10"
      >
        {/* <label>First name:</label> */}
        <input
          type="text"
          id="first"
          name="first"
          placeholder="ETH ADDRESS..."
        />

        <button onClick={() => {}}>Inspect</button>
      </form>
      <div className="absolute">
        <Image
          src={asset_center}
          alt={"Background shape"}
          className="center__image"
        />
      </div>
      <div className="absolute bottom-0 right-0">
        <Image
          src={asset_center2}
          alt={"Background shape2"}
          className="center__image2"
        />
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [addr, setAddr] = useState();
  const [hasConnection] = useHasConnectionTo(
    "\\xbb1332e692e701bfc0e3c19ffd4dd619c599ea2a"
  );
  const [topReceive] = useTopReceiveAccounts(
    "\\xbb1332e692e701bfc0e3c19ffd4dd619c599ea2a"
  );
  const [topSend] = useTopSendAccounts(
    "\\xbb1332e692e701bfc0e3c19ffd4dd619c599ea2a"
  );
  const [nbrTxs] = useNbrTxs("\\xbb1332e692e701bfc0e3c19ffd4dd619c599ea2a");

  const setAddrCallback = (in_addr: any) => {
    console.log(addr);
    setAddr(in_addr);
  };

  useEffect(() => {
    console.log(hasConnection);
  }, [hasConnection]);
  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black fixed inset-0 w-screen h-screen text-zinc-400">
        <section className="flex items-center justify-end p-4">
          <div className="flex flex-col">
            <span className="text-sm">BALANCE</span>
            <strong className="text-white">23231.032323 ETH</strong>
          </div>
        </section>
        <section className="flex">
          <LeftContent hasConnection={hasConnection} topReceive={topReceive} />
          <div className="w-full flex-grow">
            <CenteredShape setAddr={setAddrCallback} />
            <div className="font-quantico text-[7rem] transform origin-top text-white -rotate-90">
              X-POSIMO
            </div>
          </div>
          <RightContent topSend={topSend} nbrTxs={nbrTxs} />
        </section>
        <div className="flex relative -top-4 ml-[10rem]">
          <div className="p-4 backdrop-blur-md border border-zinc-400">
            <h4>ADDRESS</h4>
            <p>0x0231321awdadaw0d123123</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import { useRef, useState, useEffect } from "react";
import logo from "./assets/logo.png";

function App() {
  const input = useRef(null);

  const locations = ["Graveyard", "Ending"];

  return (
    <div
      className="w-screen min-h-screen h-auto bg-zinc-800 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(./src/assets/bg.png)" }}
    >
      <div className="flex justify-center pt-10 pb-10 h-60 w-auto">
        <img
          src={logo}
          alt=""
          className="hover:cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
      <div className="flex flex-row justify-center mx-auto w-1/2">
        <div className=" flex flex-col justify-between mx-auto w-full h-[40rem] bg-zinc-900 p-3" id="screen">
          <div id="imgs grow-0">
            <p className="text-center text-white">monster title</p>
            <p className="border-white border mb-4 w-40 h-40 mt-4 mx-auto"></p>
            <div id="monster-info" className="justify-center flex flex-row gap-3">
              <p className="text-green-600">monster info</p>
              <p className="text-red-600">monster info</p>
              <p className="text-blue-600">monster info</p>
            </div>
            <hr className="pb-4" />
          </div>
          <div id="text" className="text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quae veniam est quo adipisci quia natus tenetur
            necessitatibus, maiores ipsa.
          </div>
        </div>

        <div className="h-[40rem] w-[15rem] bg-[#5B3E31]" id="backpack">
          <div className="p-4 grid grid-cols-2 gap-2">
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
            <div className="w-16 h-16 bg-white hover:cursor-pointer"></div>
          </div>
          <hr className="w-3/4 mx-auto" />
          <p className="text-center text-white">Character Info</p>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          placeholder="Enter Command: "
          type="text"
          className="w-1/2 p-2"
          ref={input}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              console.log(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;

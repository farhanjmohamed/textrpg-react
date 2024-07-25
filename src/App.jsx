import logo from "./assets/logo.png";

function App() {
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
        <div className=" flex flex-col mx-auto w-full h-[40rem] bg-zinc-900 p-3" id="screen">
          <div id="imgs">
            <pre className="whitespace-pre text-white">skeleton</pre>
          </div>
          <div id="text" className="text-white ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quae veniam est quo adipisci quia natus tenetur
            necessitatibus, maiores ipsa.
          </div>
        </div>

        <div className="h-[40rem] w-[15rem] bg-[#5B3E31] p-4 grid grid-cols-2 gap-4" id="backpack">
          <div className="w-20 h-20 bg-white rounded-lg hover:cursor-pointer"></div>
          <div className="w-20 h-20 bg-white rounded-lg hover:cursor-pointer"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          placeholder="Enter Command: "
          type="text"
          className="w-1/2 p-2"
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

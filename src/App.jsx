import logo from "./assets/logo.png";

function App() {
  return (
    <div
      className="w-screen min-h-screen h-auto bg-zinc-800 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(./src/assets/bg.png)" }}
    >
      <div className="flex justify-center pt-10 pb-10 h-60 w-auto">
        <img src={logo} alt="" />
      </div>
      <div className="flex flex-row justify-center mx-auto w-1/2">
        <div className=" flex flex-col mx-auto w-full h-[40rem] bg-zinc-900" id="screen">
          <div id="imgs">
            <pre className="whitespace-pre text-white">skeleton</pre>
          </div>
          <div id="text" className="text-white ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quae veniam est quo adipisci quia natus tenetur
            necessitatibus, maiores ipsa.
          </div>
        </div>
        <div className="h-[40rem] w-[15rem] bg-yellow-700" id="backpack"></div>
      </div>
      <div className="flex justify-center">
        <input type="text" className="w-1/2" />
      </div>
    </div>
  );
}

export default App;

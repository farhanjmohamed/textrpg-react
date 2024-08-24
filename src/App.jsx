import { useRef, useState, useEffect } from "react";
import logo from "./assets/logo.png";
import brute from "./assets/enemy/Brute.png";
import mage from "./assets/enemy/Mage.png";
import mini from "./assets/enemy/Mini.png";
import reg from "./assets/enemy/Regular.png";

function App() {
  const input = useRef(null);
  const scroll = useRef(null);

  const [name, setName] = useState("");
  const [stats, setStats] = useState({ health: 10, strength: 10, faith: 0.1 });
  const [power, setPower] = useState(stats.strength * stats.faith);
  const [backpack, setBackpack] = useState([{ coin_purse: 0 }]);
  const [index, setIndex] = useState(0);
  const graveyard = [
    {
      name: "Mini Skeleton",
      health: 5,
      image: mini,
      dmg: Math.floor(Math.random() * 2),
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton",
      health: 7,
      image: reg,
      dmg: Math.floor(Math.random() * 3),
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton",
      health: 7,
      image: reg,
      dmg: Math.floor(Math.random() * 3),
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton Brute",
      health: 10,
      image: brute,
      dmg: Math.floor(Math.random() * 3),
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton Brute",
      health: 10,
      image: brute,
      dmg: Math.floor(Math.random() * 3),
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeletal Mage",
      health: 20,
      image: mage,
      dmg: Math.floor(Math.random() * 3),
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "tincture",
    },
  ];
  const [currentEnemy, setCurrentEnemy] = useState(graveyard[index]);

  const [textInfo, setTextInfo] = useState([
    "You stand at the castle gates, ready to explore the unknown world outside. Excitement and apprehension mix inside you as you step into the wild. Your determination to prove yourself as a worthy adventurer and protector of the realm drives you forward. With your sword at your side and a heart full of determination, you step into the unknown, eager to discover what the world has in store for you.",
    "As you wander through the wild, you come across a graveyard filled with the bones of long-dead creatures. The sun is setting, casting an eerie orange glow over the bones. You pause for a moment to take in the sight, your heart pounding in your chest. As you make your way through the graveyard, you hear a rustling in the bones. Suddenly, a group of skeletons rises up from the ground, their bones clacking together in a macabre symphony. With a steady hand on your sword, you prepare to defend yourself against the undead creatures. They come at you with surprising speed, their bony fingers reaching out to grab you.",
  ]);

  if (!currentEnemy) {
    setTextInfo((p) => [...p, "You Win!"]);
  }

  const combat = () => {
    let updatedEnemyHealth = currentEnemy.health - power;
    let updatedPlayerHealth = stats.health - currentEnemy.dmg;

    if (updatedEnemyHealth <= 0) {
      setTextInfo((p) => [...p, `${currentEnemy.name} is dead!`]);
      setStats((p) => ({ ...p, health: p.health + 2, strength: p.strength + 2 }));
      setBackpack((p) => [
        ...p,
        currentEnemy.guaranteed,
        currentEnemy.loot[Math.floor(Math.random() * currentEnemy.loot.length)],
      ]);
      setIndex((i) => i + 1);
      setCurrentEnemy(graveyard[index]);
    } else {
      if (updatedPlayerHealth <= 0) {
        setTextInfo((p) => [...p, "Oh dear! You died!"]);
        setTimeout(() => location.reload(), 2000);
      } else {
        setStats((p) => ({ ...p, health: updatedPlayerHealth }));
        setCurrentEnemy((p) => ({ ...p, health: updatedEnemyHealth }));
        setTextInfo((p) => [
          ...p,
          `You been hit! your health: ${updatedPlayerHealth}. Your enemy: ${updatedEnemyHealth}`,
        ]);
      }
    }
  };

  const handleNameChange = (e) => {
    if (e.key === "Enter") {
      setName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      const inputVal = input.current.value.trim();
      switch (inputVal.toLowerCase()) {
        case "a": //attack
          combat(currentEnemy);
          setTextInfo((p) => [...p, inputVal]);
          input.current.value = "";
          break;
        case "r": // rest
          setStats((p) => ({ ...p, health: p.health + 2 }));
          setTextInfo((p) => [...p, inputVal, "You take a quick breather! +2 health"]);
          input.current.value = "";
          break;
        case "t": //tincture
          //tincture mechanic
          setTextInfo((p) => [...p, inputVal]);
          input.current.value = "";
          break;
        case "f": //flee
          // flee mechanic
          setTextInfo((p) => [...p, inputVal]);
          input.current.value = "";
          break;
        case "q":
          setTextInfo((p) => [...p, "Goodbye!"]);
          setTimeout(() => location.reload(), 1500);
          break;
        default:
          setTextInfo((p) => [...p, "Invalid Action"]);
          input.current.value = "";
      }
    }
  };

  useEffect(() => {
    setPower(stats.strength * stats.faith);
  }, [stats]);

  useEffect(() => {
    if (index < graveyard.length) {
      setCurrentEnemy(graveyard[index]);
    } else {
      setTextInfo((p) => [...p, "You Win!"]);
    }
  }, [index]);

  useEffect(() => {
    setCurrentEnemy(graveyard[0]);
  }, []);

  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [textInfo]);

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
      <div className="flex justify-center text-center pb-2">
        {name === "" ? (
          <input placeholder="Enter Name" type="text" onKeyUp={handleNameChange} />
        ) : (
          <button onClick={() => setName("")} className="bg-gray-500 w-32 rounded-md text-white">
            Change Name
          </button>
        )}
      </div>

      <div>
        <div className="flex flex-row justify-center mx-auto w-1/2">
          <div className=" flex flex-col justify-between mx-auto w-full h-[40rem] bg-zinc-900 p-3" id="screen">
            <div id="imgs grow-0">
              <p className="text-center text-white">{currentEnemy.name}</p>
              <p className="border-white border mb-4 w-40 h-40 mt-4 mx-auto">
                <img src={currentEnemy.image} alt="" />
              </p>
              <div id="monster-info" className="justify-center flex flex-row gap-3">
                <p className="text-green-600">monster info</p>
                <p className="text-red-600">Health: {currentEnemy.health}</p>
                <p className="text-blue-600">monster info</p>
              </div>
              <hr className="pb-4" />
            </div>
            <div className="overflow-y-scroll" ref={scroll}>
              {textInfo.map((x, index) => (
                <div key={index} id="text" className="text-white pb-2 pt-2">
                  {x}
                  <p className="w-1/2 mx-auto border-b-2 border-white pt-2 pb-2" />
                </div>
              ))}
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
            <div className="pl-2 pb-1 text-white">
              <p>{name}</p>
              <p>Health: {stats.health}</p>
              <p>Strength: {stats.strength}</p>
              <p>Faith: {stats.faith}</p>
              <p>Current Power: {power}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            placeholder="(A)ttack, (R)est, (T)incture, (F)lee, (Q)uit "
            type="text"
            className="w-1/2 p-2"
            ref={input}
            onKeyUp={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

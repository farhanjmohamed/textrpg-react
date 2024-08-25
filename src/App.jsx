import { useRef, useState, useEffect } from "react";
import logo from "./assets/logo.png";
import brute from "./assets/enemy/Brute.png";
import mage from "./assets/enemy/Mage.png";
import mini from "./assets/enemy/Mini.png";
import reg from "./assets/enemy/Regular.png";
import char from "./assets/char.png";
import sword from "./assets/items/sword.png";
import dust from "./assets/items/dust.png";
import staff from "./assets/items/staff.png";
import necklace from "./assets/items/necklace.png";
import gold from "./assets/items/gold.png";
import trans from "./assets/items/trans.png";
import bones from "./assets/items/bones.png";

function App() {
  const input = useRef(null);
  const scroll = useRef(null);

  const [name, setName] = useState("");
  const [stats, setStats] = useState({ health: 10, strength: 10, faith: 0.1 });
  const [power, setPower] = useState(stats.strength * stats.faith);
  const [backpack, setBackpack] = useState(["Coins"]);
  const [index, setIndex] = useState(0);
  const [game, setGame] = useState(true);
  const [coinPurse, setCoinPurse] = useState(0);

  const items = [
    { name: "Coins", image: gold },
    { name: "Bone Sword", image: sword },
    { name: "Bone Necklace", image: necklace },
    { name: "Bone Dust", image: dust },
    { name: "Nothing", image: trans },
    { name: "Bones", image: bones },
    { name: "Bone Staff", image: staff },
  ];
  const graveyard = [
    {
      name: "Mini Skeleton",
      health: 5,
      image: mini,
      dmg: 1,
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton",
      health: 7,
      image: reg,
      dmg: 2,
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton",
      health: 7,
      image: reg,
      dmg: 3,
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton Brute",
      health: 10,
      image: brute,
      dmg: 5,
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeleton Brute",
      health: 10,
      image: brute,
      dmg: 7,
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bones",
    },
    {
      name: "Skeletal Mage",
      health: 20,
      image: mage,
      dmg: 9,
      loot: ["Coins", "Bone Sword", "Bone Necklace", "Bone Dust", "Nothing"],
      guaranteed: "Bone Staff",
    },
  ];
  const [currentEnemy, setCurrentEnemy] = useState(graveyard[index]);

  const [textInfo, setTextInfo] = useState([
    "You stand at the castle gates, ready to explore the unknown world outside. Excitement and apprehension mix inside you as you step into the wild. Your determination to prove yourself as a worthy adventurer and protector of the realm drives you forward. With your sword at your side and a heart full of determination, you step into the unknown, eager to discover what the world has in store for you.",
    "As you wander through the wild, you come across a graveyard filled with the bones of long-dead creatures. The sun is setting, casting an eerie orange glow over the bones. You pause for a moment to take in the sight, your heart pounding in your chest. As you make your way through the graveyard, you hear a rustling in the bones. Suddenly, a group of skeletons rises up from the ground, their bones clacking together in a macabre symphony. With a steady hand on your sword, you prepare to defend yourself against the undead creatures. They come at you with surprising speed, their bony fingers reaching out to grab you.",
  ]);

  const combat = () => {
    let updatedEnemyHealth = Math.floor(currentEnemy.health - power);
    let updatedPlayerHealth = Math.floor(stats.health - currentEnemy.dmg);

    if (updatedEnemyHealth <= 0) {
      setTextInfo((p) => [...p, `${currentEnemy.name} is dead!`]);
      setStats((p) => ({ ...p, health: p.health + 2, strength: p.strength + 2 }));

      const randomLoot = currentEnemy.loot[Math.floor(Math.random() * currentEnemy.loot.length)];

      if (randomLoot === "Coins") {
        setCoinPurse((p) => p + 2);
      } else {
        setBackpack((p) => [...p, randomLoot]);
      }
      setBackpack((p) => [...p, currentEnemy.guaranteed]);
      if (index + 1 < graveyard.length) {
        setIndex((i) => i + 1);
        setCurrentEnemy(graveyard[index + 1]);
      } else {
        setGame(false);
      }
    } else {
      if (updatedPlayerHealth <= 0) {
        setTextInfo((p) => [...p, "Oh dear! You died!"]);
        setTimeout(() => location.reload(), 2000);
      } else {
        setStats((p) => ({ ...p, health: updatedPlayerHealth }));
        setCurrentEnemy((p) => ({ ...p, health: updatedEnemyHealth }));
        setTextInfo((p) => [...p, `You take a mighty swing!`]);
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
          setTextInfo((p) => [...p, `${currentEnemy.name} back swings at you!`]);
          input.current.value = "";
          break;
        case "r": // rest
          setStats((p) => ({ ...p, health: p.health + 2 }));
          setTextInfo((p) => [...p, inputVal, "You take a quick breather! +2 health"]);
          input.current.value = "";
          break;
        case "f": //flee
          setIndex(0);
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
    if (game === false) {
      setTextInfo((p) => [...p, "You Win!"]);
      setTimeout(() => location.reload(), 2000);
    }
  }, [game]);

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
          <input
            className="text-sm text-center"
            placeholder="Adventurer Name?"
            type="text"
            onKeyUp={handleNameChange}
          />
        ) : (
          <button onClick={() => setName("")} className="bg-gray-500 w-32 rounded-md text-white">
            Change Name
          </button>
        )}
      </div>

      <div>
        <div className="flex flex-row justify-center mx-auto w-1/2">
          <div className=" flex flex-col justify-between mx-auto w-full h-[40rem] bg-zinc-900 p-3" id="screen">
            {game ? (
              <div id="imgs grow-0">
                <p className="text-center text-white">{currentEnemy.name}</p>
                <p className="border-white border mb-4 w-40 h-40 mt-4 mx-auto">
                  <img src={currentEnemy.image} alt="" />
                </p>
                <div id="monster-info" className="justify-center flex flex-row gap-3">
                  <p className="text-green-600">Health: {currentEnemy.health}</p>
                  <p className="text-red-600">Dmg: {currentEnemy.dmg}</p>
                  <p className="text-blue-600">Guaranteed Loot: {currentEnemy.guaranteed}</p>
                </div>
                <hr className="pb-4" />
              </div>
            ) : (
              <p className="text-5xl text-white text-center pt-8 ">You Win!</p>
            )}

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
            <div className="p-4 grid grid-cols-2 gap-2 h-[19rem] overflow-y-scroll">
              {backpack.map((x, index) => {
                if (x === "Coins") {
                  return (
                    <div key={index} className="text-white flex flex-row w-12 h-12">
                      <img src={gold} alt="" />
                      {coinPurse}
                    </div>
                  );
                } else {
                  const item = items.find((item) => item.name === x);
                  if (item) {
                    return (
                      <div
                        key={index}
                        className="hover:cursor-pointer"
                        onClick={() => {
                          if (item.name === "Bones") {
                            setStats((p) => {
                              let numOfBone = 0;
                              for (let z = 0; z < backpack.length; z++) {
                                if (backpack[z] === "Bones") {
                                  numOfBone++;
                                }
                              }

                              let maxFaithIncrease = 1;
                              let faithIncrease = Math.min(numOfBone * 0.2, maxFaithIncrease);

                              return {
                                ...p,
                                faith: p.faith + faithIncrease,
                              };
                            });
                            setBackpack((p) => p.filter((i) => i !== "Bones"));
                          } else if (item.name === "Bone Dust") {
                            let numOfDust = 0;
                            for (let z = 0; z < backpack.length; z++) {
                              if (backpack[z] === "Bones") {
                                numOfDust++;
                              }
                            }
                            setCoinPurse((p) => p + 0.5 * numOfDust);
                            setBackpack((p) => p.filter((i) => i !== "Bone Dust"));
                          } else if (item.name === "Bone Necklace") {
                            setCoinPurse((p) => p + 2);
                            setBackpack((p) => p.filter((i) => i !== "Bone Necklace"));
                          }
                        }}
                      >
                        <img src={item.image} alt={item.name} />
                      </div>
                    );
                  }
                }
                return null;
              })}
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
            <div className="mt-4 w-40 h-40 mx-auto">
              <img src={char} alt="" />
            </div>
            <div className="pt-2 flex justify-center">
              <button
                className="bg-red-600 text-yellow-300 text-center rounded w-32"
                onClick={() => {
                  if (coinPurse >= 5) {
                    setStats((p) => ({
                      ...p,
                      health: p.health + 10,
                    }));
                    setCoinPurse((p) => p - 5);
                  } else {
                    return;
                  }
                }}
              >
                buy potion: 5c
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            placeholder="(A)ttack, (R)est, (F)lee, (Q)uit "
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

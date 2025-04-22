import React, { useState, useEffect, useRef } from "react";

const FullscreenSlotMachine = ({ initialNumber = "1950" }) => {
  let desireName;
  if (initialNumber === "5716") {
    desireName = "U Win Than Tun";
  } else if (initialNumber === "7777") {
    desireName = "Ko Win";
  } else if (initialNumber === "7188") {
    desireName = "U Htin Kyaw Linn";
  } else if (initialNumber === "7856") {
    desireName = "Asmita Thakur";
  } else if (initialNumber === "1950") {
    desireName = "La Min Thein";
  } else {
    desireName = "No Winner";
  }
  // Format the desired number to ensure it's 4 digits
  const targetNumber = initialNumber
    .toString()
    .padStart(4, "0")
    .slice(0, 4)
    .split("");
  const [numbers, setNumbers] = useState(["0", "0", "0", "0"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const spinningRefs = useRef([]);
  // const [leverPulled, setLeverPulled] = useState(false);
  const [spinComplete, setSpinComplete] = useState(false);

  // Initialize refs array
  useEffect(() => {
    spinningRefs.current = spinningRefs.current.slice(0, 4);
  }, []);

  // Start the spinning animation with enhanced visuals
  const startSpin = () => {
    if (isSpinning) return;

    // Pull the lever with improved animation
    // setLeverPulled(true);
    // setTimeout(() => setLeverPulled(false), 600);

    setIsSpinning(true);
    setShowWinAnimation(false);
    setSpinComplete(false);

    // Create dynamic reel numbers with weighted randomization
    const reelNumbers = Array(4)
      .fill(0)
      .map(() => {
        const numbers = [];
        for (let i = 0; i < 30; i++) {
          numbers.push(Math.floor(Math.random() * 10).toString());
        }
        return numbers;
      });

    // Enhanced cascading effect for each reel
    [0, 1, 2, 3].forEach((index) => {
      let currentFrame = 0;

      // Start rapid digit changes with varying speeds
      const intervalId = setInterval(() => {
        setNumbers((prevNumbers) => {
          const newNumbers = [...prevNumbers];
          newNumbers[index] =
            reelNumbers[index][currentFrame % reelNumbers[index].length];
          currentFrame++;
          return newNumbers;
        });
      }, 40 + index * 20); // Slightly different speeds for more realistic feel

      // Store the interval ID in the ref
      spinningRefs.current[index] = intervalId;

      // Stop the spinning with improved timing and add bounce effect
      setTimeout(() => {
        clearInterval(intervalId);

        // Set final digit with a "settling" animation
        setNumbers((prevNumbers) => {
          const newNumbers = [...prevNumbers];
          newNumbers[index] = targetNumber[index];
          return newNumbers;
        });

        // Add sound effect trigger point
        if (index === 3) {
          setTimeout(() => {
            setIsSpinning(false);
            setSpinComplete(true);

            // Show win animation after a slight delay
            setTimeout(() => {
              setShowWinAnimation(true);
            }, 300);
          }, 300);
        }
      }, 3000 + index * 3000); // Longer, more varied spin times
    });
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col justify-between bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-indigo-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}></div>
          ))}
        </div>
      </div>

      {/* Header/Title */}
      <div className="w-full z-10 pt-4 pb-2 px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-200 to-indigo-300">
          KYAY OO KYEE PETROLEUM PRODUCTS CO.,LTD
        </h1>
        <div className="text-center text-indigo-300 text-xl mt-1">
          LUCKY DRAW
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-6">
        {/* Main display with glass morphism effect */}
        <div className="w-full bg-black/40 backdrop-filter backdrop-blur-md p-6 md:p-8 rounded-2xl mb-6 border border-indigo-400/30 shadow-xl shadow-indigo-900/30">
          {/* Reels container */}
          <div className="flex space-x-3 md:space-x-4 mb-4">
            {numbers.map((number, index) => (
              <div key={index} className="relative flex-1 overflow-hidden">
                <div
                  className={`
                    h-24 sm:h-32 md:h-40 lg:h-48 w-full flex items-center justify-center 
                    bg-gradient-to-b from-gray-900 to-black
                    border-2 ${
                      spinComplete && number === targetNumber[index]
                        ? "border-indigo-400"
                        : "border-gray-700"
                    }
                    rounded-lg
                    font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold
                    ${isSpinning ? "animate-reel-spin" : ""}
                    ${showWinAnimation ? "text-indigo-300" : "text-indigo-100"}
                    relative overflow-hidden transition-all duration-300
                  `}
                  style={{
                    animationDuration: `${0.15 + index * 0.04}s`,
                    boxShadow: "inset 0 0 20px rgba(79, 70, 229, 0.3)",
                  }}>
                  {/* Number display with glow effect */}
                  <div
                    className={`relative z-10 transition-all duration-300 ${
                      showWinAnimation ? "text-shadow-glow" : ""
                    }`}>
                    {number}
                  </div>

                  {/* Reel light effects */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 right-0 h-px bg-indigo-500/30"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-indigo-500/30"></div>
                    {showWinAnimation && (
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-indigo-500/10"></div>
                    )}
                  </div>
                </div>

                {/* Reel indicators */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500/50 rounded-r"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500/50 rounded-l"></div>
              </div>
            ))}
          </div>

          {/* Reel shadows/reflections */}
          <div className="flex space-x-3 md:space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-gradient-to-b from-indigo-400/10 to-transparent"></div>
            ))}
          </div>
        </div>

        {/* Winner display with improved animation */}
        {showWinAnimation && (
          <div className="w-full max-w-3xl mx-auto mb-6">
            <div className="bg-black/50 backdrop-filter backdrop-blur-md p-5 rounded-xl border-2 border-indigo-400 shadow-lg shadow-indigo-500/30">
              <div className="animate-pulse-glow bg-gradient-to-r from-indigo-500/20 via-indigo-300/30 to-indigo-500/20 p-4 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-200 font-mono">
                  ✨ JACKPOT:{desireName} {numbers.join("")}! ✨
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom section with controls */}
      <div className="relative w-full flex justify-center items-center pb-8 pt-4 z-10">
        {/* Updated slot machine lever */}
        <div className="absolute right-8 md:right-16 lg:right-24 top-0 flex flex-col items-center">
          <div className="w-6 h-32 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-full"></div>
          {/* <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-indigo-300 shadow-lg transition-all duration-500 ${
              leverPulled
                ? "translate-y-16 shadow-indigo-500/50"
                : "shadow-indigo-500/20"
            }`}></div> */}
        </div>

        {/* Modernized spin button */}
        <button
          onClick={startSpin}
          disabled={isSpinning}
          className={`
            px-12 py-5 rounded-full text-2xl font-bold
            transition-all duration-300 transform
            ${
              isSpinning
                ? "bg-gray-800 cursor-not-allowed border-gray-700 opacity-70"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 border-2 border-indigo-400"
            }
            text-white relative overflow-hidden group
          `}>
          {/* Button text */}
          <span className="relative z-10">
            {isSpinning ? "SPINNING..." : "SPIN NOW!"}
          </span>

          {/* Button glow effect */}
          {!isSpinning && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/0 via-indigo-400/30 to-indigo-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-indigo-300/70 text-sm pb-2">
        Try your luck at Kyay Oo Kyee
      </div>
    </div>
  );
};

// Enhanced animation styles
const StyleTag = () => {
  return (
    <style jsx global>{`
      @keyframes reel-spin {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-25px);
        }
      }
      .animate-reel-spin {
        animation: reel-spin 0.1s linear infinite;
      }
      @keyframes pulse-glow {
        0%,
        100% {
          opacity: 1;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.7);
        }
        50% {
          opacity: 0.8;
          box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
        }
      }
      .animate-pulse-glow {
        animation: pulse-glow 1.5s ease-in-out infinite;
      }
      .text-shadow-glow {
        text-shadow: 0 0 10px rgba(129, 140, 248, 0.8);
      }
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        33% {
          transform: translateY(-10px) translateX(10px);
        }
        66% {
          transform: translateY(10px) translateX(-10px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
    `}</style>
  );
};

const FullscreenSlotMachineWithStyles = (props) => (
  <>
    <StyleTag />
    <FullscreenSlotMachine {...props} />
  </>
);

export default FullscreenSlotMachineWithStyles;

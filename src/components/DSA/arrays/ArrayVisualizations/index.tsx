import React, { useState, useEffect } from "react";

const ArrayVisualizations: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(300);
  const [minIndex, setMinIndex] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from(
      { length: 12 },
      () => Math.ceil(Math.random() * 90) + 10
    );
    setArray(newArray);
  };

  const findLowest = async () => {
    setIsDisabled(true);
    setIsSorting(true);
    let minVal = array[0];
    let minIdx = 0;
    for (let j = 1; j < array.length; j++) {
      setCurrentIndex(j);
      if (array[j] < minVal) {
        minVal = array[j];
        minIdx = j;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    setMinIndex(minIdx);
    setIsSorting(false);
    setIsDisabled(false);
  };

  const resetArray = () => {
    generateArray();
    setMinIndex(null);
  };

  return (
    <div className="p-5 border border-blue-500 rounded-md shadow-md dark:border-gray-100 dark:bg-gray-800">
      <div className="flex justify-center items-center mb-4">
        <p className="mb-4">
          Speed:{" "}
          <input
            type="range"
            min="50"
            max="500"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="ml-2"
          />
        </p>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={findLowest}
            disabled={isDisabled || isSorting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 border border-blue-700"
          >
            Find Lowest
          </button>
          <button
            onClick={resetArray}
            disabled={isDisabled || isSorting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 border border-green-700"
          >
            New Values
          </button>
        </div>
      </div>
      <p className="m-2 mb-6 text-center">
        Lowest value of{" "}
        <span className="font-bold">
          [
          {array.map(
            (value, index) =>
              `${value}${index === array.length - 1 ? "" : ", "}`
          )}
          ]{" "}
        </span>
        : &nbsp;
        <span className="font-bold text-[--ifm-color-primary]">
          {minIndex !== null ? array[minIndex] : null}
        </span>
      </p>
      <div className="flex justify-center items-end h-72">
        {array.map((value, index) => (
          <div
            key={value}
            className={`w-8 mx-1 bg-blue-500 transition-all duration-300
              ${index === minIndex ? "bg-red-500" : ""}
              ${index === currentIndex ? "bg-yellow-300" : ""}`}
            style={{ height: `${value * 3}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizations;

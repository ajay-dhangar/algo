import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import "../../css/visualiezer.css";

const DSARoadmap: React.FC = () => {
  useEffect(() => {
    function swap(e: HTMLElement, r: HTMLElement) {
        let t = e.style.height;
        e.style.height = r.style.height;
        r.style.height = t;
      }
  
      function disableSortingBtn() {
        document.querySelector<HTMLButtonElement>(".bubbleSort")!.disabled = true;
        document.querySelector<HTMLButtonElement>(".insertionSort")!.disabled = true;
        document.querySelector<HTMLButtonElement>(".mergeSort")!.disabled = true;
        document.querySelector<HTMLButtonElement>(".quickSort")!.disabled = true;
        document.querySelector<HTMLButtonElement>(".selectionSort")!.disabled = true;
      }
  
      function disableSizeSlider() {
        (document.querySelector("#arr_sz") as HTMLInputElement).disabled = true;
      }

      function enableSizeSlider() {
        (document.querySelector("#arr_sz") as HTMLInputElement).disabled = false;
      }
      function disableNewArrayBtn() {
        (document.querySelector(".newArray") as HTMLButtonElement).disabled = true;
      }
      function enableNewArrayBtn() {
        (document.querySelector(".newArray") as HTMLButtonElement).disabled = false;
      }

      function enableSortingBtn() {
        (document.querySelector(".bubbleSort") as HTMLButtonElement).disabled = false;
        (document.querySelector(".insertionSort") as HTMLButtonElement).disabled = false;
        (document.querySelector(".mergeSort") as HTMLButtonElement).disabled = false;
        (document.querySelector(".quickSort") as HTMLButtonElement).disabled = false;
        (document.querySelector(".selectionSort") as HTMLButtonElement).disabled = false;
      }
  
      function waitforme(e: number): Promise<void> {
        return new Promise((r) => {
          setTimeout(() => {
            r();
          }, e);
        });
      }
  
      let arraySize = document.querySelector("#arr_sz") as HTMLInputElement;
      let delayElement = document.querySelector("#speed_input") as HTMLInputElement;
  
      let delay = 260;
  
      arraySize.addEventListener("input", function () {
        createNewArray(parseInt(arraySize.value));
      });
  
      delayElement.addEventListener("input", function () {
        delay = 320 - parseInt(delayElement.value);
      });
  
      let array: number[] = [];
  
      function createNewArray(e: number = 60) {
        deleteChild();
        array = [];
        for (let r = 0; r < e; r++) array.push(Math.floor(250 * Math.random()) + 1);
        
        const barsContainer = document.querySelector("#bars") as HTMLElement;
  
        for (let t = 0; t < e; t++) {
          const bar = document.createElement("div");
          bar.style.height = 1.5 * array[t] + "px";
          bar.classList.add("bar", "flex-item", `barNo${t}`);
          barsContainer.appendChild(bar);
        }
      }
  
      function deleteChild() {
        const barsContainer = document.querySelector("#bars") as HTMLElement;
        barsContainer.innerHTML = "";
      }
  
      createNewArray();
  
      const newArrayBtn = document.querySelector(".newArray") as HTMLButtonElement;
      
      newArrayBtn.addEventListener("click", function () {
        enableSortingBtn();
        createNewArray(parseInt(arraySize.value));
      });
    }

   // bubble sort
  async function bubble(): Promise<void> {
    const ele = document.querySelectorAll(".bar");
    for (let i = 0; i < ele.length - 1; i++) {
      for (let j = 0; j < ele.length - i - 1; j++) {
        console.log("In jth loop");
        (ele[j] as HTMLElement).style.background = "blue";
        (ele[j + 1] as HTMLElement).style.background = "blue";
        // Wait for every comparison, not just swaps, so the highlighted
        // bars remain visible before their color is reset.
        await waitforme(delay);
        if (parseInt((ele[j] as HTMLElement).style.height) > parseInt((ele[j + 1] as HTMLElement).style.height)) {
          swap(ele[j] as HTMLElement, ele[j + 1] as HTMLElement);
        }
        (ele[j] as HTMLElement).style.background = "cyan";
        (ele[j + 1] as HTMLElement).style.background = "cyan";
      }
      (ele[ele.length - 1 - i] as HTMLElement).style.background = "green";
    }
    (ele[0] as HTMLElement).style.background = "green";
  }
  const bubSortbtn = document.querySelector(".bubbleSort") as HTMLButtonElement;
  bubSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await bubble();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
  });

  
  // insertion sort
  async function insertion(): Promise<void> {
    const ele = document.querySelectorAll(".bar");
    (ele[0] as HTMLElement).style.background = "green";
    for (let i = 1; i < ele.length; i++) {
      let j = i - 1;
      let key = (ele[i] as HTMLElement).style.height;
      (ele[i] as HTMLElement).style.background = "blue";
      await waitforme(delay);
      while (j >= 0 && parseInt((ele[j] as HTMLElement).style.height) > parseInt(key)) {
        (ele[j] as HTMLElement).style.background = "blue";
        (ele[j + 1] as HTMLElement).style.height = (ele[j] as HTMLElement).style.height;
        j--;
        await waitforme(delay);
      }
      (ele[j + 1] as HTMLElement).style.height = key;
      for (let k = i; k >= 0; k--) {
        (ele[k] as HTMLElement).style.background = "green";
      }
      (ele[j + 1] as HTMLElement).style.height = key;
      (ele[i] as HTMLElement).style.background = "green";
    }
  }
  const inSortbtn = document.querySelector(".insertionSort") as HTMLButtonElement;
  inSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
  });

     // Merge Sort
     async function merge(arr: NodeListOf<Element>, left: number, mid: number, right: number): Promise<void> {
        const n1 = mid - left + 1; // Length of left subarray
        const n2 = right - mid; // Length of right subarray
  
        let leftArr: string[] = [];
        let rightArr: string[] = [];
  
        for (let i = 0; i < n1; i++) {
          await waitforme(delay);
          (arr[left + i] as HTMLElement).style.backgroundColor = "orange";
          leftArr[i] = (arr[left + i] as HTMLElement).style.height;
        }
  
        for (let j = 0; j < n2; j++) {
          await waitforme(delay);
          (arr[mid + 1 + j] as HTMLElement).style.backgroundColor = "yellow";
          rightArr[j] = (arr[mid + 1 + j] as HTMLElement).style.height;
        }
  
        await waitforme(delay);
        while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
          ele[j].style.background = "blue";
          ele[j + 1].style.height = ele[j].style.height;
          j--;
          await waitforme(delay);
          for (let k = i; k >= 0; k--) {
            ele[k].style.background = "green";
          }
        }
        ele[j + 1].style.height = key;
        ele[i].style.background = "green";
      }
    }
    const inSortbtn = document.querySelector(".insertionSort");
    inSortbtn.addEventListener("click", async function () {
      disableSortingBtn();
      disableSizeSlider();
      disableNewArrayBtn();
      await insertion();
      enableSortingBtn();
      enableSizeSlider();
      enableNewArrayBtn();
    });
    // Merge Sort
    async function merge(arr: NodeListOf<Element>, left: number, mid: number, right: number) {
      const n1 = mid - left + 1; // Length of left subarray
      const n2 = right - mid; // Length of right subarray

      let leftArr: string[] = [];
      let rightArr: string[] = [];

      for (let i = 0; i < n1; i++) {
        await waitforme(delay);
        (arr[left + i] as HTMLElement).style.backgroundColor = "orange";
        leftArr[i] = (arr[left + i] as HTMLElement).style.height;
      }

      for (let j = 0; j < n2; j++) {
        await waitforme(delay);
        (arr[mid + 1 + j] as HTMLElement).style.backgroundColor = "yellow";
        rightArr[j] = (arr[mid + 1 + j] as HTMLElement).style.height;
      }

      await waitforme(delay);

      let i = 0, j = 0, k = left;

      while (i < n1 && j < n2) {
        await waitforme(delay);

        if (parseInt(leftArr[i]) <= parseInt(rightArr[j])) {
          (arr[k] as HTMLElement).style.height = leftArr[i];
          (arr[k] as HTMLElement).style.backgroundColor = "lightgreen";
          i++;
        } else {
          (arr[k] as HTMLElement).style.height = rightArr[j];
          (arr[k] as HTMLElement).style.backgroundColor = "lightgreen";
          j++;
        }
        k++;
      }
  
      async function mergeSort(arr: NodeListOf<Element>, left: number, right: number): Promise<void> {
        if (left >= right) return;
  
        const mid = Math.floor((left + right) / 2);
        
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        
        await merge(arr, left, mid, right);
      }
  
      const mergeSortBtn = document.querySelector(".mergeSort") as HTMLButtonElement;
      
      mergeSortBtn.addEventListener("click", async function () {
        let barsElements = document.querySelectorAll(".bar");
        
        disableSortingBtn();
        
        await mergeSort(barsElements, 0, barsElements.length - 1);
  
        enableSortingBtn();
      });
  

     // quick sort
  async function partitionLomuto(
    bars: NodeListOf<Element>,
    low: number,
    pivotIndex: number
  ): Promise<number> {
    let partitionIdx = low - 1;
    (bars[pivotIndex] as HTMLElement).style.background = "red";
    for (let r = low; r <= pivotIndex - 1; r++) {
      (bars[r] as HTMLElement).style.background = "yellow";
      await waitforme(delay);
      if (parseInt((bars[r] as HTMLElement).style.height) < parseInt((bars[pivotIndex] as HTMLElement).style.height)) {
        console.log("In partitionLomuto for j if");
        partitionIdx++;
        swap(bars[partitionIdx] as HTMLElement, bars[r] as HTMLElement);
        (bars[partitionIdx] as HTMLElement).style.background = "orange";
        if (partitionIdx !== r) {
          (bars[r] as HTMLElement).style.background = "orange";
        }
        await waitforme(delay);
      } else {
        (bars[r] as HTMLElement).style.background = "pink";
      }
    }
    partitionIdx++;
    await waitforme(delay);
    swap(bars[partitionIdx] as HTMLElement, bars[pivotIndex] as HTMLElement);
    (bars[pivotIndex] as HTMLElement).style.background = "pink";
    (bars[partitionIdx] as HTMLElement).style.background = "green";
    await waitforme(delay);
    for (let i = 0; i < bars.length; i++) {
      if ((bars[i] as HTMLElement).style.background !== "green") {
        (bars[i] as HTMLElement).style.background = "cyan";
      }
    }
    return partitionIdx;
  }
  async function quickSort(
    bars: NodeListOf<Element>,
    low: number,
    high: number
  ): Promise<void> {
    if (low < high) {
      let pivotFinalIdx = await partitionLomuto(bars, low, high);
      await quickSort(bars, low, pivotFinalIdx - 1);
      await quickSort(bars, pivotFinalIdx + 1, high);
    } else if (low >= 0 && high >= 0 && low < bars.length && high < bars.length) {
      (bars[high] as HTMLElement).style.background = "green";
      (bars[low] as HTMLElement).style.background = "green";
    }
  }
  const quickSortbtn = document.querySelector(".quickSort") as HTMLButtonElement;
  quickSortbtn.addEventListener("click", async function () {
    const bars = document.querySelectorAll(".bar");
    const lastIdx = bars.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quickSort(bars, 0, lastIdx);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
  });

  // selection sort
  async function selection(): Promise<void> {
    const bars = document.querySelectorAll(".bar");
    for (let t = 0; t < bars.length; t++) {
      let minIdx = t;
      (bars[t] as HTMLElement).style.background = "blue";
      for (let a = t + 1; a < bars.length; a++) {
        (bars[a] as HTMLElement).style.background = "red";
        await waitforme(delay);
        if (parseInt((bars[a] as HTMLElement).style.height) < parseInt((bars[minIdx] as HTMLElement).style.height)) {
          if (minIdx !== t) {
            (bars[minIdx] as HTMLElement).style.background = "cyan";
          }
          minIdx = a;
        } else {
          (bars[a] as HTMLElement).style.background = "cyan";
        }
      }
      await waitforme(delay);
      swap(bars[minIdx] as HTMLElement, bars[t] as HTMLElement);
      (bars[minIdx] as HTMLElement).style.background = "cyan";
      (bars[t] as HTMLElement).style.background = "green";
    }
  }
  const selectionSortbtn = document.querySelector(".selectionSort") as HTMLButtonElement;
  selectionSortbtn.addEventListener("click", async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await selection();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
  });
  
    
  }, []);

  return (
    <Layout
      title="Visual Format Of Sorting Algorithms"
      description="Visualize Sorting Algorithms"
    >
      <div className="min-h-screen bg-dark text-white">
        <div className="container mx-auto py-8 px-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Sorting Visualizer</h1>
          <nav>
            <div className="row">
              <div className="col gap-2 d-sm-flex" id="newArray">
                <button
                  type="button"
                  className="btn btn-outline-success btn-dark newArray"
                >
                  New Array
                </button>
              </div>
              <div className="col" id="input">
                <span id="size">
                  Size
                  <input
                    id="arr_sz"
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    defaultValue="40"
                  />
                </span>
                <span id="speed">
                  Speed
                  <input
                    id="speed_input"
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    defaultValue="100"
                  />
                </span>
              </div>
              <div className="col gap-2 d-sm-flex justify-content-end">
                <button type="button" className="btn btn-outline-primary btn-dark bubbleSort">
                  Bubble Sort
                </button>
                <button type="button" className="btn btn-outline-primary btn-dark selectionSort">
                  Selection Sort
                </button>
                <button type="button" className="btn btn-outline-primary btn-dark insertionSort">
                  Insertion Sort
                </button>
                <button type="button" className="btn btn-outline-primary btn-dark quickSort">
                  Quick Sort
                </button>
                <button type="button" className="btn btn-outline-primary btn-dark mergeSort">
                  Merge Sort
                </button>
              </div>
            </div>
          </nav>
          <div id="bars" className="flex-container"></div>
        </div>
      </div>
    </Layout>
  );
};

export default DSARoadmap;
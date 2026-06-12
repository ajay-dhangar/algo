import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import "../../css/visualiezer.css";

const DSARoadmap: React.FC = () => {
  useEffect(() => {
    // 1. Helper for swapping heights
    function swap(e: HTMLElement, r: HTMLElement) {
      let t = e.style.height;
      e.style.height = r.style.height;
      r.style.height = t;
    }

    // 2. Button and input references using clean TypeScript generics
    const bubbleSortBtn = document.querySelector<HTMLButtonElement>(".bubbleSort");
    const insertionSortBtn = document.querySelector<HTMLButtonElement>(".insertionSort");
    const mergeSortBtn = document.querySelector<HTMLButtonElement>(".mergeSort");
    const quickSortBtn = document.querySelector<HTMLButtonElement>(".quickSort");
    const selectionSortBtn = document.querySelector<HTMLButtonElement>(".selectionSort");
    const newArrayBtn = document.querySelector<HTMLButtonElement>(".newArray");
    const arraySizeInput = document.querySelector<HTMLInputElement>("#arr_sz");
    const speedInput = document.querySelector<HTMLInputElement>("#speed_input");

    // 3. Disable / Enable helpers
    function disableSortingBtn() {
      if (bubbleSortBtn) bubbleSortBtn.disabled = true;
      if (insertionSortBtn) insertionSortBtn.disabled = true;
      if (mergeSortBtn) mergeSortBtn.disabled = true;
      if (quickSortBtn) quickSortBtn.disabled = true;
      if (selectionSortBtn) selectionSortBtn.disabled = true;
    }

    function enableSortingBtn() {
      if (bubbleSortBtn) bubbleSortBtn.disabled = false;
      if (insertionSortBtn) insertionSortBtn.disabled = false;
      if (mergeSortBtn) mergeSortBtn.disabled = false;
      if (quickSortBtn) quickSortBtn.disabled = false;
      if (selectionSortBtn) selectionSortBtn.disabled = false;
    }

    function disableSizeSlider() {
      if (arraySizeInput) arraySizeInput.disabled = true;
    }

    function enableSizeSlider() {
      if (arraySizeInput) arraySizeInput.disabled = false;
    }

    function disableNewArrayBtn() {
      if (newArrayBtn) newArrayBtn.disabled = true;
    }

    function enableNewArrayBtn() {
      if (newArrayBtn) newArrayBtn.disabled = false;
    }

    // 4. Time wait helper
    function waitforme(millis: number): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, millis);
      });
    }

    let delay = 260;

    if (arraySizeInput) {
      arraySizeInput.addEventListener("input", function () {
        createNewArray(parseInt(arraySizeInput.value));
      });
    }

    if (speedInput) {
      speedInput.addEventListener("input", function () {
        delay = 320 - parseInt(speedInput.value);
      });
    }

    let array: number[] = [];

    function createNewArray(size: number = 60) {
      deleteChild();
      array = [];
      for (let r = 0; r < size; r++) {
        array.push(Math.floor(250 * Math.random()) + 1);
      }
      
      const barsContainer = document.querySelector<HTMLElement>("#bars");
      if (barsContainer) {
        for (let t = 0; t < size; t++) {
          const bar = document.createElement("div");
          bar.style.height = 1.5 * array[t] + "px";
          bar.classList.add("bar", "flex-item", `barNo${t}`);
          barsContainer.appendChild(bar);
        }
      }
    }

    function deleteChild() {
      const barsContainer = document.querySelector<HTMLElement>("#bars");
      if (barsContainer) {
        barsContainer.innerHTML = "";
      }
    }

    // Initialize array on mount
    createNewArray();

    if (newArrayBtn) {
      newArrayBtn.addEventListener("click", function () {
        enableSortingBtn();
        if (arraySizeInput) {
          createNewArray(parseInt(arraySizeInput.value));
        } else {
          createNewArray();
        }
      });
    }

    // --- BUBBLE SORT ---
    async function bubble(): Promise<void> {
      const ele = document.querySelectorAll<HTMLElement>(".bar");
      for (let i = 0; i < ele.length - 1; i++) {
        for (let j = 0; j < ele.length - i - 1; j++) {
          ele[j].style.background = "blue";
          ele[j + 1].style.background = "blue";
          await waitforme(delay);
          if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
            swap(ele[j], ele[j + 1]);
          }
          ele[j].style.background = "cyan";
          ele[j + 1].style.background = "cyan";
        }
        ele[ele.length - 1 - i].style.background = "green";
      }
      if (ele.length > 0) {
        ele[0].style.background = "green";
      }
    }

    if (bubbleSortBtn) {
      bubbleSortBtn.addEventListener("click", async function () {
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await bubble();
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
      });
    }

    // --- INSERTION SORT ---
    async function insertion(): Promise<void> {
      const ele = document.querySelectorAll<HTMLElement>(".bar");
      if (ele.length > 0) {
        ele[0].style.background = "green";
      }
      for (let i = 1; i < ele.length; i++) {
        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = "blue";
        await waitforme(delay);
        while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
          ele[j].style.background = "blue";
          ele[j + 1].style.height = ele[j].style.height;
          j--;
          await waitforme(delay);
        }
        ele[j + 1].style.height = key;
        for (let k = i; k >= 0; k--) {
          ele[k].style.background = "green";
        }
      }
    }

    if (insertionSortBtn) {
      insertionSortBtn.addEventListener("click", async function () {
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await insertion();
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
      });
    }

    // --- MERGE SORT ---
    async function merge(arr: NodeListOf<HTMLElement>, left: number, mid: number, right: number): Promise<void> {
      const n1 = mid - left + 1;
      const n2 = right - mid;

      let leftArr: string[] = [];
      let rightArr: string[] = [];

      for (let i = 0; i < n1; i++) {
        await waitforme(delay);
        arr[left + i].style.backgroundColor = "orange";
        leftArr[i] = arr[left + i].style.height;
      }

      for (let j = 0; j < n2; j++) {
        await waitforme(delay);
        arr[mid + 1 + j].style.backgroundColor = "yellow";
        rightArr[j] = arr[mid + 1 + j].style.height;
      }

      await waitforme(delay);

      let i = 0, j = 0, k = left;

      while (i < n1 && j < n2) {
        await waitforme(delay);

        if (parseInt(leftArr[i]) <= parseInt(rightArr[j])) {
          arr[k].style.height = leftArr[i];
          arr[k].style.backgroundColor = "lightgreen";
          i++;
        } else {
          arr[k].style.height = rightArr[j];
          arr[k].style.backgroundColor = "lightgreen";
          j++;
        }
        k++;
      }

      while (i < n1) {
        await waitforme(delay);
        arr[k].style.height = leftArr[i];
        arr[k].style.backgroundColor = "lightgreen";
        i++;
        k++;
      }

      while (j < n2) {
        await waitforme(delay);
        arr[k].style.height = rightArr[j];
        arr[k].style.backgroundColor = "lightgreen";
        j++;
        k++;
      }
    }

    async function mergeSort(arr: NodeListOf<HTMLElement>, left: number, right: number): Promise<void> {
      if (left >= right) return;
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }

    if (mergeSortBtn) {
      mergeSortBtn.addEventListener("click", async function () {
        const barsElements = document.querySelectorAll<HTMLElement>(".bar");
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await mergeSort(barsElements, 0, barsElements.length - 1);
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
      });
    }

    // --- QUICK SORT ---
    async function partitionLomuto(
      bars: NodeListOf<HTMLElement>,
      low: number,
      pivotIndex: number
    ): Promise<number> {
      let partitionIdx = low - 1;
      bars[pivotIndex].style.background = "red";
      for (let r = low; r <= pivotIndex - 1; r++) {
        bars[r].style.background = "yellow";
        await waitforme(delay);
        if (parseInt(bars[r].style.height) < parseInt(bars[pivotIndex].style.height)) {
          partitionIdx++;
          swap(bars[partitionIdx], bars[r]);
          bars[partitionIdx].style.background = "orange";
          if (partitionIdx !== r) {
            bars[r].style.background = "orange";
          }
          await waitforme(delay);
        } else {
          bars[r].style.background = "pink";
        }
      }
      partitionIdx++;
      await waitforme(delay);
      swap(bars[partitionIdx], bars[pivotIndex]);
      bars[pivotIndex].style.background = "pink";
      bars[partitionIdx].style.background = "green";
      await waitforme(delay);
      for (let i = 0; i < bars.length; i++) {
        if (bars[i].style.background !== "green") {
          bars[i].style.background = "cyan";
        }
      }
      return partitionIdx;
    }

    async function quickSort(
      bars: NodeListOf<HTMLElement>,
      low: number,
      high: number
    ): Promise<void> {
      if (low < high) {
        let pivotFinalIdx = await partitionLomuto(bars, low, high);
        await quickSort(bars, low, pivotFinalIdx - 1);
        await quickSort(bars, pivotFinalIdx + 1, high);
      } else if (low >= 0 && high >= 0 && low < bars.length && high < bars.length) {
        bars[high].style.background = "green";
        bars[low].style.background = "green";
      }
    }

    if (quickSortBtn) {
      quickSortBtn.addEventListener("click", async function () {
        const bars = document.querySelectorAll<HTMLElement>(".bar");
        const lastIdx = bars.length - 1;
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await quickSort(bars, 0, lastIdx);
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
      });
    }

    // --- SELECTION SORT ---
    async function selection(): Promise<void> {
      const bars = document.querySelectorAll<HTMLElement>(".bar");
      for (let t = 0; t < bars.length; t++) {
        let minIdx = t;
        bars[t].style.background = "blue";
        for (let a = t + 1; a < bars.length; a++) {
          bars[a].style.background = "red";
          await waitforme(delay);
          if (parseInt(bars[a].style.height) < parseInt(bars[minIdx].style.height)) {
            if (minIdx !== t) {
              bars[minIdx].style.background = "cyan";
            }
            minIdx = a;
          } else {
            bars[a].style.background = "cyan";
          }
        }
        await waitforme(delay);
        swap(bars[minIdx], bars[t]);
        bars[minIdx].style.background = "cyan";
        bars[t].style.background = "green";
      }
    }

    if (selectionSortBtn) {
      selectionSortBtn.addEventListener("click", async function () {
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await selection();
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
      });
    }
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
                <label id="size" htmlFor="arr_sz">
                  Size
                  <input
                    id="arr_sz"
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    defaultValue="40"
                  />
                </label>
                <label id="speed" htmlFor="speed_input">
                  Speed
                  <input
                    id="speed_input"
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    defaultValue="100"
                  />
                </label>
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

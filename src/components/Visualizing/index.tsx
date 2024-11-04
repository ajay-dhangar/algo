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
        document.querySelector(".bubbleSort")!.disabled = true;
        document.querySelector(".insertionSort")!.disabled = true;
        document.querySelector(".mergeSort")!.disabled = true;
        document.querySelector(".quickSort")!.disabled = true;
        document.querySelector(".selectionSort")!.disabled = true;
      }
  
      function disableSizeSlider() {
        document.querySelector("#arr_sz")!.disabled = true;
      }

      function enableSizeSlider() {
        document.querySelector("#arr_sz").disabled = !1;
      }
      function disableNewArrayBtn() {
        document.querySelector(".newArray").disabled = !1;
      }
      function enableNewArrayBtn() {
        document.querySelector(".newArray").disabled = !1;
      }

      function enableSortingBtn() {
        document.querySelector(".bubbleSort")!.disabled = false;
        document.querySelector(".insertionSort")!.disabled = false;
        document.querySelector(".mergeSort")!.disabled = false;
        document.querySelector(".quickSort")!.disabled = false;
        document.querySelector(".selectionSort")!.disabled = false;
      }
  
      function waitforme(e: number) {
        return new Promise((r) => {
          setTimeout(() => {
            r("");
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
  
      const newArrayBtn = document.querySelector(".newArray")!;
      
      newArrayBtn.addEventListener("click", function () {
        enableSortingBtn();
        createNewArray(arraySize.value);
      });

   // bubble sort
async function bubble() {
    const ele = document.querySelectorAll(".bar");
    for (let i = 0; i < ele.length - 1; i++) {
      for (let j = 0; j < ele.length - i - 1; j++) {
        console.log("In jth loop");
        ele[j].style.background = "blue";
        ele[j + 1].style.background = "blue";
        if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
          await waitforme(delay);
          swap(ele[j], ele[j + 1]);
        }
        ele[j].style.background = "cyan";
        ele[j + 1].style.background = "cyan";
      }
      ele[ele.length - 1 - i].style.background = "green";
    }
    ele[0].style.background = "green";
  }
  const bubSortbtn = document.querySelector(".bubbleSort");
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
async function insertion() {
    const ele = document.querySelectorAll(".bar");
    ele[0].style.background = "green";
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
  
        while (i < n1) {
          await waitforme(delay);
          (arr[k] as HTMLElement).style.height = leftArr[i];
          (arr[k] as HTMLElement).style.backgroundColor = "lightgreen";
          i++;
          k++;
        }
  
        while (j < n2) {
          await waitforme(delay);
          (arr[k] as HTMLElement).style.height = rightArr[j];
          (arr[k] as HTMLElement).style.backgroundColor = "lightgreen";
          j++;
          k++;
        }
      }
  
      async function mergeSort(arr: NodeListOf<Element>, left: number, right: number) {
        if (left >= right) return;
  
        const mid = Math.floor((left + right) / 2);
        
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        
        await merge(arr, left, mid, right);
      }
  
      const mergeSortBtn = document.querySelector(".mergeSort");
      
      mergeSortBtn.addEventListener("click", async function () {
        let barsElements = document.querySelectorAll(".bar");
        
        disableSortingBtn();
        
        await mergeSort(barsElements, 0, barsElements.length - 1);
  
        enableSortingBtn();
      });
  

     // quick sort
async function partitionLomuto(e, t, a) {
    let n = t - 1;
    e[a].style.background = "red";
    for (let r = t; r <= a - 1; r++)
      (e[r].style.background = "yellow"),
        await waitforme(delay),
        parseInt(e[r].style.height) < parseInt(e[a].style.height)
          ? (console.log("In partitionLomuto for j if"),
            n++,
            swap(e[n], e[r]),
            (e[n].style.background = "orange"),
            n != r && (e[r].style.background = "orange"),
            await waitforme(delay))
          : (e[r].style.background = "pink");
    n++,
      await waitforme(delay),
      swap(e[n], e[a]),
      (e[a].style.background = "pink"),
      (e[n].style.background = "green"),
      await waitforme(delay);
    for (let t = 0; t < e.length; t++)
      "green" != e[t].style.background && (e[t].style.background = "cyan");
    return n;
  }
  async function quickSort(e, t, a) {
    if (t < a) {
      let n = await partitionLomuto(e, t, a);
      await quickSort(e, t, n - 1), await quickSort(e, n + 1, a);
    } else
      t >= 0 &&
        a >= 0 &&
        t < e.length &&
        a < e.length &&
        ((e[a].style.background = "green"), (e[t].style.background = "green"));
  }
  const quickSortbtn = document.querySelector(".quickSort");
  quickSortbtn.addEventListener("click", async function () {
    let e = document.querySelectorAll(".bar"),
      t = e.length - 1;
    disableSortingBtn(),
      disableSizeSlider(),
      disableNewArrayBtn(),
      await quickSort(e, 0, t),
      enableSortingBtn(),
      enableSizeSlider(),
      enableNewArrayBtn();
  });

// selection sort
async function selection() {
    const e = document.querySelectorAll(".bar");
    for (let t = 0; t < e.length; t++) {
      let n = t;
      e[t].style.background = "blue";
      for (let a = t + 1; a < e.length; a++)
        (e[a].style.background = "red"),
          await waitforme(delay),
          parseInt(e[a].style.height) < parseInt(e[n].style.height)
            ? (n !== t && (e[n].style.background = "cyan"), (n = a))
            : (e[a].style.background = "cyan");
      await waitforme(delay),
        swap(e[n], e[t]),
        (e[n].style.background = "cyan"),
        (e[t].style.background = "green");
    }
  }
  const selectionSortbtn = document.querySelector(".selectionSort");
  selectionSortbtn.addEventListener("click", async function () {
    disableSortingBtn(),
      disableSizeSlider(),
      disableNewArrayBtn(),
      await selection(),
      enableSortingBtn(),
      enableSizeSlider(),
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
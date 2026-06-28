import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import { motion, AnimatePresence } from 'framer-motion';

interface ArrayElement {
  id: string;
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

const ALGORITHMS = [
  { id: 'bubble', name: 'Bubble Sort' },
  { id: 'selection', name: 'Selection Sort' },
  { id: 'quick', name: 'Quick Sort' },
];

export default function AlgorithmVisualizer() {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [arraySize, setArraySize] = useState<number>(30);
  const [delay, setDelay] = useState<number>(100);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [selectedAlgo, setSelectedAlgo] = useState<string>('bubble');
  const [isClient, setIsClient] = useState<boolean>(false);

  // Use refs for values that change but shouldn't trigger re-renders inside async loops,
  // or values that async loops need to read the latest of.
  const delayRef = useRef(delay);
  const isSortingRef = useRef(isSorting);
  
  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  useEffect(() => {
    isSortingRef.current = isSorting;
  }, [isSorting]);

  useEffect(() => {
    setIsClient(true);
    generateArray(arraySize);
  }, []);

  const generateArray = (size: number) => {
    if (isSorting) return;
    const newArr: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArr.push({
        id: `id-${Math.random().toString(36).substr(2, 9)}`,
        value: Math.floor(Math.random() * 90) + 10,
        state: 'default',
      });
    }
    setArray(newArr);
  };

  const sleep = () => {
    return new Promise(resolve => setTimeout(resolve, delayRef.current));
  };

  const updateState = (indices: number[], state: ArrayElement['state'], arr: ArrayElement[]) => {
    const newArr = [...arr];
    indices.forEach(i => {
      if (newArr[i]) newArr[i] = { ...newArr[i], state };
    });
    return newArr;
  };

  const bubbleSort = async () => {
    let arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;
        
        arr = updateState([j, j + 1], 'comparing', arr);
        setArray(arr);
        await sleep();

        if (arr[j].value > arr[j + 1].value) {
          arr = updateState([j, j + 1], 'swapping', arr);
          setArray(arr);
          await sleep();

          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep();
        }

        arr = updateState([j, j + 1], 'default', arr);
        setArray(arr);
      }
      arr = updateState([n - i - 1], 'sorted', arr);
      setArray(arr);
    }
    if (n > 0) {
       arr = updateState([0], 'sorted', arr);
       setArray(arr);
    }
    setIsSorting(false);
  };

  const selectionSort = async () => {
    let arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      arr = updateState([minIdx], 'swapping', arr);
      setArray(arr);
      
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;
        
        arr = updateState([j], 'comparing', arr);
        setArray(arr);
        await sleep();
        
        if (arr[j].value < arr[minIdx].value) {
          arr = updateState([minIdx], 'default', arr); // old min back to default
          minIdx = j;
          arr = updateState([minIdx], 'swapping', arr);
        } else {
          arr = updateState([j], 'default', arr);
        }
        setArray(arr);
      }
      
      if (!isSortingRef.current) return;

      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
        await sleep();
      }
      
      arr = updateState([minIdx, i], 'default', arr);
      arr = updateState([i], 'sorted', arr);
      setArray(arr);
    }
    if (n > 0) {
      arr = updateState([n - 1], 'sorted', arr);
      setArray(arr);
    }
    setIsSorting(false);
  };

  const quickSort = async () => {
    let arr = [...array];
    
    const partition = async (low: number, high: number): Promise<number> => {
      let pivot = arr[high].value;
      arr = updateState([high], 'swapping', arr); // highlight pivot
      setArray(arr);
      await sleep();
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (!isSortingRef.current) return -1;
        
        arr = updateState([j], 'comparing', arr);
        setArray(arr);
        await sleep();
        
        if (arr[j].value < pivot) {
          i++;
          if (i !== j) {
            arr = updateState([i, j], 'swapping', arr);
            setArray(arr);
            await sleep();
            
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            setArray([...arr]);
            await sleep();
            
            arr = updateState([i, j], 'default', arr);
          } else {
             arr = updateState([j], 'default', arr);
          }
        } else {
          arr = updateState([j], 'default', arr);
        }
        setArray(arr);
      }
      
      if (!isSortingRef.current) return -1;
      
      i++;
      if (i !== high) {
        arr = updateState([i, high], 'swapping', arr);
        setArray(arr);
        await sleep();
        
        let temp = arr[i];
        arr[i] = arr[high];
        arr[high] = temp;
        setArray([...arr]);
        await sleep();
        
        arr = updateState([i, high], 'default', arr);
      } else {
        arr = updateState([high], 'default', arr);
      }
      
      arr = updateState([i], 'sorted', arr);
      setArray(arr);
      return i;
    };

    const quickSortHelper = async (low: number, high: number) => {
      if (low < high) {
        let pi = await partition(low, high);
        if (pi === -1) return; // stopped
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      } else if (low === high) {
        arr = updateState([low], 'sorted', arr);
        setArray(arr);
      }
    };
    
    await quickSortHelper(0, arr.length - 1);
    
    if (isSortingRef.current) {
        // Double check all are marked sorted
        arr = arr.map(a => ({ ...a, state: 'sorted' }));
        setArray(arr);
        setIsSorting(false);
    }
  };

  const handleStart = async () => {
    setIsSorting(true);
    if (selectedAlgo === 'bubble') {
      await bubbleSort();
    } else if (selectedAlgo === 'selection') {
      await selectionSort();
    } else if (selectedAlgo === 'quick') {
      await quickSort();
    }
  };

  const handleStop = () => {
    setIsSorting(false);
  };

  const handleReset = () => {
    setIsSorting(false);
    generateArray(arraySize);
  };

  const getColor = (state: ArrayElement['state']) => {
    switch(state) {
      case 'comparing': return 'var(--ifm-color-warning)'; // yellow
      case 'swapping': return 'var(--ifm-color-danger)'; // red
      case 'sorted': return 'var(--ifm-color-success)'; // green
      case 'default':
      default: return 'var(--ifm-color-primary)'; // blue
    }
  };

  if (!isClient) return null;

  return (
    <Layout title="Interactive Algorithm Visualizer" description="Visualize and animate algorithm step-by-step executions.">
      <main className="container margin-vert--xl" style={{ maxWidth: '1200px' }}>
        
        <div className="text--center margin-bottom--xl">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Algorithm Visualizer</h1>
          <p className="text--muted" style={{ fontSize: '1.2rem' }}>Watch arrays sort step-by-step with real-time animations</p>
        </div>

        <div className="card shadow--md padding--md margin-bottom--lg" style={{ borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <div className="row" style={{ alignItems: 'flex-end', rowGap: '1rem' }}>
            <div className="col col--3">
              <label className="font-code small text--uppercase text--muted" style={{ fontWeight: 'bold' }}>Algorithm</label>
              <select 
                className="button button--secondary" 
                style={{ width: '100%', textAlign: 'left', padding: '0.65rem 1rem', marginTop: '0.25rem', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-color-emphasis-100)', color: 'var(--ifm-font-color-base)' }}
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value)}
                disabled={isSorting}
              >
                {ALGORITHMS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            
            <div className="col col--3">
              <label className="font-code small text--uppercase text--muted" style={{ fontWeight: 'bold' }}>Array Size: {arraySize}</label>
              <input 
                type="range" 
                min="5" 
                max="100" 
                value={arraySize} 
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setArraySize(val);
                  generateArray(val);
                }}
                disabled={isSorting}
                style={{ width: '100%', marginTop: '0.75rem', display: 'block', accentColor: 'var(--ifm-color-primary)' }}
              />
            </div>

            <div className="col col--3">
              <label className="font-code small text--uppercase text--muted" style={{ fontWeight: 'bold' }}>Step Delay: {delay}ms</label>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                step="10"
                value={delay} 
                onChange={(e) => setDelay(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.75rem', display: 'block', accentColor: 'var(--ifm-color-primary)' }}
              />
            </div>

            <div className="col col--3" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button 
                className="button button--secondary" 
                onClick={handleReset} 
                disabled={isSorting}
                style={{ borderRadius: '8px' }}
              >
                Reset
              </button>
              {isSorting ? (
                <button 
                  className="button button--danger" 
                  onClick={handleStop}
                  style={{ borderRadius: '8px' }}
                >
                  Stop
                </button>
              ) : (
                <button 
                  className="button button--primary" 
                  onClick={handleStart}
                  style={{ borderRadius: '8px' }}
                >
                  Start
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="margin-bottom--md" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--ifm-color-primary)', borderRadius: '4px' }}></div>
            <span className="small font-code text--muted">Unsorted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--ifm-color-warning)', borderRadius: '4px' }}></div>
            <span className="small font-code text--muted">Comparing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--ifm-color-danger)', borderRadius: '4px' }}></div>
            <span className="small font-code text--muted">Swapping</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--ifm-color-success)', borderRadius: '4px' }}></div>
            <span className="small font-code text--muted">Sorted</span>
          </div>
        </div>

        {/* Visualizer Canvas */}
        <div className="card shadow--md" style={{ backgroundColor: 'var(--ifm-background-surface-color)', height: '450px', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem', gap: '4px', overflow: 'hidden' }}>
          <AnimatePresence>
            {array.map((item) => (
              <motion.div
                key={item.id}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  height: `${item.value}%`,
                  flex: 1,
                  backgroundColor: getColor(item.state),
                  borderRadius: '6px 6px 0 0',
                  minWidth: '4px'
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </Layout>
  );
}

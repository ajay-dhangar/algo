import { Step } from './types';

export function generateBubbleSortSteps(): Step[] {
  const newSteps: Step[] = [];
  const arr = [29, 10, 14, 37, 13];
  
  newSteps.push({
    description: 'Initialize array to be sorted.',
    array: [...arr],
    variables: { i: 0, j: 0, swapped: 'false' },
    highlights: { sorted: [] },
  });

  const n = arr.length;
  let tempArr = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      newSteps.push({
        description: `Comparing elements at index ${j} (${tempArr[j]}) and index ${j + 1} (${tempArr[j + 1]}).`,
        array: [...tempArr],
        variables: { i, j, swapped: swapped ? 'true' : 'false' },
        highlights: { compared: [j, j + 1] },
      });

      if (tempArr[j] > tempArr[j + 1]) {
        const temp = tempArr[j];
        tempArr[j] = tempArr[j + 1];
        tempArr[j + 1] = temp;
        swapped = true;

        newSteps.push({
          description: `Swapped: ${tempArr[j + 1]} and ${tempArr[j]} since ${tempArr[j + 1]} was greater than ${tempArr[j]}.`,
          array: [...tempArr],
          variables: { i, j, swapped: 'true' },
          highlights: { active: [j, j + 1] },
        });
      }
    }
    const sortedIndices = Array.from({ length: i + 1 }, (_, k) => n - 1 - k);
    newSteps.push({
      description: `Pass completed. Largest element in unsorted portion moved to index ${n - i - 1}.`,
      array: [...tempArr],
      variables: { i, j: 'N/A', swapped: swapped ? 'true' : 'false' },
      highlights: { sorted: sortedIndices },
    });

    if (!swapped) {
      newSteps.push({
        description: 'No swaps occurred in this pass. Array is sorted!',
        array: [...tempArr],
        variables: { i, j: 'N/A', swapped: 'false' },
        highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
      });
      break;
    }
  }
  newSteps.push({
    description: 'Array is completely sorted.',
    array: [...tempArr],
    variables: { i: 'N/A', j: 'N/A', swapped: 'N/A' },
    highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
  });

  return newSteps;
}

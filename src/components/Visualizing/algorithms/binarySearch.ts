import { Step } from './types';

export function generateBinarySearchSteps(): Step[] {
  const newSteps: Step[] = [];
  const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const target = 23;
  let low = 0;
  let high = arr.length - 1;

  newSteps.push({
    description: `Target to search: ${target}. Initialize Search Range.`,
    array: [...arr],
    variables: { low, high, mid: 'N/A', target },
    highlights: { low, high },
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    newSteps.push({
      description: `Calculate mid index: Math.floor((${low} + ${high}) / 2) = ${mid}. Value at mid is ${arr[mid]}.`,
      array: [...arr],
      variables: { low, high, mid, target },
      highlights: { low, high, mid },
    });

    if (arr[mid] === target) {
      newSteps.push({
        description: `Target ${target} matches element at index ${mid}! Search successful.`,
        array: [...arr],
        variables: { low, high, mid, target },
        highlights: { mid, sorted: [mid] },
      });
      break;
    } else if (arr[mid] < target) {
      newSteps.push({
        description: `Since ${arr[mid]} < ${target}, target must lie in the right half. Move low to ${mid + 1}.`,
        array: [...arr],
        variables: { low, high, mid, target },
        highlights: { low, high, mid },
      });
      low = mid + 1;
    } else {
      newSteps.push({
        description: `Since ${arr[mid]} > ${target}, target must lie in the left half. Move high to ${mid - 1}.`,
        array: [...arr],
        variables: { low, high, mid, target },
        highlights: { low, high, mid },
      });
      high = mid - 1;
    }
  }

  if (low > high) {
    newSteps.push({
      description: 'Search range is empty. Target is not in the array.',
      array: [...arr],
      variables: { low, high, mid: 'N/A', target },
      highlights: {},
    });
  }

  return newSteps;
}

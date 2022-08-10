export function QuickSort(
    arr: Array<{id: string, rank: number, country: string, nickname: string}>,
    start: number = 0,
    end: number = arr.length
  ): Array<{id: string, rank: number, country: string, nickname: string}> {
    if (start < end) {
      let p = partition(arr, start, end);
      QuickSort(arr, start, p - 1);
      QuickSort(arr, p + 1, end);
    }
    return arr;
  }
  
  function partition(
    arr: Array<{id: string, rank: number, country: string, nickname: string}>,
    start: number = 0,
    end: number = arr.length
  ) {
    let pivot: number = arr[start].rank;
    let swapIndex: number = start;
    for (let i = start + 1; i < end; i++) {
      if (arr[i].rank < pivot) {
        swapIndex++;
        swap(arr, i, swapIndex);
      }
    }
    swap(arr, start, swapIndex);
    return swapIndex;
  }
  
  function swap(arr: Array<{id: string, rank: number, country: string, nickname: string}>, i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
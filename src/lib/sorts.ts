export function merge_sort(arr: GroupedData[], comparison: (a: GroupedData, b: GroupedData) => number): GroupedData[]
{
    // Heavily relies on browser's garbage collection
    if (arr.length == 1)
    {
        return arr;
    }

    let left: GroupedData[] = merge_sort(arr.slice(0, arr.length/2), comparison);
    let right: GroupedData[] = merge_sort(arr.slice(arr.length/2), comparison);
    let merged_array: GroupedData[] = merge(left, right, comparison);

    return merged_array;
}

function merge(left: GroupedData[], right: GroupedData[], comparison: (a: GroupedData, b: GroupedData) => number): GroupedData[]
{
    let merged_array:GroupedData[] = new Array(left.length + right.length);

    let left_index: number = 0;
    let right_index: number = 0;
    let merged_index: number = 0;

    while (left_index < left.length && right_index < right.length)
    {
        if (comparison(left[left_index], right[right_index]) <= 0)
        {
            merged_array[merged_index++] = left[left_index++];
        }
        else
        {
            merged_array[merged_index++] = right[right_index++];
        }
    }

    while (left_index < left.length)
    {
        merged_array[merged_index++] = left[left_index++];
    }

    while (right_index < right.length)
    {
        merged_array[merged_index++] = right[right_index++];
    }

    return merged_array;
}

/* Quick Sort not fully implemented yet

export function quick_sort(arr: GroupedData[], start_index: number, end_index: number, comparison: (a: GroupedData, b: GroupedData) => number): GroupedData[]
{
    if (arr.length == 1)
    {
        return arr;
    }

    if (arr.length < 4)
    {
        return insertion_sort(arr, comparison);
    }
    let pivot_index = find_pivot_index(arr, start_index, end_index, comparison);

    let temp_value: GroupedData = arr[start_index];
    arr[start_index] = arr[pivot_index];
    arr[pivot_index] = temp_value;

    let pivot_value = arr[0]

    let partition_pivot_index: number = partition(arr, start_index, end_index, comparison);

    return arr;
}

function find_pivot_index(arr: GroupedData[], start_index: number, end_index: number, comparison: (a: GroupedData, b: GroupedData) => number): number
{
    let mid_index = (start_index + end_index) / 2;
    let possible_pivots_array: GroupedData[] = insertion_sort([arr[start_index], arr[mid_index], arr[end_index]], comparison);
    let median: GroupedData = possible_pivots_array[1];

    if (arr[start_index] == median)
    {
        return start_index;
    }
    else if (arr[mid_index] == median)
    {
        return mid_index;
    }
    else
    {
        return end_index;
    }
}

// Returns index where partition is stored
export function partition(arr: GroupedData[], start_index: number, end_index: number, comparison: (a: GroupedData, b: GroupedData) => number): number
{
    let left_index: number = 0;
    let right_index: number = 0;

    return 0;
}
*/

export function heap_sort(arr: GroupedData[], comparison: (a: GroupedData, b: GroupedData) => number): GroupedData[]
{
    // Build max heap in place: heapify down first half of the array
    for (let i: number = 0; i < arr.length/2; i++)
    {
        heapify_down(arr, i, arr.length, comparison);
    }

    // destroy heap inplace, placing removed items at the end of the array
    let last_index_of_heap: number = arr.length - 1;
    let item_removed_from_heap: GroupedData;

    while (last_index_of_heap > 0)
    {
        item_removed_from_heap = arr[0];
        arr[0] = arr[last_index_of_heap];

        heapify_down(arr, 0, last_index_of_heap, comparison);
        arr[last_index_of_heap] = item_removed_from_heap;
        last_index_of_heap--;
    }

    return arr;
}

function heapify_down(arr: GroupedData[], current_index: number, end_index: number, comparison: (a: GroupedData, b: GroupedData) => number)
{
    let temp_value: GroupedData;
    while ((2 * current_index + 1 < end_index) && (2 * current_index + 2 < end_index) &&
            (comparison(arr[current_index], arr[2 * current_index + 1]) < 0 || 
            comparison(arr[current_index], arr[2 * current_index + 2]) < 0))
    {
        if (comparison(arr[2 * current_index + 1], arr[2 * current_index + 2]) > 0)
        {
            // child at 2 * current_index is greater child
            temp_value = arr[current_index];
            arr[current_index] = arr[2 * current_index + 1];
            arr[2 * current_index + 1] = temp_value;
            current_index = 2 * current_index + 1;
        }
        else
        {
            // child at 2 * current_index + 1 is greater child
            temp_value = arr[current_index];
            arr[current_index] = arr[2 * current_index + 2];
            arr[2 * current_index + 2] = temp_value;
            current_index = 2 * current_index + 2;
        }
    }
    // Take care of case where node only has one child.
    if ((2 * current_index + 1 < end_index) && comparison(arr[current_index], arr[2 * current_index + 1]) < 0)
    {
        // child at 2 * current_index is greater child
        temp_value = arr[current_index];
        arr[current_index] = arr[2 * current_index + 1];
        arr[2 * current_index + 1] = temp_value;
        current_index = 2 * current_index + 1;
    }
    else if (((2 * current_index + 2 < end_index) && comparison(arr[current_index], arr[2 * current_index + 2]) < 0))
    {
        // child at 2 * current_index + 1 is greater child
        temp_value = arr[current_index];
        arr[current_index] = arr[2 * current_index + 2];
        arr[2 * current_index + 2] = temp_value;
        current_index = 2 * current_index + 2;
    }
}

export function bubble_sort(arr: GroupedData[], comparison: (a: GroupedData, b: GroupedData) => number): GroupedData[]
{
    if (arr.length == 1)
    {
        return arr;
    }
    let temp_data: GroupedData;
    let swap_occured: boolean = true;

    while (swap_occured)
    {
        swap_occured = false;

        for (let i: number = 0; i < arr.length - 1; i++)
        {
            if (comparison(arr[i], arr[i + 1]) > 0)
            {
                temp_data = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = temp_data;
                swap_occured = true;
            }
        }
    }

    return arr;
}

export function insertion_sort(arr: GroupedData[], comparison: (a: GroupedData, b: GroupedData) => number): GroupedData[]
{
    if (arr.length == 1)
    {
        return arr;
    }
    let temp_data: GroupedData;
    let last_sorted_index: number = 1;

    while (last_sorted_index < arr.length)
    {
        for (let i: number = last_sorted_index; i > 0; i--)
        {
            if (comparison(arr[i], arr[i - 1]) < 0)
            {
                temp_data = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp_data;
            }
            else
            {
                break;
            }
        }
        last_sorted_index++;
    }

    return arr;
}

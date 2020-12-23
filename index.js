//jshint esversion:8

/***************
 Global variables
 ***************/
const DEFAULT_ARRAY_SIZE = 15;
const DELAY = 100;
const END_DELAY = 1000;

const VALID_STATES = new Set();
VALID_STATES.add("swapping");
VALID_STATES.add("active");
VALID_STATES.add("inactive");
VALID_STATES.add("done");

let sortingArray = null;
let sort = bubbleSort;

/** Class representing an item in a CustomArray */
class arrayItem {
    /**
     * Creates an arrayItem.
     * @param {Number} x - The scalar value of the array element.
     */
    constructor(value) {
        // Throw an error if this.maxValue is not defined before arrayItem object is initialized
        if (this.maxValue == null) {
            throw "Error: max value not set before creating arrayItem object";
        }

        this.value = value;
        this.state = "inactive";
        this.maxHeight = 0.8 * $(".display-area").height();
        this.width = (this.maxValue <= 16 ? 40 : 15);
        this.height = this.maxHeight * (this.value / this.maxValue);
        this.elem = $("<div>")
            .addClass("array-element")
            .css("height", this.height)
            .css("width", this.width);
    }

    /**
     * Takes the HTML element that corresponds to the arrayItem and appends
     * to the webpage.
     */
    initUI() {
        $(".display-area").append(this.elem);
    }

    /**
     * Gets the value of the arrayItem.
     * @return {Number} The value of the arrayItem
     */
    getValue() {
        return this.value;
    }

    /**
     * Sets the arrayItem value.
     * @param {Number} newValue - The new arrayItem value
     */
    setValue(newValue) {
        // Update the object properties
        this.value = newValue;
        this.height = this.maxHeight * (this.value / this.maxValue);

        // Update the UI component
        this.elem.css("height", this.height);
    }

    /**
     * Sets the arrayItem state.
     * @param {String} newState - The new arrayItem state
     */
    setState(newState) {
        if (!VALID_STATES.has(newState)) {
            throw "Error: " + state + " is not a valid state.";
        }

        this.elem.removeClass(this.state);
        this.elem.addClass(newState);
        this.state = newState;
    }
}

/** Class representing an array to be sorted with a visualization in this project. */
class CustomArray {
    /**
     * Creates a CustomArray object.
     * @param {Number} length - The length of the CustomArray to create.
     */
    constructor(length) {
        this.length = length;
        this.elements = [];
    }

    /**
     * Initializes the CustomArray with randomly shuffled integer values
     */
    init() {
        // Create the CustomArray of arrayItem objects
        for (var i = 1; i <= this.length; i++) {
            this.elements.push(new arrayItem(i));
        }

        // Shuffle the elements into a random order
        this.shuffle();

        // Draw the CustomArray to the display area
        this.elements.forEach(function(arrayItem) {
            arrayItem.initUI();
        });

        // Update the minimum height of the display areas
        var currentSize = $(".display-area").css("height");
        $(".display-area").css("min-height", currentSize);

    }

    /**
     * Shuffles the elements of the CustomArray.
     */
    shuffle() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.elements[i];
            this.elements[i] = this.elements[j];
            this.elements[j] = temp;
        }
    }

    /**
     * Sets the state of all array elements to inactive
     */
    resetItemStates() {
        for (var i = 0; i < this.length; i++) {
            this.elements[i].setState("inactive");
        }
    }

    /**
     * Gets the item at a given index of the CustomArray.
     * @param {Number} index - The index of the CustomArray to be accessed.
     */
    getItem(index) {
        return this.elements[index];
    }
}

/*****************
 Event Handlers
 *****************/

// Handle click on Sort button
// TODO

/**
 * Sets event handler for click on bubble-sort-btn. The active sorting
 * algorithm is set to the user selection.
 */
$("#sort-btn-group input").on("click", function() {
    switch ($(this).attr("id")) {
        case "bubblesort-btn":
            sort = bubbleSort;
            console.log("Bubble Sort has been selected");
            break;
        case "insertsort-btn":
            sort = insertionSort;
            console.log("Insertion Sort has been selected");
            break;
        case "mergesort-btn":
            sort = mergeSort;
            console.log("Merge Sort has been selected");
            break;
        case "heapsort-btn":
            sort = heapSort;
            console.log("Heap Sort has been selected");
            break;
        case "quicksort-btn":
            sort = quickSort;
            console.log("Quick Sort has been selected");
            break;
        default:
            console.log("Error: Unknown input");
    }
});

/**
* Sets event handler for click on elem-num-input. The active array is reset to a
* new array of the size given by the elem-num-input field.
*/
$("#elem-num-input").on("input", function() {
    // Get the value of the input tag
    num = $("#elem-num-input").val();

    // Bound the array length to 5 <= num <= 100
    num = num < 5 ? 5 : num;
    num = num > 100 ? 100 : num;

    // Create a new active CustomArray with specified size
    refreshActiveArray(num);
});

/**
 * Sets event handler for click on sort-btn. The active array is sorted using
 * the active sorting algorithm.
 */
$("#sort-btn").on("click", function() {
    console.log("The array is being sorted...");
    sort();
    console.log("The array has been sorted.");
});

/**
 * Sets event handler for click on reset-btn. The active array is reset to a
 * new array of the same length.
 */
$("#reset-btn").on("click", function() {
    size = sortingArray.length;
    refreshActiveArray(size);
    console.log("The array has been reset.");
});




/*****************
 Utility Functions
 *****************/

/**
 * Removes the active array from the display and creates a new active array.
 * @param  {Number}  size The size of the new active array.
 */
function refreshActiveArray(size) {
    // Clear the UI of current CustomArray
    $(".display-area").empty();

    // Clear the current CustomArray and create a new one
    sortingArray = new CustomArray(size);
    arrayItem.prototype.maxValue = size;
    sortingArray.init();
}

/**
 * Pauses async execution.
 * @param  {Number}  ms The number of milliseconds for the delay.
 * @return {Promise}    Promise that resolves once the delay has passed.
 * From https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two seconds later, showing sleep in a loop...');

    // Sleep in loop
    for (let i = 0; i < 5; i++) {
        if (i === 3)
            await sleep(2000);
        console.log(i);
    }
}

/********************
 * Sorting Algorithms
 ********************/

/**
 * Swaps the i element and j-th element of sortingArray.
 * @param  {Number} i   The index of the first element to swap.
 * @param  {Number} j   The index of the second element to swap
 */
async function swap(i, j) {
    // Input validation
    if (!validIndex(i) || !validIndex(j) || i == j) {
        throw "Error: invalid input";
    }

    const elemA = sortingArray.getItem(i);
    const elemB = sortingArray.getItem(j);

    // Swap the values of the arrayItems
    let temp = elemA.getValue();
    elemA.setValue(elemB.getValue());
    elemB.setValue(temp);

    elemA.elem.addClass("swapping");
    elemB.elem.addClass("swapping");

    // Wait, then change UI state back to normal
    await sleep(DELAY);
    elemA.elem.removeClass("swapping");
    elemB.elem.removeClass("swapping");
}

/**
 * Sets the i-th element of sortingArray to a given value
 * @param  {Number} i   The index of the element to set.
 * @param  {Number} val The value to set the element to.
 */
async function set(i, val) {
    // Input validation
    if (!validIndex(i)) {
        throw "Error: invalid input";
    }

    const elemA = sortingArray.getItem(i);

    // Set the new value
    elemA.setValue(val);

    elemA.elem.addClass("swapping");

    // Wait, then change UI state back to normal
    await sleep(DELAY);
    elemA.elem.removeClass("swapping");
}

/**
 * Performs the Bubble Sort algorithm on sortingArray.
 */
async function bubbleSort() {
    n = sortingArray.length;
    for (var i = n - 1; i >= 0; i--) {
        for (var j = 0; j < i; j++) {
            if (sortingArray.getItem(j).getValue() > sortingArray.getItem(j + 1).getValue()) {
                // Bubble the larger element up
                await swap(j, j + 1);
            }
        }
        sortingArray.getItem(i).setState("done");
    }

    await sleep(END_DELAY);
    sortingArray.resetItemStates();
}

/**
 * Performs the Insertion Sort algorithm on sortingArray.
 */
async function insertionSort() {
    n = sortingArray.length;
    for (var i = 0; i < n; i++){
        sortingArray.getItem(i).setState("done");
        for (var j = i - 1; j >= 0; j--){
            if (sortingArray.getItem(j).getValue() > sortingArray.getItem(j + 1).getValue()){
                // Shift element at j to the right and shift element at i to the left
                await swap(j, j + 1);
            }
        }
    }

    await sleep(END_DELAY);
    sortingArray.resetItemStates();
}

/**
 * Performs the Merge Sort algorithm on sortingArray.
 */
async function mergeSort() {
    // Call the recursive helper function
    await mergeSortHelper(sortingArray, 0, sortingArray.length - 1);

    // Change the color of all array elements to "done"
    for (var i = 0; i < sortingArray.length; i ++) {
        sortingArray.getItem(i).setState("done");
    }

    // Wait, then change the color back to normal
    await sleep(END_DELAY);
    sortingArray.resetItemStates();
}

/**
 * Performs the recursive calls of the Merge Sort algorithm on sortingArray.
 */
async function mergeSortHelper(arr, l, r) {
    // Base case is when arr is of length 1 (or 0)
    if (l >= r) {
        return;
    }

    let mid = Math.floor((l + r) / 2);

    // Sort the subarray arr[l, ..., mid]
    await mergeSortHelper(arr, l, mid);

    // Sort the subarray arr[mid + 1, ..., r]
    await mergeSortHelper(arr, mid + 1, r);

    // Merge the sorted subarray's
    await merge(arr, l, mid, r);
    return;
}

/**
 * Performs the merging subprocedure of the Merge Sort algorithm on sortingArray.
 * This is a hidden function that executes the sorting algorithm without animations.
 */
async function merge(arr, l, m, r) {
    // Get sizes of two subarray's to be merged
    let n1 = m - l + 1;
    let n2 = r - m;

    // Copy into temp array's
    tempA = [];
    tempB = [];
    for (let i = 0; i < n1; i++) {
        tempA.push(arr.getItem(l + i).getValue());
    }
    for (let j = 0; j < n2; j++) {
        tempB.push(arr.getItem(m + 1 + j).getValue());
    }

    // Merge into original array
    let i = 0;
    let j = 0;
    let k = l;
    while (k <= r) {
        if (i < n1 && (j >= n2 || tempA[i] < tempB[j])) {
            await set(k, tempA[i]);  // Set value
            i++;
        } else {
            await set(k, tempB[j]);  // Set Value
            j++;
        }
        k++;
    }
}

/**
 * Performs the Heap Sort algorithm on sortingArray.
 */
async function heapSort() {
    throw {name : "NotImplementedError", message : "too lazy to implement"};
}

/**
 * Performs the Quick Sort algorithm on sortingArray.
 */
async function quickSort() {
    throw {name : "NotImplementedError", message : "too lazy to implement"};
}


/**
 * Validates an index to be used to access an element of the sorting array.
 * @param  {Number} index The index number to be validates
 * @return {Boolean}      True if the index is valid, false otherwise
 */
function validIndex(index) {
    return Number.isInteger(index) && index >= 0 && index < sortingArray.length;
}

/**
 * Swaps the i element and j-th element of sortingArray.
 * This is a hidden function that performs the swap without animatons.
 * @param  {Number} i   The index of the first element to swap.
 * @param  {Number} j   The index of the second element to swap
 */
function _swap(i, j) {
    // Input validation
    if (!validIndex(i) || !validIndex(j) || i == j) {
        throw "Error: invalid input";
    }

    const elemA = sortingArray.getItem(i);
    const elemB = sortingArray.getItem(j);

    // Swap the values of the arrayItems
    let temp = elemA.getValue();
    elemA.setValue(elemB.getValue());
    elemB.setValue(temp);
}

/**
 * Sets the i-th element of sortingArray to a given value
 * This is a hidden function that performs the set without animatons.
 * @param  {Number} i   The index of the element to set.
 * @param  {Number} val The value to set the element to.
 */
function _set(i, val) {
    // Input validation
    if (!validIndex(i)) {
        throw "Error: invalid input";
    }

    const elemA = sortingArray.getItem(i);

    // Set the new value
    elemA.setValue(val);
}

/**
 * Performs the Bubble Sort algorithm on sortingArray. This is a hidden
 * function that executes the sorting algorithm without animations.
 */
function _bubbleSort() {
    n = sortingArray.length;
    for (var i = n - 1; i >= 0; i--) {
        for (var j = 0; j < i; j++) {
            if (sortingArray.getItem(j).getValue() > sortingArray.getItem(j + 1).getValue()) {
                // Bubble the larger element up
                _swap(j, j + 1);
            }
        }
    }
}

/**
 * Performs the Insertion Sort algorithm on sortingArray. This is a hidden
 * function that executes the sorting algorithm without animations.
 */
function _insertionSort() {
    n = sortingArray.length;
    for (var i = 0; i < n; i++){
        for (var j = i - 1; j >= 0; j--){
            if (sortingArray.getItem(j).getValue() > sortingArray.getItem(j + 1).getValue()){
                // Shift element at j to the right and shift element at i to the left
                _swap(j, j + 1);
            }
        }
    }
}

/**
 * Performs the Merge Sort algorithm on sortingArray. This is a hidden
 * function that executes the sorting algorithm without animations.
 */
function _mergeSort() {
    _mergeSortHelper(sortingArray, 0, sortingArray.length - 1);
}

/**
 * Performs the recursive calls of the Merge Sort algorithm on sortingArray.
 * This is a hidden function that executes the sorting algorithm without animations.
 */
function _mergeSortHelper(arr, l, r) {
    // Base case is when arr is of length 1 (or 0)
    if (l >= r) {
        return;
    }

    let mid = Math.floor((l + r) / 2);

    // Sort the subarray arr[l, ..., mid]
    _mergeSortHelper(arr, l, mid);

    // Sort the subarray arr[mid + 1, ..., r]
    _mergeSortHelper(arr, mid + 1, r);

    // Merge the sorted subarray's
    _merge(arr, l, mid, r);
    return;
}

/**
 * Performs the merging subprocedure of the Merge Sort algorithm on sortingArray.
 * This is a hidden function that executes the sorting algorithm without animations.
 */
function _merge(arr, l, m, r) {
    // Get sizes of two subarray's to be merged
    let n1 = m - l + 1;
    let n2 = r - m;

    // Copy into temp array's
    tempA = [];
    tempB = [];
    for (let i = 0; i < n1; i++) {
        tempA.push(arr.getItem(l + i).getValue());
    }
    for (let j = 0; j < n2; j++) {
        tempB.push(arr.getItem(m + 1 + j).getValue());
    }

    // Merge into original array
    let i = 0;
    let j = 0;
    let k = l;
    while (k <= r) {
        if (i < n1 && (j >= n2 || tempA[i] < tempB[j])) {
            _set(k, tempA[i]);  // Set value
            i++;
        } else {
            _set(k, tempB[j]);  // Set Value
            j++;
        }
        k++;
    }
}

/**
 * Performs the Heap Sort algorithm on sortingArray. This is a hidden
 * function that executes the sorting algorithm without animations.
 */
function _heapSort() {
    throw {name : "NotImplementedError", message : "too lazy to implement"};
}

/**
 * Performs the Quick Sort algorithm on sortingArray. This is a hidden
 * function that executes the sorting algorithm without animations.
 */
function _quickSort() {
    throw {name : "NotImplementedError", message : "too lazy to implement"};
}

/**
 * TEMP functions
 */
async function foo(i) {
    if (i == 1) {
        console.log("i =", i);
    } else {
        await foo(i - 1);
        await sleep(1000);
        console.log("i =", i);
    }
}

/**************
 Run on startup
 **************/

refreshActiveArray(DEFAULT_ARRAY_SIZE);

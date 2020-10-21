//jshint esversion:6

/********
 Globals
 ********/
const DEFAULT_SIZE = 15;

list = null;

// Define the ListElem object
function ListElem(value) {
  // Throw an error if this.maxValue is not defined
  if (this.maxValue == null) {
    throw "Error: max value not set before creating ListElem object";
  }

  // Set value
  this.value = value;

  // Set width and height of HTML component
  this.maxHeight = 0.8 * $(".display-area").height();
  this.width = (this.maxValue <= 16 ? 40 : 15);
  this.height = this.maxHeight * (this.value / this.maxValue);

  // Create UI component
  this.elem = $("<div>")
    .addClass("array-element")
    .css("height", this.height)
    .css("width", this.width);

  // Initialize the UI component
  this.initUI = function() {
    $(".display-area").append(this.elem);
  };

  // Update the state of the ListElem
  this.update = function(newValue) {
    // Update the object properties
    this.value = newValue;
    this.height = this.maxHeight * (this.value / this.maxValue);

    // Update the UI component
    this.elem.css("height", this.height);
    this.elem.css("background-color", "blue");
  };
}

// Define the List object
function List(length) {
  this.length = length;
  this.elements = [];  // An array of ListElem


  // Initialize the List with randomly shuffled integer values
  this.init = function() {
    // Create the list of numbers
    for (var i = 1; i <= length; i++) {
      this.elements.push(new ListElem(i));
    }

    // Shuffle the elements into a random order
    this.shuffle();

    // Draw the list to the display
    this.elements.forEach(function(listElem) {
      listElem.initUI();
    });

    var currentSize = $(".display-area").css("height");
    $(".display-area").css("min-height", currentSize);

  };

  // Shuffle the elements of the List
  this.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.elements[i];
      this.elements[i] = this.elements[j];
      this.elements[j] = temp;
    }
  };
}

// refreshActiveList
function refreshActiveList(size) {
  // Clear the UI of current list
  $(".display-area").empty();

  // Clear the current list and create a new one
  list = new List(size);
  ListElem.prototype.maxValue = size;
  list.init();
}

refreshActiveList(DEFAULT_SIZE);

// Handle click on Sort button
// TODO

// Handle click on Reset button
$("#reset-btn").on("click", function(){
  size = list.length;
  refreshActiveList(size);
});

// Handle input into number of elements field
$("#elem-num-input").on("input", function(){
  // Get the value of the input tag
  num = $("#elem-num-input").val();

  // Assert 5 <= num <= 100
  num = num < 5 ? 5 : num;
  num = num > 100 ? 100 : num;

  // Create a new active list with specified size
  refreshActiveList(num);
});

/********************
 * Sorting Algorithms
 ********************/

// Swap two positions of List
function swap(i, j){
  if (!Number.isInteger(i) || !Number.isInteger(j)){
    throw "Error: i and j must be integers";
  }

  // Swap the values of the ListElems

}

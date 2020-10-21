//jshint esversion:6

/********
 Globals
 ********/
const DEFAULT_SIZE = 15;

list = null;

/*
  ListElem:
*/
function ListElem(value) {
  // Throw an error if this.maxValue is not defined
  if (this.maxValue == null) {
    throw "Error: max value not set before creating ListElem object";
  }

  // Set value
  this.value = value;

  // Set width and height of HTML component
  this.width = (this.maxValue <= 16 ? 40 : 15);
  this.height = 0.8 * $(".display-area").height() * (this.value / this.maxValue);
  console.log(this.height);

  // Create HTML component
  this.elem = $("<div>")
    .addClass("array-element")
    .css("height", this.height)
    .css("width", this.width);


  this.draw = function() {
    $(".display-area").append(this.elem);
  };
}

/*
 List:
 */
function List(length) {
  this.length = length;
  this.elements = [];

  // Initialize the List with random values
  this.init = function() {
    // Create the list of numbers
    for (var i = 1; i <= length; i++) {
      this.elements.push(new ListElem(i));
    }

    // Shuffle the elements into a random order
    this.shuffle();

    // Draw the list to the display
    this.elements.forEach(function(listElem) {
      listElem.draw();
    });

    var currentSize = $(".display-area").css("height");
    $(".display-area").css("min-height", currentSize);

  };

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

// Event Handlers
$("#reset-btn").on("click", function(){
  size = list.length;
  refreshActiveList(size);
});

$("#elem-num-input").on("input", function(){
  console.log($("#elem-num-input").val());
  num = $("#elem-num-input").val();
  num = num < 5 ? 5 : num;
  num = num > 100 ? 100 : num;
  refreshActiveList(num);
});

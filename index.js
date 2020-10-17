//jshint esversion:6

const DEFAULT_SIZE = 10;

function ListElem(value) {
  this.value = value;
  this.elem = $("<div>")
    .addClass("array-element")
    .css("height", 20 * this.value)
    .css("width", 20);


  this.draw = function() {
    console.log($("display-area"));
    $(".display-area").append(this.elem);
  };
}

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


  };

  this.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.elements[i];
      this.elements[i] = this.elements[j];
      this.elements[j] = temp;
    }
  };

  this.init();
}

let list = new List(DEFAULT_SIZE);

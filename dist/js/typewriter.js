const Typewriter = function(txtElement, words, wait = 2000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method - this creates a method using prototype
Typewriter.prototype.type = function() {
  // Current index of word
  const current = this.wordIndex % this.words.length;

  // Get full text of current word
  const fullTxt = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type speed
  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // this pauses at the end of each word
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // move to the next word
    this.wordIndex++;
    // Pause before typing
    typeSpeed = 400;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  // Init Typewriter
  new Typewriter(txtElement, words, wait);
}

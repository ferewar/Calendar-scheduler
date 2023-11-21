// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// When the page is ready, execute this function
$(function () {
  // Add a click event listener to the save button
  $(".saveBtn").on("click", function () {
    // Get the ID of the parent time-block
    var blockId = $(this).parent().attr("id");

    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block's ID as a key
    localStorage.setItem(blockId, userInput);
    //When click on save button shows an alert that the event was added to the local storage
    alert("Event added to local storage"); 
   });

  // Function to update the visual styles of time-blocks based on the current hour
  function updateBlockStyles() {
    // Get the current hour using the dayjs library
    var currentHour = dayjs().hour();

    // Iterate through each time-block on the page
    $(".time-block").each(function () {
      // Get the hour from the time-block's ID
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Adjust the CSS classes based on the relationship between blockHour and currentHour
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to update styles on page load
  updateBlockStyles();

  // Function to display user input from local storage
  function displayUserInput() {
    // Iterate through each time-block on the page
    $(".time-block").each(function () {
      // Get the ID of the time-block
      var blockId = $(this).attr("id");

      // Retrieve stored user input from local storage
      var storedInput = localStorage.getItem(blockId);

      // If there's stored input, display it in the corresponding textarea
      if (storedInput) {
        $(this).find(".description").val(storedInput);
      }
    });
  }

  // Call the function to display user input on page load
  displayUserInput();

  // Function to display the current date and time in the header of the page
  function displayCurrentDate() {
    // Use dayjs to format the current date and time
    var currentDate = dayjs().format("dddd, MMM D YYYY, h:mm:ss a");
    $("#currentDay").html("Current Date and Time: " + currentDate)

    // Set this formatted date to an element with ID "currentDay"
    $("#currentDay").text(currentDate);
  }

  // Call the function to display the current date on page load
  displayCurrentDate();

  // Scroll to the current hour on page load (optional)
  var currentHourBlock = $("#hour-" + dayjs().hour());
  if (currentHourBlock.length) {
    $("html, body").animate({
      scrollTop: currentHourBlock.offset().top
    }, 1000);
  }
});

// Function to add time blocks to the page on load
function addTimeBlocks() {
  // Get the container where time blocks will be added
  var container = $(".container-fluid");

  // Loop from 9 AM to 9 PM to create time blocks
  for (var hour = 9; hour <= 21; hour++) {
    // Create a time block element with an hour, textarea, and save button
    var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + hour);
    var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(dayjs().hour(hour).format('hA'));
    var textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');

    // Append the elements to the container
    timeBlock.append(hourDiv, textarea, saveBtn);
    container.append(timeBlock);
  }
}

// Call the function to add time blocks on page load
addTimeBlocks();

// Function to update time-block styles
function updateBlockStyles() {
  // Get the current hour using the dayjs library
  var currentHour = dayjs().hour();

  // Iterate through each time-block on the page
  $(".time-block").each(function () {
    // Get the hour from the time-block's ID
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Adjust the CSS classes based on the relationship between blockHour and currentHour
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

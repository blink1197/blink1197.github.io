$(document).ready(function() {
    $(".navItem:first-child .overlay").addClass("selected");
    // Function to handle the click event on the buttons
    $(".navButton").click(function () {
      // Remove the selected class from all navItems
        $(".navItem .overlay").removeClass("selected");

      // Add the selected class only to the clicked navItem
        $(this).find(".overlay").addClass("selected");

        const buttonClassName = $(this).attr("class").split(" ")[1];
        if (buttonClassName == "rsvpButton") $('.contentContainer').css('border-radius', '0 10px 10px 10px');
        else if (buttonClassName == "messageButton") $('.contentContainer').css('border-radius', '10px 0 10px 10px');
        else $('.contentContainer').css('border-radius', '10px');
        
    });

    function updateCountdown() {
        // Set the target date (October 23, 2023 1:00 PM GMT+8)
        const targetDate = new Date("2023-10-23T13:00:00+08:00");
  
        // Get the current date and time
        const now = new Date();
  
        // Calculate the time difference between now and the target date
        const timeDifference = targetDate - now;
  
        // Calculate the number of days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
        // Format the countdown string
        const countdownStringDays = `${days.toString().padStart(2, "0")}`;
        const countdownStringHours = `${hours.toString().padStart(2, "0")}`;
        const countdownStringMinutes = `${minutes.toString().padStart(2, "0")}`;
        const countdownStringSeconds = `${seconds.toString().padStart(2, "0")}`;
  
        // Display the countdown on the HTML element
        $("#days").text(countdownStringDays);
        $("#hours").text(countdownStringHours);
        $("#minutes").text(countdownStringMinutes);
        $("#seconds").text(countdownStringSeconds);
      }
  
      // Update the countdown every second
      setInterval(updateCountdown, 1000);
  
      // Call the updateCountdown function immediately to display the initial countdown
      updateCountdown();

    
});
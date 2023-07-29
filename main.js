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

    
});
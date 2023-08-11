$(document).ready(function() {
  const keyValue = getParameterValue("key");
  const dkeyValue = getParameterValue("dkey");
  updateText(keyValue, dkeyValue);

  $(".contentContainer").hide();
  $("#weddingContent").show();

  //initial page load
  $('.snapshotsContent').hide();
  $('.locationContent').hide();
  $('.faqContent').hide();
  
  $(".navItem:first-child .overlay").addClass("selected");
  // Function to handle the click event on the buttons
  $(".navButton").click(function () {
    // Remove the selected class from all navItems
    $(".navItem .overlay").removeClass("selected");

    // Add the selected class only to the clicked navItem
    $(this).find(".overlay").addClass("selected");
  });



  $(".weddingButton").click(function() {
    $(".contentContainer").hide();
    $("#weddingContent").show();
  });

  $(".rsvpButton").click(function() {
    $(".contentContainer").hide();
    $("#rsvpContent").show();
  });

  $(".snapshotsButton").click(function() {
    $(".contentContainer").hide();
    $("#snapshotsContent").show();
  });

  $(".locationButton").click(function() {
    $(".contentContainer").hide();
    $("#locationContent").show();
  });

  $(".faqButton").click(function() {
    $(".contentContainer").hide();
    $("#faqContent").show();
  });

  $(".programButton").click(function() {
    $(".contentContainer").hide();
    $("#programContent").show();
  });

  $(".countdownButton").click(function() {
    $(".contentContainer").hide();
    $("#countdownContent").show();
  });

  $(".messageButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '0 0 10px 10px');
    $("#messageContent").show();
  });

  // Add similar click handlers for other buttons

  $(".moreButton").click(function() {
    $(".weddingNav, .rsvpNav, .snapshotsNav, .locationNav, .moreNav").hide();
    $(".faqNav, .backNav, .programNav, .countdownNav, .messageNav").show();
    $(".navItem.faqNav .overlay").addClass("selected");
    $(".contentContainer").hide();
    $("#faqContent").show();
  });

  // Show the initial buttons and hide the extra buttons when the "Back" button is clicked
  $(".backButton").click(function() {
    $(".weddingNav, .rsvpNav, .snapshotsNav, .locationNav, .moreNav").show();
    $(".faqNav, .backNav, .programNav, .countdownNav, .messageNav").hide();
    $(".navItem.locationNav .overlay").addClass("selected");
    $(".contentContainer").hide();
    $("#locationContent").show();
  });


  $('.faqCollapseButton').click(function() {
    const container = $(this).closest('.faqCards');
    const textContainer = container.find('.faqTextContainer');
    const titleContainer = container.find('.faqTitleContainer');
    const collapseIcon = container.find('.collapseIcon');
    textContainer.slideToggle();
    
    titleContainer.toggleClass('faqTitleContainerNoRadiusBottom');

    collapseIcon.attr('src', function(index, attr) {
      return attr.endsWith('plus.png') ? './images/minus.png' : './images/plus.png';
    });
    
  });






  //// FUNCTIONS ////

  function updateCountdown() {
    // Set the target date (October 3, 2023 1:00 PM GMT+8)
    const targetDate = new Date("2023-10-03T13:00:00+08:00");

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

  function getParameterValue(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
  }

  async function encrypt(text, key) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const keyData = encoder.encode(key);
    const cryptoKey = await crypto.subtle.importKey("raw", keyData, "AES-CBC", false, ["encrypt"]);
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, cryptoKey, data);
    const encryptedArray = Array.from(new Uint8Array(encryptedData));
    const encryptedHex = encryptedArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return encryptedHex;
  }

  async function decrypt(encryptedHex, key) {
    const decoder = new TextDecoder();
    const encryptedArray = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const keyData = new TextEncoder().encode(key);
    const cryptoKey = await crypto.subtle.importKey("raw", keyData, "AES-CBC", false, ["decrypt"]);
    const decryptedData = await crypto.subtle.decrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, cryptoKey, encryptedArray);
    return decoder.decode(decryptedData);
  }


  async function updateText(keyValue, key) {
    try {
      const decryptedValue = await decrypt(keyValue, key);
      $(".highlightText").text("Hi " + decryptedValue + ",");
    } catch (error) {
      $(".highlightText").text("Hi,");
      console.error("Error during decryption:", error);
    }
  }


  function generateRandomHexBytes() {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    const hexString = Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hexString;
  }





    // Update the countdown every second
    setInterval(updateCountdown, 1000);

    // Call the updateCountdown function immediately to display the initial countdown
    updateCountdown();

    
});
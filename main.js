let firstName = "";

$(document).ready(function() {
  const name = getParameterValue("nme");
  const key = getParameterValue("vk");
  if(name && key) {
    var guestName = vigenereDecrypt(name, key);
    guestName = capitalizeWords(guestName);
    const nameParts = guestName.split(' ');
    nameParts.pop();
    firstName = nameParts.join(' ');

    //console.log(guestName);
    $("#inviteeName").text("Hi " + firstName + ",");
  }
  else {
    $("#highinviteeNamelightText").text("Hi,");
  }


  $('.carousel').slick({
    slidesToShow: 1,
    centerMode: true,
  });

  
  // var url ='example.com';
  // var testURl = addParametersToUrl(url, guestNameEncrypted, key)
  // console.log(testURl);

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
    $(".mainContentContainer").css('border-radius', '0 10px 10px 10px');
    $("#weddingContent").show();
  });

  $(".rsvpButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#rsvpContent").show();
  });

  $(".snapshotsButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#snapshotsContent").show();
  });

  $(".locationButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#locationContent").show();
  });

  $(".faqButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#faqContent").show();
  });

  $(".programButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#programContent").show();
  });

  $(".countdownButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#countdownContent").show();
  });

  $(".messageButton").click(function() {
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px 0 10px 10px');
    $("#messageContent").show();
  });

  // Add similar click handlers for other buttons

  $(".moreButton").click(function() {
    $(".weddingNav, .rsvpNav, .snapshotsNav, .locationNav, .moreNav").hide();
    $(".faqNav, .backNav, .programNav, .countdownNav, .messageNav").show();
    $(".navItem.faqNav .overlay").addClass("selected");
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#faqContent").show();
  });

  // Show the initial buttons and hide the extra buttons when the "Back" button is clicked
  $(".backButton").click(function() {
    $(".weddingNav, .rsvpNav, .snapshotsNav, .locationNav, .moreNav").show();
    $(".faqNav, .backNav, .programNav, .countdownNav, .messageNav").hide();
    $(".navItem.locationNav .overlay").addClass("selected");
    $(".contentContainer").hide();
    $(".mainContentContainer").css('border-radius', '10px');
    $("#locationContent").show();
  });


  $('.faqCollapseButton').click(function() {
    const container = $(this).closest('.faqCards');
    const textContainer = container.find('.faqTextContainer');
    const titleContainer = container.find('.faqTitleContainer');
    const collapseIcon = container.find('.collapseIcon');
    textContainer.slideToggle(500);
    
    collapseIcon.attr('src', function(index, attr) {
      if (attr.endsWith('plus.png')) {
        titleContainer.toggleClass('faqTitleContainerNoRadiusBottom');
      }
      else{
        setTimeout(function() {
          titleContainer.toggleClass('faqTitleContainerNoRadiusBottom');
        }, 500); // Delay of 500 milliseconds
      }
    });

    collapseIcon.attr('src', function(index, attr) {
      return attr.endsWith('plus.png') ? './images/minus.png' : './images/plus.png';
    });

    
  });


    // Update the countdown every second
    setInterval(updateCountdown, 1000);

    // Call the updateCountdown function immediately to display the initial countdown
    updateCountdown();

    
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



function vigenereEncrypt(plainText, key) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const plainTextLower = plainText.toLowerCase();
  const keyRepeated = key.repeat(Math.ceil(plainText.length / key.length)).toLowerCase();
  let cipherText = "";

  for (let i = 0; i < plainText.length; i++) {
    const plainChar = plainTextLower[i];
    const keyChar = keyRepeated[i];
    const isAlphabet = /[a-zA-Z]/.test(plainChar);

    if (isAlphabet) {
      const shift = alphabet.indexOf(keyChar);
      const isUpperCase = /[A-Z]/.test(plainChar);
      const offset = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
      const newIndex = (plainChar.charCodeAt(0) - offset + shift) % 26 + offset;
      cipherText += String.fromCharCode(newIndex);
    } else {
      cipherText += plainChar;
    }
  }

  return cipherText;
}


function vigenereDecrypt(cipherText, key) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const cipherTextLower = cipherText.toLowerCase();
  const keyRepeated = key.repeat(Math.ceil(cipherText.length / key.length)).toLowerCase();
  let plainText = "";

  for (let i = 0; i < cipherText.length; i++) {
    const cipherChar = cipherTextLower[i];
    const keyChar = keyRepeated[i];
    const isAlphabet = /[a-zA-Z]/.test(cipherChar);

    if (isAlphabet) {
      const shift = alphabet.indexOf(keyChar);
      const isUpperCase = /[A-Z]/.test(cipherChar);
      const offset = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
      const newIndex = (cipherChar.charCodeAt(0) - offset - shift + 26) % 26 + offset;
      plainText += String.fromCharCode(newIndex);
    } else {
      plainText += cipherChar;
    }
  }

  return plainText;
}

function addParametersToUrl(url, nmeValue, vkValue) {
  const delimiter = url.includes('?') ? '&' : '?';
  const updatedUrl = `${url}${delimiter}nme=${encodeURIComponent(nmeValue)}&vk=${encodeURIComponent(vkValue)}`;
  return updatedUrl;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

// async function updateText(keyValue, key) {
//   const decryptedValue = '';
//   try {
//     ecryptedValue = await decrypt(keyValue, key);
//     $(".highlightText").text("Hi " + decryptedValue + ",");
//   } catch (error) {
//     $(".highlightText").text("Hi,");
//     console.error("Error during decryption:", error);
//   }

//   if(decryptedValue) return decryptedValue;
  
// }


// function generateRandomHexBytes() {
//   const randomBytes = new Uint8Array(16);
//   window.crypto.getRandomValues(randomBytes);
//   const hexString = Array.from(randomBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
//   return hexString;
// }
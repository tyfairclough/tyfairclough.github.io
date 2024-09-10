// import { Button, Modal, Offcanvas } from 'bootstrap';
import * as bootstrap from 'bootstrap';

import '../css/main.scss'
import '../css/all.css'

// // App / Screening questiosn
// $("#data-proto-table-active").on("click", function() {
//     // console.log("hola");
//     $("table tr[data-proto-table-active]").toggle();
//   });



// const buttons = document.querySelectorAll('button[data-path]');  // Select all buttons with data-path attribute

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     const path = button.dataset.path;  // Access data-path using dataset property
//     window.location.href = path;  // Redirect to the path stored in the variable
//   });
// });



// //
// // GET OFF CANVASS TO WORK
// //
//   document.getElementById('avatar').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasAvatar'));
//     offcanvas.show();
//   });
  
//   document.getElementById('easyapply').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasEasyApply'));
//     offcanvas.show();
//   });
//   document.getElementById('education').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasEducation'));
//     offcanvas.show();
//   });
//   document.getElementById('experience').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasExperience'));
//     offcanvas.show();
//   });
//   document.getElementById('message').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasMessage'));
//     offcanvas.show();
//   });
//   document.getElementById('resume').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasResume'));
//     offcanvas.show();
//   });
//   document.getElementById('socials').addEventListener('click', function() {
//     const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasSocials'));
//     offcanvas.show();
//   });
  
$(document).ready(function() {




const bodyElement = document.body;

switch (bodyElement.id) {
  case "concept_01_step_01":
    concept_01_step_01();
    break;
  case "concept_01_step_02":
    concept_01_step_02();
    break;
  case "concept_01_step_03":
    concept_01_step_03();
    break;
  case "concept_01_step_04":
    concept_01_step_04();
    break;
  case "concept_01_step_05":
    concept_01_step_05();
    break;
  default:
    // Default case if the ID doesn't match any of the strings
    console.log("ID not found");
}


let isMicrophoneEnabled = false;

function concept_01_step_02() {
  $("#enable-mic").click(function() {
    // Function to be executed when the link is clicked
    requestMicrophoneAccess();
  });
}

function requestMicrophoneAccess() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);   


      // Process the audio stream here (e.g., play it, analyze it)
      audioSource.connect(audioContext.destination);

      // Microphone is enabled, so enable the button
      isMicrophoneEnabled = true;
      $("#start-call").removeClass("disabled").addClass("btn-primary");
    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
    });
}

// Initial state: microphone is not enabled, so disable the button
$("#start-call").addClass("disabled");


function concept_01_step_03(){
  function loadPageAfter() {
    setTimeout(function() {
      // Replace 'target_page.html' with the actual URL of the page you want to load
      window.location.href = 'step_04.html';
    }, 3000); // 10000 milliseconds = 10 seconds
  }
  
  loadPageAfter();
}

function concept_01_step_04(){

  // Create an array of SVG path strings, each defining a line starting from a specific point on the SVG canvas
const PATH_ARRAY = Array.from({ length: 255 }, (_, index) => `M ${index},255 l 0,-0`);

// Function to handle successful audio access
const handleAudioStream = (audioStream) => {
  // Create an AudioContext to manage audio operations
  const audioContext = new AudioContext();

  // Create an AnalyserNode to extract frequency data from the audio stream
  const analyser = audioContext.createAnalyser();

  // Create a source node from the audio stream
  const source = audioContext.createMediaStreamSource(audioStream);

  // Connect the source to the analyser
  source.connect(analyser);

  // Set the FFT (Fast Fourier Transform) size for frequency analysis
  analyser.fftSize = 1024;

  // Create a Uint8Array to store frequency data
  const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  // Function to continuously update the visual representation of audio frequencies
  const updateVisualization = () => {
    // Find the container in the HTML document where the SVG visualization will be rendered
    const container = document.querySelector('#mask');

    // Clear the container for new visualizations
    container.innerHTML = '';

    // Request animation frame for smooth updates
    requestAnimationFrame(updateVisualization);

    // Get frequency data into the frequencyArray
    analyser.getByteFrequencyData(frequencyArray);

    // Map the PATH_ARRAY with frequency data to create SVG path elements
    PATH_ARRAY.forEach((path, index) => {
      // Calculate the new length of the SVG path based on frequency data
      const newLength = Math.floor(frequencyArray[index]) - (Math.floor(frequencyArray[index]) % 5);

      // Create an SVG path element
      const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      // Set attributes for the SVG path
      element.setAttribute('d', `M ${index},255 l 0,-${newLength / 5}`);

      // Append the SVG path to the container
      container.appendChild(element);
    });
  };

  // Start the continuous visualization
  updateVisualization();
};

// Function to handle errors if audio access fails
const handleAudioError = (error) => {
  alert(error);
};

// Main function to initiate audio stream access
const initializeAudioVisualization = () => {
  // Try to access the user's audio input
  navigator.getUserMedia({ audio: true, video: false }, handleAudioStream, handleAudioError);
};

// Call the main function to begin the audio stream access
initializeAudioVisualization();
  

const chatContainer = document.getElementById('chat-container');

// Function to create a chat message element
function createMessageElement(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');

  // Create spans for each word
  const words = message.split(' ');
  words.forEach(word => {
    const wordElement = document.createElement('span');
    wordElement.textContent = word + ' ';
    messageElement.appendChild(wordElement);
  });

  return messageElement;
}

// Function to prepend a message to the chat container (newest at top)
function prependMessage(message, isUser) {
  const messageElement = createMessageElement(message, isUser);
  chatContainer.prepend(messageElement);

  // Animate the words
  animateWords(messageElement);
}

// Function to animate the words in a message element
function animateWords(messageElement) {
  const words = messageElement.querySelectorAll('span');
  let index = 0;

  const intervalId = setInterval(() => {
    words[index].style.opacity = 1;
    index++;

    if (index >= words.length) {
      clearInterval(intervalId);
    }
  }, 100); // Adjust the delay as needed
}

// Sample chat messages
const chatMessages = [
  { message: "Hello there!", isUser: false },
  { message: "I need help with my homework.", isUser: true },
  { message: "How can I help you today?", isUser: false },
  { message: "I need help with my homeworkneed help with my homework neI need help with my homeworkneed help with my homework ney?", isUser: false },
  { message: "I need help with my homework.", isUser: true },
  { message: "How can I help you today?", isUser: false },
  { message: "I need with my homework.", isUser: true },
  { message: "I need help with my homeworkneed help with my homework need help with my homework.", isUser: true },
  { message: "I need help with my homework.", isUser: true },
  { message: "How can I help you today?", isUser: false },
  { message: "HI need help with my homeworkneed help with my homework neI need help with my homeworkneed help with my homework neI need help with my homeworkneed help with my homework ne", isUser: false },
  { message: "I need help with my homework.", isUser: true },
  { message: "How can I help you today?", isUser: false },
  { message: "I need help with my homewp with my homewp with my homework.", isUser: true },
  { message: "I need with my homework.", isUser: true },
  { message: "I need help with my homeworkneed help with my homework need help with my homework.", isUser: true },
  { message: "I need help with my homework.", isUser: true },
  { message: "How can I help you today?", isUser: false },
  { message: "HI need help with my homeworkneed help with my homework neI need help with my homeworkneed help with my homework neI need help with my homeworkneed help with my homework ne", isUser: false },
  { message: "I need help with my homework.", isUser: true },
  { message: "How can I help you today?", isUser: false },
  { message: "I need help with my homewp with my homewp with my homework.", isUser: true },
  { message: "I need help with my homneed help with my homneed help with my homneed help with my homework.", isUser: true },
  { message: "Sure, I can help with that. What subject is it?", isUser: false }
];

// Function to simulate a chat conversation
function simulateChat() {
  chatMessages.forEach((message, index) => {
    setTimeout(() => {
      prependMessage(message.message, message.isUser);
    }, index * 2500); // Adjust the delay as needed
  });
}

// Start the simulation
simulateChat();



var bar1 = new ProgressBar.SemiCircle(circle1, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 17780,
  color: '#ced4da',
  trailColor: '#eee',
  trailWidth: 8,
  svgStyle: null
});

bar1.animate(1.0);  // Number from 0.0 to 1.0

var bar2 = new ProgressBar.SemiCircle(circle2, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 33600,
  color: '#6c757d',
  trailColor: '#eee',
  trailWidth: 8,
  svgStyle: null
});

setTimeout(function() {
  bar2.animate(1.0); // Number from 0.0 to 1.0
}, 2000); // 7 seconds delay

var bar3 = new ProgressBar.SemiCircle(circle3, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 33600,
  color: '#495057',
  trailColor: '#eee',
  trailWidth: 8,
  svgStyle: null
});

setTimeout(function() {
  bar3.animate(1.0); // Number from 0.0 to 1.0
}, 7000); // 7 seconds delay


}


function concept_01_step_05(){
  function redirectToConcept01Step06() {
    window.location.href = "step_06.html";
  }
  
  setTimeout(redirectToConcept01Step06, 5000); // 5000 milliseconds = 5 seconds
}


//   experienceObject = JSON.parse(localStorage.getItem("experienceObject"));

//   // THIS GETS THE JSON IF IT EXISTS OTHERWISE IT SETS THE DEFAULT JSON
//   if (experienceObject === null ) {
//     console.log("i did not find the locale storage")
//     var experienceObject = [
//       {
//         "name": "Default experience",
//         "status": "published",
//         "items": [
//           {
//             "type": "header",
//             "visible": true,
//             "required": false,
//             "name": "Preliminary questions"
//           },
//           {
//             "type": "text",
//             "visible": true,
//             "required": true,
//             "name": "Name"
//           }
//         ]
//       },
//       {
//         "name": "My experience",
//         "status": "unpublished",
//         "items": [
//           {
//             "type": "name",
//             "visible": true,
//             "required": true,
//             "name": "Name",
//             "config": [
//               {
//                 "First name": true,
//                 "Last name": true
//               }
//             ]
//           },
//           {
//             "type": "email",
//             "visible": true,
//             "required": true,
//             "name": "Email"
//           },
//           {
//             "type": "phone",
//             "visible": true,
//             "required": false,
//             "name": "Phone"
//           },
//           {
//             "type": "location",
//             "visible": true,
//             "required": false,
//             "name": "Location"
//           }
//         ]
//       }
//     ]

//       localStorage.setItem("experienceObject",JSON.stringify(experienceObject));
//       const messageType = "messageSuccess";
//       reloadWithToastMessage(messageType);

//   } else {
//     console.log("i found the localstorage")
//     var currentExperience = 1;
//     getExperienceObject(currentExperience);
//   }



//       localStorage.setItem("experienceObject",JSON.stringify(experienceObject));


//   function getExperienceObject(currentExperience){
//     experienceObject = JSON.parse(localStorage.getItem("experienceObject"));
//     htmlOutput = "";
//     htmlOutput += "<table class='table align-middle'><thead><tr class=''><th class=''>Item</th><th>Attributes</th><th>Required</th><th></th></th></tr></thead><tbody>";
//     console.log("here");

//     for (var i = 0; i < experienceObject[currentExperience].items.length; i++) {
//       itemName = experienceObject[currentExperience].items[i].name;
//       itemRequired = experienceObject[currentExperience].items[i].required;
//       var itemAttributes = experienceObject[currentExperience].items[i].config;
      
//       htmlOutput += "<tr class='align-middle' data-row="+i+">";
//       htmlOutput += "<td class=''>"+ itemName +"</td>";
//       htmlOutput += "<td class='align-middle'>"+ getFieldAttributes(itemAttributes) +"</td>";
//       htmlOutput += "<td class='fit align-middle'>"+ requiredOrNot(itemRequired) +"</td>";
//       htmlOutput += "<td class='fit align-middle'><button class='btn'><i class='fal fa-cog fa-2x'></i></button></td>";
//       htmlOutput += "</tr>";
//   }
//     htmlOutput += "</tbody>";
  

//   $("#experienceTable").append(htmlOutput).ready(function () {
//     });
//   }
  

//   function requiredOrNot(itemRequired){
//     var requiredOrNotString = "";
//     if (itemRequired == true ){
//       requiredOrNotString += "<span class='fa-stack'><i class='far fa-primary fa-circle fa-stack-2x'></i><i class='fa fa-primary fa-check fa-stack-1x'></i></span>";
//     } else if (itemRequired == false) {
//       requiredOrNotString += "<span class='fa-stack'><i class='far fa-danger fa-circle fa-stack-2x'></i><i class='fa fa-danger fa-times fa-stack-1x'></i></span>";
//     } else {
//       requiredOrNotString += "N/A";
//     }

//     return requiredOrNotString;
//   }


//   function getFieldAttributes(fieldAttributes) {
//     var fieldAttributesString = "";
//     if (fieldAttributes) {
//       for (var j = 0; j < fieldAttributes.length; j++) {
//         var config = fieldAttributes[j];
//         for (var attribute in config) {
//           if (config.hasOwnProperty(attribute)) {
//             if (config[attribute] === true) {
//               // fieldAttributesString += attribute +;
//               fieldAttributesString += "<span class='badge text-bg-secondary'>"+ attribute+"</span>";
//             }
//           }
//         }
//       }
//     }
//     return fieldAttributesString;
//   }

  
// // Easy Apply config
//   $("#saveEasyApply").on("click", function() {
//     // 1. Get checkboxes and create an empty config object
//     const checkboxes = document.querySelectorAll("#formEasyApply input[type=checkbox]");
//     const config = {};

//     // 2. Loop through checkboxes and add their data-apply-type and checked state
//     for (const checkbox of checkboxes) {
//       const applyType = checkbox.dataset.applyType;
//       config[applyType] = checkbox.checked;
//     }

//     console.log(config);

//     // 3. Check if experienceObject exists in localStorage
//     let experienceObject;
//     try {
//       experienceObject = JSON.parse(localStorage.getItem("experienceObject"));
//     } catch (error) {
//       // Handle potential parsing error (e.g., invalid JSON format)
//       console.error("Error parsing experienceObject from localStorage:", error);
//       experienceObject = []; // Initialize with empty array if parsing fails
//     }

//     // 4. Modify the desired experience object (assuming index 1)
//     experienceObject[1].items.push({
//       "type": "easyApply",
//       "visible": true,
//       "required": false,
//       "name": "EasyApply",
//       "config": [config]
//     });

//     // 5. Save the updated experienceObject to localStorage
//     localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//     console.log("update table")
//     const messageType = "messageSuccess";
//     reloadWithToastMessage(messageType);

//   });


//   // Social profiles config
  

//   $("#saveSocialProfiles").on("click", function() {
//     // 1. Get checkboxes and create an empty config object
//     const checkboxes = document.querySelectorAll("#formSocialProfiles input[type=checkbox]");

//     var linkedInVisible = $("#linkedInVisible").is(":checked");
//     var linkedInRequired = $("#linkedInRequired").is(":checked");
//     var websiteVisible = $("#websiteVisible").is(":checked");
//     var websiteRequired = $("#websiteRequired").is(":checked");
//     var facebookVisible = $("#facebookVisible").is(":checked");
//     var facebookRequired = $("#facebookRequired").is(":checked");
//     var twitterVisible = $("#twitterVisible").is(":checked");
//     var twitterRequired = $("#twitterRequired").is(":checked");
    

//     // 3. Check if experienceObject exists in localStorage
//     let experienceObject;
//     try {
//       experienceObject = JSON.parse(localStorage.getItem("experienceObject"));
//     } catch (error) {
//       // Handle potential parsing error (e.g., invalid JSON format)
//       console.error("Error parsing experienceObject from localStorage:", error);
//       experienceObject = []; // Initialize with empty array if parsing fails
//     }

//     // 4. Modify the desired experience object (assuming index 1)
//     experienceObject[1].items.push({
//       "type": "socialProfiles",
//       "visible": true,
//       "required": false,
//       "name": "Social profiles",
//       // "config": [config]

//       "config": [
//         {
//           "LinkedIn": linkedInVisible,
//           "Website": websiteVisible,
//           "Facebook": facebookVisible,
//           "Twitter": twitterVisible
//         }
//       ]

//     });

//     // 5. Save the updated experienceObject to localStorage
//     localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//     console.log("update table")
//     const messageType = "messageSuccess";
//     reloadWithToastMessage(messageType);

//   });


// // END  Social profiles config



//   // Applicant avatar script

// // required can't be checked without visible checked script
//   $("#applicantAvatarRequired").on("click", function() {
//     $("#applicantAvatarVisible").prop("checked", true);
//   });


// // saving applicant avatar settings
//   $("#saveApplicantAvatar").on("click", function() {
//     let experienceObject;
//     experienceObject = JSON.parse(localStorage.getItem("experienceObject"));


//     var isVisible = $("#applicantAvatarRequired").prop("checked");

// if (isVisible) {
//   avatarVisible = true;
// } else {
//   avatarVisible = false;
// }

// var isRequired = $("#applicantAvatarRequired").prop("checked");
// if (isRequired) {
//   avatarRequired = true;
// } else {
//   avatarRequired = false;

// }
//     experienceObject[1].items.push({
//       "type": "applicantAvatar",
//       "visible": avatarVisible,
//       "required": avatarRequired,
//       "name":"Applicant avatar"
//     });
//     localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//     const messageType = "messageSuccess";
//     reloadWithToastMessage(messageType);
//   });

//   $("#educationRequired").on("click", function() {
//     var isEducationVisible = $("#educationVisible").prop("checked");
  
//     if (isEducationVisible) {
//       // Education is visible, handle the case where required is checked
//     } else {
//       // Education is not visible, handle the case where required is checked (potentially an error)
//       console.error("Education cannot be required when it's not visible!");
//     }
//   });



  
  

// // education script
// // required can't be checked without visible checked script

// // offcanvasEducation

// $("#saveEducation").on("click", function() {

//   let experienceObject;
//   experienceObject = JSON.parse(localStorage.getItem("experienceObject"));

//   var educationVisible;
//       educationVisible = true
//   var educationRequired;
//       educationRequired = $("#educationRequired").is(':checked');
//       console.log("education required is : " + educationRequired);
//   var educationDatesVisible;
//       educationDatesVisible = $("#educationDatesVisible").is(':checked');
//       console.log("educationDatesVisible is : " + educationDatesVisible); 
//   var educationDatesRequired;
//   educationDatesRequired = $("#educationDatesRequired").is(':checked');
//       console.log("educationDatesRequired is : " + educationDatesRequired);
 


//     experienceObject[1].items.push({
//       "type": "education",
//       "visible": educationVisible,
//       "required": educationRequired,
//       "name":"Education",
//       "config": [
//         {
//           "Show dates": educationDatesVisible,
//           "Dates required": educationDatesRequired
//         }
//       ]
//     });

//     localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//     const messageType = "messageSuccess";
//     reloadWithToastMessage(messageType);



// });


// $("#saveExperience").on("click", function() {

//   let experienceObject;
//   experienceObject = JSON.parse(localStorage.getItem("experienceObject"));

//   var experienceRequired;
//   experienceRequired = $("#experienceRequired").is(':checked');
//   console.log("experience required is " + experienceRequired);

// flexCheckDefault
//   experienceObject[1].items.push({
//     "type": "experience",
//     "visible": true,
//     "required": experienceRequired,
//     "name":"Experience"
//   });
//   localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//   const messageType = "messageSuccess";
//   reloadWithToastMessage(messageType);


// });



// $("#saveResume").on("click", function() {

//   let experienceObject;
//   experienceObject = JSON.parse(localStorage.getItem("experienceObject"));

//   var resumeRequired;
//   resumeRequired = $("#resumeRequired").is(':checked');
//   console.log("resume required is " + resumeRequired);

// flexCheckDefault
//   experienceObject[1].items.push({
//     "type": "resume",
//     "visible": true,
//     "required": resumeRequired,
//     "name":"Resume"
//   });
//   localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//   const messageType = "messageSuccess";
//   reloadWithToastMessage(messageType);




// });

// $("#saveMessage").on("click", function() {

//   let experienceObject;
//   experienceObject = JSON.parse(localStorage.getItem("experienceObject"));

//   var messageRequired;
//   messageRequired = $("#messageRequired").is(':checked');
//   console.log("message required is " + messageRequired);

// flexCheckDefault
//   experienceObject[1].items.push({
//     "type": "message",
//     "visible": true,
//     "required": messageRequired,
//     "name":"Message to the Hiring Manager"
//   });
//   localStorage.setItem("experienceObject", JSON.stringify(experienceObject));
//   // location.reload();



//   const messageType = "messageSuccess";
//   reloadWithToastMessage(messageType);


// });



// //
// // Present Toast on page load if parameter is in URL
// //


// function checkToastMessage() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const toastMessage = urlParams.get('toastMessage');
//     feedbackMsg = "";
//   if (toastMessage === 'messageSuccess') {
//     console.log("hello world");

//     // feedbackMsg += "<div id='liveToast' class='toast align-items-center' role='alert' aria-live='assertive' aria-atomic='true'>";
//     // feedbackMsg += "<div class='d-flex'><div class='toast-body' id='toastMessage'>";
//     feedbackMsg += "Successfully added";
//     // feedbackMsg += "</div>    <button type='button' class='btn-close me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button></div></div>";
  
//     const toastEl = document.querySelector('.toast'); // Get the toast element
  
//     // (Optional) Set options (like auto-hiding)
//     const toast = new bootstrap.Toast(toastEl, {
//       autohide: true, // Set to false to disable auto-hiding
//       delay: 5000 // Delay in milliseconds before auto-hiding
//     });
  
//     // toast.show(); // This shows the toast notification
  
//     toastEl.querySelector('.toast-body').innerHTML = feedbackMsg;
//     toast.show();


//   } else if (toastMessage === 'messageFailed') {
//     console.log("goodbye world");


//     // feedbackMsg += "<div id='liveToast' class='toast align-items-center' role='alert' aria-live='assertive' aria-atomic='true'>";
//     // feedbackMsg += "<div class='d-flex'><div class='toast-body' id='toastMessage'>";
//     feedbackMsg += "Successfully added";
//     // feedbackMsg += "</div>    <button type='button' class='btn-close me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button></div></div>";
  
//     const toastEl = document.querySelector('.toast'); // Get the toast element
  
//     // (Optional) Set options (like auto-hiding)
//     const toast = new bootstrap.Toast(toastEl, {
//       autohide: true, // Set to false to disable auto-hiding
//       delay: 5000 // Delay in milliseconds before auto-hiding
//     });
  
//     // toast.show(); // This shows the toast notification
  
//     toastEl.querySelector('.toast-body').innerHTML = feedbackMsg;
//     toast.show();



//   } else {
//     console.log("No toast message found in URL or invalid value");
//   }
// }

// checkToastMessage();





// // Sets a toast in the URL
// function reloadWithToastMessage(messageType) {
//   const url = new URL(window.location.href);
//   url.searchParams.set('toastMessage', messageType);
//   window.location.href = url.toString();
// }

});
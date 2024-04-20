function hideTerminal() {
  const divToHide = document.getElementById("terminal");
  divToHide.style.display = "none";
}

function showTerminal() {
  if (!this.dataset.clicks) {
    this.dataset.clicks = 1;
  } else {
    this.dataset.clicks++;
  }
  setTimeout(() => {
    this.dataset.clicks = 0;
  }, 500);

  if (parseInt(this.dataset.clicks) === 2) {
    const divToHide = document.getElementById("terminal");
    divToHide.style.display = "block";
    this.dataset.clicks = 0;
    var existingInputs = document.querySelectorAll(".textInput"); // Select all existing elements with the specified class
    var latestInput = existingInputs[existingInputs.length - 1];
    latestInput.focus();
  }
}

function resizeTerminal() {
  const divToResize = document.getElementById("terminal");
  if (divToResize.style.width === "100%") {
    divToResize.style.width = "60%";
    divToResize.style.height = "60%";
  } else {
    divToResize.style.left = "50%";
    divToResize.style.top = "50%";
    divToResize.style.width = "100%";
    divToResize.style.height = "100%";
  }
}

function createHelp() {
  return "";
}

const helpHtml = `<ul>
<li> <code>about</code>&emsp;&emsp;Display information about me</li>
<li> <code>clear</code>&emsp;&emsp;Clean the terminal</li>
<li> <code>experience</code>&emsp;&emsp;Display experience</li>
<li> <code>education</code>&emsp;&emsp;Display education</li>
<li> <code>projects</code>&emsp;&emsp;Display list of projects</li>
<li> <code>cv</code>&emsp;&emsp;Get my CV</li>
<li> <code>contact</code>&emsp;&emsp;Display list of ways to contact me</li>
<li> <code>help</code>&emsp;&emsp;Display the available commands</li>
</ul>`;

const educationHtml = `
<ul>
    <li><div class="code-line">Oscar course - IT & Devops Course, IDF</div>September 2019 - December 2019</li>
    <li><div class="code-line">Open university - Computer Science (B.Sc)</div>October 2022 - Present</li>
    <li><div class="code-line">Magshimim - National Cyber Education Program</div>September 2016 - June 2019</li>
</ul>
`;

const experienceHtml = `
  <ul>
    <li>
    <div class="experience-div">
    <div class="experience-div-title">
    <h1 class="code-line">81 Technological Unit, IDF — Lead Fullstack Engineer</h1>
    <p>May 2021 - August 2023</p>
    </div>
      <p>
        Lead developer in a fullstack team using a stack of ReactJS, Django and
        NodeJS. Active in every stage of the project development cycle including
        - understanding the needs of the customer, designing the solution,
        software architecture design, development, testing and deployment.
        Created a leading fullstack training program used by my team and several
        others in the same unit as well as a team in another unit. In charge of
        the team’s training, technologies and workflow.
        <br /><br/>
      </p>
      </div>
    </li>
    <li>
    <div class="experience-div">
    <div class="experience-div-title">
      <h1 class="code-line">81 Technological Unit, IDF — Fullstack Engineer</h1>
      <p>January 2020 - May 2021</p>
      </div>
      <p>
        Developed a fullstack automation system using a variety of technologies
        including React, multiple virtualization solutions (such as VMWare, KVM,
        dockers), Gitlab’s CI/CD and python. Developed and worked on smaller
        scale fullstack projects. Worked on multiple POCs that required research
        in varied fields, such as networking, telephony and niche technologies.
      </p>
      </div>
      <br /><br/>
    </li>
  </ul>
`;

const aboutHtml = `<p>Hey, I'm Eyal Amitay! 👋 <br /><br/> I'm a fullstack, software engineer who loves to learn new things and accuire random hobbies. <br /> Lets stay in touch!</p>`;

const projectsHtml = "<p>To be added...</p>";

const contactHtml = `
  <ul>
    <li><code>Gmail</code>
    <a href="mailto:eyaldamitay@gmail.com">
    eyaldamitay@gmail.com
  </a></li>
    <li><code>
      LinkedIn</code>
      <a href="https://www.linkedin.com/in/eyal-amitay-579477244/">
        https://www.linkedin.com/in/eyal-amitay-579477244/
      </a>
    </li>
    <li>
    <code>Github</code>
    <a href="https://github.com/ItsEyal">
    github.com/ItsEyal
  </a></li>
  </ul>
`;

const cvHtml = ""; //`<a id='download-cv' download="resume_Eyal_.pdf"></a> <br/>`;

const actions = {
  about: aboutHtml,
  experience: experienceHtml,
  education: educationHtml,
  projects: projectsHtml,
  cv: cvHtml,
  contact: contactHtml,
  help: helpHtml,
  cls: "",
  clear: "",
  exit: "",
};

function handleKeyPress(event) {
  var existingInputs = document.querySelectorAll(".textInput"); // Select all existing elements with the specified class
  var latestInput = existingInputs[existingInputs.length - 1]; // Select the latest element
  const inputValue = latestInput.value.trim().toLowerCase();
  if (event.key === "Enter") {
    terminalHistory.push(inputValue);
    historyIndex = terminalHistory.length;
    if (actions.hasOwnProperty(inputValue)) {
      if (inputValue === "clear" || inputValue === "cls") {
        document.getElementById("terminal-body").innerHTML = "";
      } else if (inputValue === "cv") {
        const pdfFilePath = "resume_Eyal_.pdf"; // Replace with the path to your PDF file
        downloadPDF(pdfFilePath);
        addHTML("<br/>");
      } else if (inputValue === "exit" || inputValue === "quit") {
        hideTerminal();
        addHTML("<br/>");
      } else {
        addHTML(actions[inputValue]);
      }
      addNewLine();
    } else {
      addHTML(
        "<p>Invalid option, might want to check the 'help' option agin</p>"
      );
      addNewLine();
    }
  } else if (event.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      latestInput.value = terminalHistory[historyIndex];
    }
  } else if (event.key === "ArrowDown") {
    if (historyIndex < terminalHistory.length - 1) {
      historyIndex++;
      latestInput.value = terminalHistory[historyIndex];
    } else if (historyIndex === terminalHistory.length - 1) {
      historyIndex = terminalHistory.length;
      latestInput.value = "";
    }
  } else if (event.key === "Tab") {
    event.preventDefault(); // Prevent default Tab behavior (e.g., switching focus)
    if (inputValue) {
      const matchingSuggestion = Object.keys(actions).find((suggestion) =>
        suggestion.startsWith(inputValue)
      );
      if (matchingSuggestion) {
        latestInput.value = matchingSuggestion;
      }
    }
  }
}

function addHTML(newHtml) {
  const newContent = newHtml;
  document
    .getElementById("terminal-body")
    .insertAdjacentHTML("beforeend", newContent);
}

function addNewLine() {
  const paragraph = document.createElement("code");
  paragraph.innerText = "visitor@EyalAmitayPortfolio:~/portfolio$   ";
  paragraph.classList.add("code-line");

  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.classList.add("textInput");
  newInput.addEventListener("keydown", handleKeyPress);

  paragraph.appendChild(newInput);

  document
    .getElementById("terminal-body")
    .insertAdjacentElement("beforeend", paragraph);

  newInput.focus();
}

// document.addEventListener("DOMContentLoaded", function (event) {
//   var div = document.getElementById("terminal-body");
//   if (div) {
//     addNewLine(); // Execute the function when the div is loaded
//   }
// });

document.getElementById("desktop-icon").addEventListener("click", showTerminal);

// Make the DIV element draggable:
dragElement(document.getElementById("terminal"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function downloadPDF(pdfFilePath) {
  // Open the PDF file in a new browser tab/window
  window.open(pdfFilePath, "_blank");
}

function generateASCIIArt() {
  const asciiArt = [
    "Eyal Amitay (EA) | Fullstack developer",
    "            _     _                                                              ",
    "           (')-=-(')                _____         _    _____       _ _           ",
    '         __(   "   )__             |   __|_ _ ___| |  |  _  |_____|_| |_ ___ _ _ ',
    "        / _/'-----'\\_ \\            |   __| | | .'| |  |     |     | |  _| .'| | |",
    "     ___\\\\ \\\\     // //___         |_____|_  |__,|_|  |__|__|_|_|_|_|_| |__,|_  |",
    "jgs  >____)/_\\---/_\\(____<               |___|                              |___|",
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    "Welcome to my interactive web terminal.",
    'For a list of available commands, type "help"',
    "You can also use the direction keys for history, or tab for autocomplete",
  ];
  const asciiContainer = document.getElementById("ascii-container");
  asciiContainer.textContent = ""; // Clear any existing content
  let index = 0;

  function type() {
    if (index < asciiArt.length) {
      asciiContainer.textContent += asciiArt[index] + "\n";
      index++;
      setTimeout(type, 50); // Adjust typing speed as needed
    }
  }

  type();
  addNewLine();
}

// Call the function to generate and display ASCII art
generateASCIIArt();

const terminalHistory = [];
let historyIndex = -1;

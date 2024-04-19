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
    divToResize.style.width = "50%";
    divToResize.style.height = "50%";
  } else {
    divToResize.style.width = "100%";
    divToResize.style.height = "100%";
  }
}

function createHelp() {
  return "";
}

const helpHtml = `<ul>
<li> <code>about    </code>     Display information about me</li>
<li> <code>clear    </code>     Clean the terminal</li>
<li> <code>experience   </code>        Display experience</li>
<li> <code>education    </code>     Display education</li>
<li> <code>projects </code>      Display list of projects</li>
<li> <code>cv   </code>        Get my CV</li>
<li> <code>contact  </code>       Display list of ways to contact me</li>
<li> <code>help </code>      Display the available commands</li>
</ul>`;

const educationHtml = `
<ul>
    <li>Oscar course - IT & Devops Course, IDF | September 2019 - December 2019</li>
    <li>Open university | October 2022 - Present</li>
    <li>Magshimim - National Cyber Education Program | September 2016 - June 2019</li>
</ul>
`;

const experienceHtml = `
  <ul>
    <li>
      81 Technological Unit, IDF — Lead Fullstack Engineer | May 2021 - August 2023 
    </li>
    <li>
    81 Technological Unit, IDF — Lead Fullstack Engineer | May 2021 - August 2023
    </li>
  </ul>
`;
const aboutHtml = `<p>Hi!, My name is Eyal Amitay This is my portfolio website! {add more info}</p>`;

const projectsHtml = "<p>TBA</p>";

const contactHtml = `
  <ul>
    <li>email: eyaldamitay@gmail.com</li>
    <li>
      LinkedIn:{" "}
      <a href="https://www.linkedin.com/in/eyal-amitay-579477244/">
        https://www.linkedin.com/in/eyal-amitay-579477244/
      </a>
    </li>
  </ul>
`;

const actions = {
  about: aboutHtml,
  experience: experienceHtml,
  education: educationHtml,
  projects: projectsHtml,
  cv: "",
  contact: contactHtml,
  help: helpHtml,
  cls: "",
  clear: "",
};

function handleKeyPress(event) {
  console.log("hei");
  if (event.key === "Enter") {
    var existingInputs = document.querySelectorAll(".textInput"); // Select all existing elements with the specified class
    var latestInput = existingInputs[existingInputs.length - 1]; // Select the latest element
    const inputValue = latestInput.value.trim().toLowerCase();
    if (actions.hasOwnProperty(inputValue)) {
      console.log(inputValue);
      if (inputValue === "clear" || inputValue === "cls") {
        document.getElementById("terminal-body").innerHTML = "";
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
  newInput.addEventListener("keypress", handleKeyPress);

  paragraph.appendChild(newInput);

  document
    .getElementById("terminal-body")
    .insertAdjacentElement("beforeend", paragraph);

  newInput.focus();
}

document.addEventListener("DOMContentLoaded", function (event) {
  var div = document.getElementById("terminal-body");
  if (div) {
    addNewLine(); // Execute the function when the div is loaded
  }
});

// Get the button element
document.getElementById("desktop-icon").addEventListener("click", showTerminal);

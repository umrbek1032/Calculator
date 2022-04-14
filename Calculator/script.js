//warning: "use strict"; mode
"use strict";
//note:adding event onclick=solver(this) to for each number and +,-,/,*
for (let btn of document.getElementsByTagName("button"))
  if (btn.innerText !== "C" && btn.innerText !== "=" && btn.id !== "back")
    btn.setAttribute("onclick", "solver(this)");
//note: declare problem
let problem = document.getElementsByTagName("p")[0].innerText;
//note: declare isSolved
let isSolved = false;

//note: declare renderer function
const renderer = (a) => (document.getElementsByTagName("p")[0].innerText = a);
const reloader = (button) => {
  changeShadow(button);
  window.open(document.URL, "_self");
};
//note: declare changeShadow function
const changeShadow = (button) => {
  button.style.boxShadow = `inset 4px 4px 6px -1px rgb(0 0 0 / 20%),
     inset -4px -4px 6px -1px rgb(255 255 255 / 70%),
      -0.5px -0.5px 0 rgb(255 255 255),
       0.5px 0.5px 0 rgb(0 0 0 / 15%),
        0px 12px 10px -10px rgb(0 0 0 / 5%)`;
  button.style.fontSize = "18px";
  setTimeout(() => {
    button.style.boxShadow = `6px 6px 10px -1px rgba(0, 0, 0, 0.15),
      -6px -6px 6px -1px rgba(255, 255, 255, 0.7)`;
    button.style.fontSize = "23px";
  }, 130);
};
const brackets = () => {
  let pure = Array.from(problem);
  let opener = 0;
  let closer = 0;
  for (let letter of pure) if (letter == "(") opener++;
  for (let letter of pure) if (letter == ")") closer++;
  if (opener > closer) {
    for (let i = 0; i < opener - closer; i++) pure.push(")");
  }

  problem = pure.join("");
};
//note: declare solver function
const solver = (button) => {
  if (isSolved == false) calculate(button);
  else if (isSolved) {
    problem = "";
    document.getElementsByTagName("p")[0].innerText = "";
    calculate(button);
  }
};

//note: declare resulter function
const resulter = (button) => {
  changeShadow(button);

  let lastText =
    document.getElementsByTagName("p")[0].innerText[
      document.getElementsByTagName("p")[0].innerText.length - 1
    ];
  if (
    lastText == "*" ||
    lastText == "/" ||
    lastText == "-" ||
    lastText == "+"
  ) {
    let pure = Array.from(problem);
    pure.pop();

    problem = pure.join("");
    if (problem.includes("(") && !problem.includes(")")) {
      brackets();
    }
    problem = eval(problem);
  } else if (lastText == "(") {
    let pure = Array.from(problem);
    pure.pop();
    pure.pop();
    problem = pure.join("");
    brackets();
    problem = eval(problem);
  } else if (problem.includes("(") && !problem.includes(")")) brackets();

  problem = eval(problem) !== undefined ? eval(problem).toString() : 0;

  if (problem.length >= 13) {
    let pure = Array.from(problem);
    for (let i = 0; i <= problem.length - 13; i++) pure.pop();
    problem = pure.join("");
  }
  renderer(problem);
  isSolved = true;
};
// declare popper function
const popper = (button) => {
  changeShadow(button);
  let pure = Array.from(problem);
  pure.pop();
  problem = pure.join("");
  renderer(problem);
};

const calculate = (button) => {
  isSolved = false;
  changeShadow(button);
  let buttonText = button.innerText;
  let lastText =
    document.getElementsByTagName("p")[0].innerText[
      document.getElementsByTagName("p")[0].innerText.length - 1
    ];
  if (
    (Number(buttonText) || buttonText === "(") &&
    document.getElementsByTagName("p")[0].innerText.length == 1 &&
    lastText == "0"
  ) {
    let pure = Array.from(problem);
    pure.shift();
    pure.push(buttonText);
    problem = pure.join("");
  } else if ((Number(lastText) || lastText === ")") && buttonText == "(")
    problem += "*(";
  else if (problem == "" && (buttonText == "/" || buttonText == "*")) {
    problem += 1 + buttonText;
  } else if (Number(buttonText) && lastText == ")") problem += "*" + buttonText;
  else if (
    (buttonText == "+" ||
      buttonText == "-" ||
      buttonText == "/" ||
      buttonText == "*") &&
    (lastText == "+" || lastText == "-" || lastText == "/" || lastText == "*")
  ) {
    let pure = Array.from(problem);
    pure.pop();
    pure.push(buttonText);
    problem = pure.join("");
  } else if (
    (lastText == "+" ||
      lastText == "-" ||
      lastText == "/" ||
      lastText == "*") &&
    buttonText == ")"
  ) {
    let pure = Array.from(problem);
    pure.pop();
    pure.push(buttonText);
    problem = pure.join("");
  } else if (
    ((buttonText == "+" ||
      buttonText == "-" ||
      buttonText == "/" ||
      buttonText == "*") &&
      lastText == "(") ||
    (lastText == "(" && buttonText == ")") ||
    (problem == "0" && buttonText == "0") ||
    ((buttonText == "+" ||
      buttonText == "-" ||
      buttonText == "/" ||
      buttonText == "(" ||
      buttonText == ")" ||
      buttonText == "*") &&
      lastText == ".") ||
    (!problem.includes("(") && buttonText == ")") ||
    (lastText == "." && buttonText == ".") ||
    (buttonText == ")" && !problem.includes("(")) ||
    (lastText == "(" && buttonText == ".")
  )
    problem = problem;
  else if (problem == "" && buttonText == ".") problem = "0.";
  else problem += buttonText;
  if (problem.length >= 13) {
    let pure = Array.from(problem);
    for (let i = 0; i < problem.length - 13; i++) pure.pop();
    problem = pure.join("");
  }
  renderer(problem);
};

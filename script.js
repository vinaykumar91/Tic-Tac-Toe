let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let Game = document.querySelector(".game");
let c=0;
let resetCnt = document.querySelector(".reset-cnt");

let turnO = true;
document.querySelector(".Player-O").style.borderBottom = "3px solid red";
const winPatterns = [
  //horizontal patterns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical patterns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal patterns
  [2, 4, 6],
  [0, 4, 8],
];

const resetGame = () =>{
    c=0;
    turnO= true;
    enableBoxes();
    Game.style.display="flex";
    msgContainer.classList.add("hide");
    document.querySelector(".Player-O").style.borderBottom = "3px solid red";
    document.querySelector(".Player-X").style.borderBottom = "none";
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    //console.log("box was clicked");
    if (turnO) {
      box.style.color = "red";
      box.innerText = "O";
      turnO = false;
      // document.querySelector(".Player-O").style.borderBottom = "3px solid red";
      // document.querySelector(".Player-X").style.borderBottom = "none";
      document.querySelector(".Player-X").style.borderBottom = "3px solid blue";
      document.querySelector(".Player-O").style.borderBottom = "none";
    } else {
      box.style.color = "blue";
      box.innerText = "X";
      turnO = true;
      // document.querySelector(".Player-X").style.borderBottom = "3px solid blue";
      // document.querySelector(".Player-O").style.borderBottom = "none";
      document.querySelector(".Player-O").style.borderBottom = "3px solid red";
      document.querySelector(".Player-X").style.borderBottom = "none";
    }
    c++;
    box.disabled = true;
    let isWinner = checkWinner();
    
    if(c=== 9 && !isWinner )
    {
    draw();
    }
  });
});

const disableBoxes = () => {
    for(let box of boxes) 
    {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (Winner) => {
    msgContainer.classList.remove("hide");
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    disableBoxes();
    Game.style.display="none";
    
    if(Winner=="X")
    {
        document.querySelector(".Player-X-cnt").innerText=parseInt(document.querySelector(".Player-X-cnt").innerText)+1;
    }
    if(Winner=="O")
    {
        document.querySelector(".Player-O-cnt").innerText=parseInt(document.querySelector(".Player-O-cnt").innerText)+1;
    }
}

const draw = () => {
    msgContainer.classList.remove("hide");
    msg.innerText = `Game is draw`;
    disableBoxes();
    Game.style.display="none";

}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        //console.log("Winner",posVal1);
        showWinner(posVal1);
        return true;
      }
    }

  }
};
const rstCnt = () => {
    document.querySelector(".Player-O-cnt").innerText=0;
    document.querySelector(".Player-X-cnt").innerText=0;
} 
newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
resetCnt.addEventListener("click",rstCnt);

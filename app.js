
function TicTacToe(){
function initialiseGame(){
   arr=[
    ["","",""],
    ["","",""],
    ["","",""]
] 
let inputFields=document.querySelectorAll('input');
let inputChecked=false;
{
if(inputFields[0].checked){
    player=inputFields[0].id;
    computer=inputFields[1].id;
    inputChecked=true;
}
else if(inputFields[1].checked){
    player=inputFields[1].id;
    computer=inputFields[0].id;
    inputChecked=true;
}
else{
inputChecked=false;
alert("Game load failed!Please enter your choice to select X or O");
}
}
return inputChecked;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayBoard()
{
let contents=document.querySelectorAll(".container > .row > .cell > span");
contents.forEach(content => {
    content.textContent="X";
});
await delay(500);
contents.forEach(content => {
    content.textContent="O";
});
await delay(500);
contents.forEach(content => {
    content.textContent="GO!";
});
await delay(500);
contents.forEach(content => {
    content.textContent="";
});
let cells=document.querySelectorAll(".container > .row > .cell");
cells.forEach(cell=>{
    cell.addEventListener('click',()=>{
        {
        const cellNumber= +cell.classList[1];
        console.log(cellNumber);
        console.log(turn);
        if(arr[Math.floor(cellNumber/3)][cellNumber%3]==""){
        arr[Math.floor(cellNumber/3)][cellNumber%3]=turn;
        let spn=cell.querySelector('span')
        spn.textContent=turn;
         if(isGameOver())
            alert(`Game over ${winner==player?"player won":"computer won"}`)
        else if(turn==player)
            computerInput();
        }
        else
        alert("That spot is filled. Try again!!");
        }
        
        
    })
})
}
function isGameDraw(){
    for(let i=0;i<9;i++)
        if(arr[Math.floor(i/3)][i%3]=="")
        {
            return false;
        }
    return true;
}
function computerInput(){
    if(isGameDraw())
    {
        console.log("Game over!!");
        turn=player;
        return;
    }
    turn=computer;
    let rng=(Math.floor(Math.random()*9));
    while(arr[Math.floor(rng/3)][rng%3]!=""){
        rng=(Math.floor(Math.random()*9));
        console.log("bug");
    }
    console.log("Computer choice",Math.floor(rng/3),rng%3);
    let cells=document.querySelectorAll(".container > .row > .cell");
    cells[rng].click();
   
    turn=player;
}
function checkWinner(x){
    if(x==player)
        winner=player
    else
    winner=computer
}
function isGameOver(){
    if(arr[0][0]==arr[0][1] && arr[0][0]==arr[0][2] && arr[0][0]!="" ){
        checkWinner(arr[0][0]);return true;
}
    else if (arr[0][0]==arr[1][0] && arr[0][0]==arr[2][0] && arr[0][0]!="" )
        {
        checkWinner(arr[0][0]);return true;
}
    else if (arr[0][0]==arr[1][1] && arr[0][0]==arr[2][2] && arr[0][0]!="" )
        {
        checkWinner(arr[0][0]);return true;
}
    else if (arr[0][1]==arr[1][1] && arr[0][1]==arr[2][1] && arr[0][1]!="" )
        {
        checkWinner(arr[0][1]);return true;
}
    else if (arr[1][0]==arr[1][1] && arr[1][1]==arr[1][2] && arr[1][0]!="" )
        {
        checkWinner(arr[1][0]);return true;
}
    else if (arr[0][2]==arr[1][2] && arr[0][2]==arr[2][2] && arr[0][2]!="" )
        {
        checkWinner(arr[0][2]);return true;
}
    else if (arr[0][2]==arr[1][1] && arr[0][2]==arr[2][0] && arr[0][2]!="" )
        {
        checkWinner(arr[0][2]);return true;
}
    else if (arr[2][0]==arr[2][1] && arr[2][0]==arr[2][2] && arr[2][0]!="" )
        {
        checkWinner(arr[2][0]);return true;
}
    else
    return false;
}

async function loadGame(){
    let initialiseStatus=initialiseGame();
    if(initialiseStatus)
    {
        await displayBoard();
        
    }
    turn=player;//can be made to start with player or computer.
}
let arr;
let player;
let computer;
let winner;
let turn;
loadGame();

}
function resetBoard(){
    let i=0;
    let rows=document.querySelectorAll(".container > .row");
    for(let row of rows)
    {
        let oldCells=row.querySelectorAll(".cell");
        oldCells.forEach((cell)=>cell.remove());
        for(let j=0;j<3;j++,i++){
            let newCell=document.createElement("div");
            newCell.classList.add("cell");
            newCell.classList.add(i);
            newCell.textContent=i;
            let spn=document.createElement("span");
            newCell.appendChild(spn);
            row.appendChild(newCell)
        }
    }
}
let btn=document.querySelector("#reset");
btn.addEventListener('click',()=>{
    resetBoard();
    TicTacToe();
})

const x_class = 'x';

const cir_class ='cir';

let cirturn;

const winningcombo = [[0,1,2],[2,5,8],[6,7,8],[0,3,6],[1,4,7],[3,4,5],[0,4,5],[2,4,6],[0,4,8]];

const board = document.getElementById('board');

const cellElements = document.querySelectorAll('[data-cell]');

const winningmessageTextElement = document.querySelector('[data-winning-message-text]');

const  winningtextmessage = document.getElementById('winningMessage');

const restart = document.getElementById('restartbtn');

gamestart();

restart.addEventListener('click',gamestart);

function gamestart()
{
    cirturn = false;
    cellElements.forEach((element)=>{
        element.classList.remove(x_class);
        element.classList.remove(cir_class);

        element.addEventListener('click',handleclick,{once:true})
        
    });
    sethoverclass()
    winningtextmessage.classList.remove('show')

}
function isdraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(x_class)||cell.classList.contains(cir_class)
    })
}

function handleclick(e)
{
    const cell = e.target

    const currclass = cirturn?cir_class:x_class;

    placemark(cell,currclass);

    if(checkwin(currclass))
    {
         endgame(false)
        console.log('winner')
        
    }
    else if(isdraw()){
        endgame(true)

    }
    else{

    switchturns();
    sethoverclass();

    }

    
    //console.log('clicked')
}

function endgame(draw)
{
    if(draw)
    {
        winningmessageTextElement.innerText=`Its a Draw!!`
        
    }
    else{
         winningmessageTextElement.innerText=`${cirturn ? 'O Wins!!':'X Wins!!'}`
       // alert(`${cirturn ? 'O Wins!!':'X Wins!!'}`);

    }
    winningtextmessage.classList.add('show')
    // prompt('Do you want to continue?');
    // const ans = String(prompt('Do you want to continue?'));
    // if(ans === 'yes' ||'YES'||'Yes')
    // {

    // }
    // else{
    //     alert('Game Over!');
    // }

}


function placemark(cell,currclass){
    cell.classList.add(currclass);
}

function switchturns(){
    cirturn = !cirturn;
    
}
function sethoverclass()
{
board.classList.remove(x_class);
board.classList.remove(cir_class);
if(cirturn)
{
    board.classList.add(cir_class); 
}
else{
    board.classList.add(x_class);

}
}

function checkwin(currclass)
{
   return winningcombo.some(combinations =>{
       return combinations.every(index =>{
           return cellElements[index].classList.contains(currclass);
       })
   })
}
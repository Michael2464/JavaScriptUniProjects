// for some rooms add posibility to get money (if there are, add button to pick
// those money up. Money can be increasing (money: amount)
// 

function createButton(i) {
    let room = m_Rooms[m_Student.currentPlace];
    let button = document.createElement('button');
    button.classList.add("myButton");
    button.innerHTML = room.actions[i].title;

    button.addEventListener("click", () => {            
        m_Student.currentPlace = room.actions[i].title;
        m_Student.life += room.actions[i].cost;
        goToRoom();
    });
    document.getElementById("buttonDiv").appendChild(button);
}

function createTakeMoneyButton(){
    let button = document.createElement('button');
    button.classList.add("myButton");
    button.innerHTML = "Take Money"

    button.addEventListener("click", () => {            
        m_Student.money += Math.random() * (30-10) + 10; // from 10 to 30
        document.getElementById("moneyBar").innerHTML = "Money: " + m_Student.money;
        document.getElementById("buttonDiv").removeChild(button);
    });
    document.getElementById("buttonDiv").appendChild(button);
}

function goToRoom(){
    console.log("Inilialized");
    
    if(m_Student.life <= 0){
        gameOver();
        return;    
    }

    let room = m_Rooms[m_Student.currentPlace];

    console.log(room);

    document.getElementById("healthBar").innerHTML = "Health: " + m_Student.life;
    document.getElementById("moneyBar").innerHTML = "Money: " + m_Student.money;
    
    document.getElementById("title").innerHTML = room.title;
    document.getElementById("description").innerHTML = room.description;
    document.getElementById("image").src = room.image;
    document.getElementById("buttonDiv").innerHTML = '';

    for (var i = 0; i < room.actions.length; i++){
        createButton(i);
    }

    if(Math.random()*(5-1) + 1 == 2)
        createTakeMoneyButton();

}

function gameOver() {
    document.getElementById("title").innerHTML = "YOU'RE DEAD!!!";
    document.getElementById("description").innerHTML = "YOU'RE FREAKING DEAD, IDIOT!";
    document.getElementById("image").src = "../images/gameOver.jpg";
    document.getElementById("healthBar").innerHTML = "Health: 0";
    document.getElementById("buttonDiv").innerHTML = '';

    var button = document.createElement('button');
    button.classList.add("myButton");
    button.innerHTML = "Start Again";

    button.addEventListener("click", () => {
        m_Student.currentPlace = "Dorm";
        m_Student.life = 100;
        goToRoom();
    });

    document.getElementById("buttonDiv").appendChild(button);
}

function moveLeft() {
    localStorage.setItem("order_mode","here");
   
    document.getElementById('boxInside').className = 'moveRight';
    document.getElementById('here').style.color = 'white';
    document.getElementById('toGo').style.color = 'black';
    document.getElementById('here').style.cursor = 'default';
    document.getElementById('toGo').style.cursor = 'pointer';
}

function moveRight() {
    localStorage.setItem("order_mode","toGo");
    
    document.getElementById('boxInside').className = 'moveLeft';
    document.getElementById('toGo').style.color = 'white';
    document.getElementById('here').style.color = 'black';
    document.getElementById('here').style.cursor = 'pointer';
    document.getElementById('toGo').style.cursor = 'default';
}
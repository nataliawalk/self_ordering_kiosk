function load_orderHere() {
    localStorage.setItem("order_mode","here");
    window.open("order.html", "_self");
}

function load_orderToGo() {
    localStorage.setItem("order_mode","toGo");
    window.open("order.html", "_self");
}
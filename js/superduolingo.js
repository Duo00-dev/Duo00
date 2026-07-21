const showNextItem = () => {
    document.getElementById("footer-button").classList.toggle('clicked');
    setTimeout(() => document.getElementById("footer-button").classList.toggle('clicked'), 300)

    setSuperStatus();
}

const setSuperStatus=()=>{
    let userData = JSON.parse(sessionStorage.getItem("user-info"));

    if (userData) {
        userData.hearts = 1000;
        sessionStorage.setItem("user-info", JSON.stringify(userData));
    }

    localStorage.setItem("hearts",1000);
    localStorage.setItem("xpCount",100);
    window.location.href="learn.html"
}

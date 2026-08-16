const showNextItem = () => {
    document.getElementById("footer-button").classList.toggle('clicked');
    setTimeout(() => document.getElementById("footer-button").classList.toggle('clicked'), 300)

    let userData = JSON.parse(sessionStorage.getItem("user-info"));
    console.log(userData);

    let prefillData = {
        "name": userData.name,
        "email": userData.email,
        "contact":'+91 8301801332'
    }
    makepayment(prefillData)
}
const makepayment = (prefillData) => {
    const amount = 199;
    var options = {
        "key": "rzp_test_meh8xKYwSVWkw0",
        "amount": amount * 100, // Example: 2000 paise = INR 20
        "name": "NEXUS-DUOLINGO",
        "currency":"INR",
        "description": "description",
        "image": "../assets/images/duo-logo.png",
        "handler": function (response) {
            console.log(response);
            setSuperStatus();
        },
        "prefill": prefillData,
        "notes": {
            "address": "address" //customer address
        },
        "theme": {
            "color": "#100F3E" // screen color
        }
    };
    console.log(options);
    var propay = new Razorpay(options);
    propay.open();
};

const setSuperStatus=()=>{
    // Mark the user as Super for the free trial without awarding XP (which was
    // causing the lesson skip bug). We still update the session user-info so the
    // UI shows unlimited hearts immediately.
    localStorage.setItem("isSuper", "true");

    try {
        let sessionUser = JSON.parse(sessionStorage.getItem("user-info") || '{}');
        if (sessionUser && Object.keys(sessionUser).length > 0) {
            sessionUser.hearts = 1000;
            sessionStorage.setItem("user-info", JSON.stringify(sessionUser));
        } else {
            // Fallback for anonymous users: keep hearts in localStorage so UI can read it
            localStorage.setItem("hearts", 1000);
        }
    } catch (e) {
        console.error('Failed to set super status in sessionStorage', e);
        localStorage.setItem("hearts", 1000);
    }

    // Do NOT set xpCount here — that was incrementing lessons. Redirect to learn page.
    window.location.href="learn.html"
}

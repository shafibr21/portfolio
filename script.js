/* ====================== typing animation =========================*/
var typed = new Typed(".typing",{
    strings:["","Web Developer", 
        "Frontend Developer",
        "NextJs Developer",
        "Full Stack Developer",
        "MERN Stack Developer",


    ],
    typeSpeed: 100,
    BackSpeed: 80,
    loop: true
})

    // Function to display page location
    function displayPageLocation() {
        var pageLocation = window.location.href;
        document.getElementById('page-location').textContent = "Page Location: " + pageLocation;
    }

    // Function to display last modification date
    function displayLastModifiedDate() {
        var lastModified = document.lastModified;
        document.getElementById('last-modification-date').textContent = "Last Modified: " + lastModified;
    }

    // Call the functions when the page loads
    window.onload = function() {
        displayPageLocation();
        displayLastModifiedDate();
    };

    const toggleButton = document.getElementById("toggleButton");
    const navBar = document.getElementById("navBar");

    toggleButton.addEventListener("click", function () {
        if (navBar.style.display === "none" || navBar.style.display === "") {
            navBar.style.display = "flex"; // Open the navigation
        } else {
            navBar.style.display = "none"; // Close the navigation
        }
    });

window.addEventListener("DOMContentLoaded", function () {

    // Script for rotating image gallery
    let cafe = this.document.querySelector("#image");

    let currentCafeIndex = 0;
    function nextImageUrl() {
        currentCafeIndex++;
        if (currentCafeIndex === cafeImages.length - 1) {
            currentCafeIndex = 0;
        }

        return cafeImages[currentCafeIndex];
    }

    let counter = 0;
    this.setInterval(function () {
        cafe.src = nextImageUrl();
    }, 10000);
})
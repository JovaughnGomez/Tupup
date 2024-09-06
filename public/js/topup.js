const dropdownMenu = document.getElementById("voucherType");
dropdownMenu.addEventListener("change", (e) => {
    const value = e.target.value;
    const topUpBtn = document.getElementById("topupBtn");
    const voucherInput = document.getElementById("voucherType");
    if(value == "digicel")
    {
        topUpBtn.classList.add("digicel");
        voucherInput.classList.add("digicelAlpha")
    } else {
        topUpBtn.classList.remove("digicel");
        voucherInput.classList.remove("digicelAlpha")
    }
});
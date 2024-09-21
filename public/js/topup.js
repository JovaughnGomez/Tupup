const dropdownMenuLabel = document.getElementById("voucherWrp");
dropdownMenuLabel.addEventListener("change", (e) => {
    const voucherInput = document.getElementById("voucherType");
    const topUpBtn = document.getElementById("topupBtn");
    const value = voucherInput.value;
    if(value == "digicel")
    {
        topUpBtn.classList.add("digicel");
        dropdownMenuLabel.classList.add("digicelAlpha")
    } else {
        topUpBtn.classList.remove("digicel");
        dropdownMenuLabel.classList.remove("digicelAlpha")
    }
});

const calculateButton = document.getElementById("calculator_btn");
const voucherValue = document.getElementById("calculator_voucher");
const calculatorStats = document.getElementById("calculator_stats");
const vatField = document.getElementById("calculator_vat");
const websiteFee = document.getElementById("calculator_localFee");
const addedBalance = document.getElementById("calculator_total");
calculateButton.addEventListener("click", (e) => {
    const value = voucherValue.value;
    console.log(value);
    if(!value || value <= 0)
        return;

    if(calculatorStats.classList.contains("hide"))
        calculatorStats.classList.remove("hide");

    const vat = value * .125;
    vatField.innerText = `TTD $${vat}`;
    addedBalance.innerText = `TTD $${value - vat}`
});
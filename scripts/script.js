var incomeMOP = document.getElementById("income-mop");
// var incomeHKD = document.getElementById("income-hkd");
var incomeUSD = document.getElementById("income-usd");
// var wealthMOP = document.getElementById("wealth");
var taxSUM = document.getElementById("tax");
var mopEx = document.getElementById("mopex");
var open = "btn btn-primary btn-lg active";
var close = "btn btn-default btn-lg active";
var check = new Boolean(false);
var usButton = document.getElementById("us-button");
var offButton = document.getElementById("non-us-button");

// If us citizen
var TaxUsd = document.getElementById("taxusd");
var addi = document.getElementById("addi");
var usdTax = document.getElementById("usd-tax");

incomeMOP.addEventListener("input", calculate);
// wealthMOP.addEventListener("input", calculate);
mopEx.addEventListener("input",calculate);

usButton.onclick = function() {
    displayDate();
    usButton.setAttribute("class", open);
    offButton.setAttribute("class", close);
    check = new Boolean(true);
    document.getElementById("usd1").hidden = false;
    document.getElementById("usd2").hidden = false;
    document.getElementById("usd3").hidden = false;
    document.getElementById("usd4").hidden = false;

};

offButton.onclick = function() {
    displayDate();
    usButton.setAttribute("class", close);
    offButton.setAttribute("class", open);
    check = new Boolean(false);
    document.getElementById("usd1").hidden = true;
    document.getElementById("usd2").hidden = true;
    document.getElementById("usd3").hidden = true;
    document.getElementById("usd4").hidden = true;

};

// Testing - Display date
function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}

function double(a) {
    return a * 2;
}

function tribble(a) {
    return a * 3;
}

// Function to calculate MOP tax
function incomeTaxMOP(a) {
    if (a <= 0) {
        return 0;
    } else if (a <= 164000) {
        return a * 0.07;
    } else if (a <= 184000) {
        return a * 0.08;
    } else if (a <= 224000) {
        return a * 0.09;
    } else if (a <= 304000) {
        return a * 0.1;
    } else if (a <= 424000) {
        return a * 0.11;
    } else {
        return a * 0.12;
    }
}

// Function to calculate HKD tax
function incomeTaxHKD(TaxableIncomeHKD) {
    if (TaxableIncomeHKD <= 0) {
        return 0;
    } else if (TaxableIncomeHKD <= 50000) {
        return TaxableIncomeHKD * 0.02;
    } else if (TaxableIncomeHKD <= 100000) {
        return 50000 * 0.02 + (TaxableIncomeHKD - 50000) * 0.06;
    } else if (TaxableIncomeHKD <= 150000) {
        return 50000 * 0.02 + 100000 * 0.06 + (TaxableIncomeHKD - 100000) * 0.1;
    } else if (TaxableIncomeHKD <= 200000) {
        return 50000 * 0.02 + 50000 * 0.06 + 50000 * 0.1 + (TaxableIncomeHKD - 150000) * 0.14;
    } else {
        return 50000 * 0.02 + 50000 * 0.06 + 50000 * 0.1 + 50000 * 0.14 + (TaxableIncomeHKD - 200000) * 0.17;
    }
}

// function to calculate USD tax - single
function incomeTaxUSD(usd) {
    if (usd <= 0) {
        return 0;
    } else if (usd <= 9275) {
        return usd * 0.10;
    } else if (usd <= 37650) {
        return 9275 * 0.10 + (usd - 9275) * 0.15;
    } else if (usd <= 91150) {
        return 9275 * 0.10 + (37650 - 9275) * 0.15 + (usd - 37650) * 0.25;
    } else if (usd <= 190150) {
        return 9275 * 0.10 + (37650 - 9275) * 0.15 + (91150 - 37650) * 0.25 + (usd - 91150) * 0.28;
    } else if (usd <= 413350) {
        return 9275 * 0.10 + (37650 - 9275) * 0.15 + (91150 - 37650) * 0.25 + (190150 - 91150) * 0.28 + (usd - 190150) * 0.33;
    } else if (usd <= 415050) {
        return 9275 * 0.10 + (37650 - 9275) * 0.15 + (91150 - 37650) * 0.25 + (190150 - 91150) * 0.28 + (413350 - 190150) * 0.33 + (usd - 413350) * 0.35;
    } else {
        return 9275 * 0.10 + (37650 - 9275) * 0.15 + (91150 - 37650) * 0.25 + (190150 - 91150) * 0.28 + (413350 - 190150) * 0.33 + (415050 - 413350) * 0.35 + (usd - 415050) * 0.396;
    } 
}

// function to calculate USD in household country, exchange
function exchangeUSD(income,ex = 1) {
    var incomeUSD = income.value / ex;
    return incomeUSD;
}

// Function with updated by ISOM3029 Required - Main function
function calculate() {
    // Implement the Macau Tax
    var mopTax = incomeTaxMOP(incomeMOP.value);
    // Implement the HK Tax
    // var hkdTax = incomeTaxHKD(incomeHKD.value);
    // var wealthTax;

    incomeUSD.value = exchangeUSD(incomeMOP,mopEx.value).toFixed(2);

    usdTax.value = incomeTaxUSD(incomeUSD.value).toFixed(2);

    // var wealthTax = 0.25 * wealthMOP.value;
    var tax = mopTax; // + wealthTax + hkdTax;

    // round with 2 decimal places
    if (!check) {
        TaxUsd.value = "You do not need to pay global tax";
        addi.value = "You do not need to pay global tax";
    } else {
        TaxUsd.value = exchangeUSD(taxSUM,mopEx.value).toFixed(2);
        addi.value = (usdTax.value - TaxUsd.value).toFixed(2);    
    }

    taxSUM.value = Math.round(tax * 100) / 100;
    
}

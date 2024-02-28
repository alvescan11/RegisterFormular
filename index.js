// Funcție pentru a citi și procesa fișierul CSV
function readCSV(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            var allText = rawFile.responseText;
            callback(allText);
        }
    };
    rawFile.send(null);
}

// Funcție pentru a popula dropdown-ul cu județe
function populateCountyDropdown(csvData) {
    var lines = csvData.split("\n");
    var select = document.getElementById("judet");

    var uniqueCounties = new Set();

    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].split(",");
        var county = parts[1].trim().replace(/"/g, ''); // elimină ghilimelele cu replace

        if (county !== "" && !uniqueCounties.has(county)) {
            uniqueCounties.add(county);

            var option = document.createElement("option");
            option.value = county; // doar județul
            option.text = county; // păstrează ghilimelele aici pentru județe
            select.add(option);
        }
    }
}

// Funcție pentru a popula dropdown-ul cu localități în funcție de județ
function populateLocalityDropdown(csvData, selectedCounty) {
    var lines = csvData.split("\n");
    var select = document.getElementById("localitate");

    // Curățăm dropdown-ul pentru localități
    select.innerHTML = "";

    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].split(",");
        var county = parts[1].trim().replace(/"/g, ''); // elimină ghilimelele cu replace
        var locality = parts[0].trim().replace(/"/g, ''); // elimină ghilimelele cu replace

        // Verificăm dacă județul este cel selectat
        if (county === selectedCounty && locality !== "") {
            var option = document.createElement("option");
            option.value = locality; // doar localitatea
            option.text = locality; // păstrează ghilimelele aici pentru localități
            select.add(option);
        }
    }
}


// Apelăm funcția pentru a citi și procesa fișierul CSV pentru județe
readCSV('Localities.csv', populateCountyDropdown);

// Adăugăm un eveniment pentru a detecta schimbările în dropdown-ul pentru județ
document.getElementById("judet").addEventListener("change", function () {
    var selectedCounty = this.value;
    // Apelăm funcția pentru a citi și procesa fișierul CSV pentru localități
    readCSV('Localities.csv', function (csvData) {
        populateLocalityDropdown(csvData, selectedCounty);
    });
});

// Funcție pentru a face vizibil/căscat câmpul pentru data la care ai donat ultima dată
// Funcție pentru a face vizibil/căscat câmpul pentru data la care ai donat ultima dată
function showLastDonationDate() {
    var radioDonationYes = document.getElementById("yes");
    var lastDonationDateDiv = document.getElementById("lastDonationDate");

    if (radioDonationYes.checked) { // Verificăm dacă "Yes" este selectat
        lastDonationDateDiv.style.display = "block";
    } else {
        lastDonationDateDiv.style.display = "none";
        // Dacă "No" este selectat, resetăm și valoarea din câmpul de dată
        document.getElementById("lastDonation").value = "";
    }
}

// Adăugăm un eveniment onchange pe radio button-ul "Yes"
document.getElementById("yes").addEventListener("change", showLastDonationDate);

// Adăugăm un eveniment onchange pe radio button-ul "No"
document.getElementById("no").addEventListener("change", showLastDonationDate);

// Inițializăm vizibilitatea câmpului în funcție de valoarea selectată inițial
showLastDonationDate();


// Funcție pentru a afișa mesajul de greutate
function showEligibilityMessage() {
    var radioNoKG = document.getElementById("no-kg");
    var kgMessage = document.getElementById("kgMessage");

    if (radioNoKG.checked) {
        kgMessage.style.display = "block";
    } else {
        kgMessage.style.display = "none";
    }
}

// Funcție pentru a ascunde mesajul de greutate
function hideEligibilityMessage() {
    var kgMessage = document.getElementById("kgMessage");
    kgMessage.style.display = "none";
}

// Inițializăm vizibilitatea mesajului în funcție de valoarea selectată inițial
hideEligibilityMessage();









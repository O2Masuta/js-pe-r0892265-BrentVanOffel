document.getElementById('showErrors').hidden = true;
document.getElementById('succesAlert').hidden = true;
document.getElementById('betaling').hidden = true;
const form = document.querySelector('#form');
const voornaam = document.querySelector('#voornaam');
const naam = document.querySelector('#naam');
const gebruikersnaam = document.querySelector('#gebruikersnaam');
const adres = document.querySelector('#adres');
const land = document.querySelector('#land');
const provincie = document.querySelector('#provincie');
const wachtwoord = document.querySelector('#inputWachtwoord');
const Herhaalwachtwoord = document.querySelector('#inputWachtwoord2');
const postcode = document.querySelector('#postcode');
const email = document.querySelector('#email');
const lSelect = document.querySelector('#lSelect');
const prSelect = document.querySelector('#prSelect')
let arrayErrors = [];
//let arrayProvincies = ['Noord-Holland', 'Zuid-Holland', 'Zeeland', 'Noord-Brabant', 'Utrecht', 'Flevoland', 'Friesland', 'Groningen', 'Drenthe', 'Overijssel', 'Gelderland', 'Limburg'];


form.addEventListener('submit', (e) => { // deze functie zorgt ervoor dat de form niet als default gestuurd kan worden
    e.preventDefault();

    showErrors();

});

let checkEmptyField = (veld, melding) => {
    // checkt of de ingegeven velden leeg zijn en voegt een melding aan de array toe
    if (veld == "") {
        arrayErrors.push(melding);
    } else {
        return arrayErrors;
    }

}

// function veranderProvincie() { // hier probeer ik de provincies te verwisselen als het land bv: naar nederland gaat.
//     if (lSelectValue == 'Nederland') {
//         prSelect = arrayProvincies;
//     }
// }

function validateForm() {
    // values opvragen van de inputs
    const voornaamValue = voornaam.value;
    const naamValue = naam.value;
    const gebruikersnaamValue = gebruikersnaam.value;
    const adresValue = adres.value;
    const landValue = land.value;
    const provinvcieValue = provincie.value;
    const wachtwoordValue = wachtwoord.value;
    const HerhaalwachtwoordValue = Herhaalwachtwoord.value;
    const postcodeValue = postcode.value;
    const emailValue = email.value;
    const lSelectValue = lSelect.value;
    const prSelectValue = prSelect.value;



    // kijkt of de velden ingevuld zijn of niet.
    checkEmptyField(voornaamValue, 'Het veld voornaam is vereist!');
    checkEmptyField(naamValue, 'Het veld naam is vereist!');
    checkEmptyField(gebruikersnaamValue, 'Het veld gebruikersnaam is vereist!');
    checkEmptyField(adresValue, 'Het veld adres is vereist!');
    checkEmptyField(landValue, 'Het veld land is vereist!');
    checkEmptyField(provinvcieValue, 'Het veld provincie is vereist!');
    checkEmptyField(wachtwoordValue, 'Het veld wachtwoord is vereist!');
    checkEmptyField(HerhaalwachtwoordValue, 'Het veld herhaal wachtwoord is vereist!');
    checkEmptyField(emailValue, 'Het veld email is vereist!');
    // checkEmptyField(postcodeValue, 'Het veld postcode is vereist!');

    // enkele validaties
    if (wachtwoordValue.length < 8) {
        arrayErrors.push('Wachtwoord moet minstens 8 tekens bevatten!');
    }

    if (wachtwoordValue != HerhaalwachtwoordValue) {
        arrayErrors.push('Wachtwoorden zijn niet gelijk aan elkaar!');
    }

    if (lSelectValue == 'Kies een land') {
        arrayErrors.push('U moet een land kiezen!');
    }
    if (prSelectValue == 'Kies een provincie') {
        arrayErrors.push('U moet een provincie kiezen!');
    }

    if (document.getElementById('voorwaarden').checked == false) {
        arrayErrors.push('Ga akkoord met de algemene voorwaarden!');
    }

    if (gebruikersnaamValue < 1) {
        arrayErrors.push('Gebuikersnaam moet minstens 1 teken bevatten!');
    }

    validatePC(postcodeValue);


}

function showErrors() {
    // bij deze if check ik of de array leeg is is dat niet zo dan zet ik de alert danger hidden op false zodat deze getoond word-
    //en daarna zet ik alle errors in de array in de alert danger.
    if (!arrayErrors.length == 0) {
        document.getElementById('showErrors').hidden = false;
        arrayErrors.forEach(element => {
            document.getElementById('showErrors').innerHTML += `<div>${element}\n</div>`;
        });
    } else {
        // bij deze else zet ik het succes alert en de betaling alert open zodat het wordt getoond op het scherm-
        // en bij de if -else if statements ga ik checken welke radiobutton aangeduid is en ga ik waarden toevoegen aan het veld-
        // van de functie validatePayment()
        document.getElementById('succesAlert').hidden = false;
        document.getElementById('betaling').hidden = false;
        if (document.getElementById('flexRadioDefault1').checked == true) {
            validatePayment('Banking app');
        } else if (document.getElementById('flexRadioDefault2').checked == true) {
            validatePayment('Overschrijving');
        } else if (document.getElementById('flexRadioDefault3').checked == true) {
            validatePayment('Visa card');
        } else if (document.getElementById('flexRadioDefault4').checked == true) {
            validatePayment('Paypal');
        }
    }
}




function validatePayment(veld) { // hier zet ik de juiste betalingswijze in een volzin het veld dat ingevuld moet worden wordt hierboven bepaald
    document.getElementById('betaling').innerHTML += `Je betalingswijze is ${veld}.`;
}

function validatePC(veld) { // hier valideer ik de input van de postcode
    if (veld == "") {
        arrayErrors.push('Het veld postcode is vereist!');
    }

    if (veld < 1000 || veld > 9999) { // hier valideer ik of de postcode correct is
        arrayErrors.push('De waarde van postcode moet tussen 1000 en 9999 liggen.');
    }
}
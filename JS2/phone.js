let phone1 = [];
let phone2 = [];
//Toggle Spinner
const toggleSpinner = spin => {
    document.getElementById('spinner').style.display = spin;
}
//Load Phones
const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    searchField.textContent = '';
    document.getElementById('phone-details').textContent = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhones(data.data));
};

// Show matching phones
const displayPhones = phones => {
    toggleSpinner('block');
    const phoneSection = document.getElementById('phone-section');
    phoneSection.textContent = '';
    if (phones.length == 0) {
        toggleSpinner('none');
        document.getElementById('showMore-section').style.display = 'none';
        document.getElementById('no-match').style.display = 'block';
    }
    else {
        document.getElementById('no-match').style.display = 'none';
        phones.forEach(phone => {
            if (phone1.length >= 20) {
                phone2.push(phone);
            }
            else (
                phone1.push(phone)
            )
        });
        // console.log(phone1, phone2);

        // show top 20 phones
        phone1.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
     <div class="card w-100" style="background-color: rgba(255, 248, 220, 0.247);" >
                <img src="${phone.image}" class="card-img-top" style="height: 250px; width: 250px;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn btn-outline-secondary"
                    style="background-color: turquoise; color: black; padding: 5px; border-radius: 10px; height:40px; width: 120px;" type="button" onclick="loadphoneDetails('${phone.slug}')"
                    id="details-button">Details</button>
                </div>
                
            </div>
     
     `;
            phone1 = [];
            phoneSection.appendChild(div);
        });
        toggleSpinner('none');
        if (phones.length > 20) {

            document.getElementById('showMore-section').style.display = 'block';
        }

        document.getElementById('showMore-button').addEventListener('click', function () {
            // show remaining phones
            phone2.forEach(phone => {
                document.getElementById('no-match').style.display = 'none';
                document.getElementById('phone-details').style.display = 'none';
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
             <div class="card w-100" style="background-color: rgba(255, 248, 220, 0.247);" >
                        <img src="${phone.image}" class="card-img-top" style="height: 250px; width: 250px;" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand}</p>
                            <button class="btn btn-outline-secondary"
                            style="background-color: turquoise; color: black; padding: 5px; border-radius: 10px; height:40px; width: 120px;" type="button" onclick="loadphoneDetails('${phone.slug}')"
                            id="details-button">Details</button>
                        </div>
                        
                    </div>
             
             `;
                phoneSection.appendChild(div);
                phone2 = [];
            });
            document.getElementById('showMore-section').style.display = 'none';

        })

    }
};

// load data by searching slug / phone_id
const loadphoneDetails = (phoneData) => {
    const url2 = `https://openapi.programming-hero.com/api/phone/${phoneData}`;
    // console.log(url2);
    fetch(url2)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data));
};
// display phone details
const displayPhoneDetails = details => {
    // console.log(details);
    document.getElementById('phone-details').style.display = 'block';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    if (details.releaseDate == "") {
        details.releaseDate = 'No Data Available';
    }
    else {
        details.releaseDate = details.releaseDate;
    }
    // console.log(typeof details.others);
    if (typeof details.others == 'object') {
        div.innerHTML = `
    <div class="card w-100" style="background-color: rgba(255, 248, 220, 0.247);">
                <img src="${details.image}" class="card-img-top mx-auto" style="height: 250px; width: 250px;" alt="...">
                <div class="card-body">
                    <h3 class="card-text"><strong>Brand :</strong> ${details.brand}</h3>
                    <h3 class="card-title"><strong>Model :</strong> ${details.name}</h3>
                    <h4><strong>Release Date :</strong> ${details.releaseDate}</h4>
                    <h2 class="text-center"><strong>Features :</strong> </h2>
                    <h4><strong>Chipset :</strong> ${details.mainFeatures.chipSet}</h4>
                    <h4><strong>Display Size :</strong> ${details.mainFeatures.displaySize}</h4>
                    <h4><strong>Storage :</strong> ${details.mainFeatures.memory}</h4>
                    <h2 class="text-center"><strong>Sensors :</strong></h2>
                    <h4>${details.mainFeatures.sensors}</h4>
                    <h2 class="text-center"><strong>Others :</strong></h2>
                    <h4><strong>Bluetooth : </strong>${details.others.Bluetooth}</h4>
                    <h4><strong>GPS : </strong>${details.others.GPS}</h4>
                    <h4><strong>NFC : </strong>${details.others.NFC}</h4>
                    <h4><strong>Radio : </strong>${details.others.Radio}</h4>
                    <h4><strong>USB : </strong>${details.others.USB}</h4>
                    <h4><strong>WLAN : </strong>${details.others.WLAN}</h4>
                </div>              
    </div>
    `;
    }
    else {
        div.innerHTML = `
        <div class="card w-100" style="background-color: rgba(255, 248, 220, 0.247);">
                    <img src="${details.image}" class="card-img-top mx-auto" style="height: 250px; width: 250px;" alt="...">
                    <div class="card-body">
                        <h3 class="card-text"><strong>Brand :</strong> ${details.brand}</h3>
                        <h3 class="card-title"><strong>Model :</strong> ${details.name}</h3>
                        <h4><strong>Release Date :</strong> ${details.releaseDate}</h4>
                        <h2 class="text-center"><strong>Features :</strong> </h2>
                        <h4><strong>Chipset :</strong> ${details.mainFeatures.chipSet}</h4>
                        <h4><strong>Display Size :</strong> ${details.mainFeatures.displaySize}</h4>
                        <h4><strong>Storage :</strong> ${details.mainFeatures.memory}</h4>
                        <h2 class="text-center"><strong>Sensors :</strong></h2>
                        <h4>${details.mainFeatures.sensors}</h4>
                    </div>              
        </div>
        `;
    }
    phoneDetails.appendChild(div);
}


// eventlistener on search button
document.getElementById('search-button').addEventListener('click', function () {

    loadPhones();
});
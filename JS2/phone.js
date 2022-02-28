const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(phone => console.log(phone.data));
}
const displayPhones = phones => {
    const phoneSection = document.getElementById('phone-section');
    phoneSection.innerHTML = '';
    // mealSection.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
     <div class="card w-100" style="background-color: rgba(255, 248, 220, 0.247);" onclick="phoneDetails('${phone.slug}')">
                <img src="${phone.image}" class="card-img-top" style="height: 300px; width: 300px;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                
            </div>
     
     `;
        phoneSection.appendChild(div);

    });
}


document.getElementById('search-button').addEventListener('click', function () {
    loadPhones();
})
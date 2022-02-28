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

document.getElementById('search-button').addEventListener('click', function () {
    loadPhones();
})
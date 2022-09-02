const loadphones = async (searchFieldText, limited) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    const response = await fetch(url);
    const data = await response.json();
    await sleep(2000);
    displayPhones(data.data, limited);
}

const displayPhones = (phones, limited) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ``;   // can use textcontent  or   innertext
    const notFound = document.getElementById('notFound');
    if (phones.length === 0) {
        notFound.classList.remove('hidden');
    }
    else {
        notFound.classList.add('hidden');
    }

    if (limited === true && phones.length >= 9) {
        phones = phones.slice(0, 9);
        document.getElementById('show-all').classList.remove('hidden');
    }
    else {
        document.getElementById('show-all').classList.add('hidden');
    }

    phones.forEach(phone => {
        //console.log(phone);
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card  shadow-xl">
                <img src="${phone.image}" alt="Phone picture" class="w-4/5 h-auto mx-auto"/>
                <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <label for="my-modal-4" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline modal-button">Show details</label>
                        </div>
                </div>
            </div>
        `
        cardsContainer.appendChild(card);
    });
    toggleLoader(false);
}

const search = limited => {
    toggleLoader(true);
    const searchFieldText = document.getElementById('searchField').value;
    loadphones(searchFieldText, limited);
}

document.getElementById('searchBTN').addEventListener('click', function () {
    search(true);
})

document.getElementById('show-all').addEventListener('click', function () {
    search(false);
})

document.getElementById('searchField').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        search(true);
    }
})

const toggleLoader = isLoader => {
    const loader = document.getElementById('loader');
    if (isLoader) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

loadphones('a');

const displayPhoneDetails = phoneDetails => {
    console.log(phoneDetails);
    document.getElementById('phoneTitle').innerText = phoneDetails.brand;
    document.getElementById('storage').innerText = phoneDetails.mainFeatures.storage;
    document.getElementById('display').innerText = phoneDetails.mainFeatures.displaySize;
    document.getElementById('chipset').innerText = phoneDetails.mainFeatures.chipSet;
    document.getElementById('memory').innerText = phoneDetails.mainFeatures.memory;
    const sen = phoneDetails.mainFeatures.sensors ? phoneDetails.mainFeatures.sensors : 'No Sensors available';
    document.getElementById('sensor').innerText = sen.join(', ');
}

const loadPhoneDetails = async slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const response = await fetch(url);
    const data = await response.json();
    displayPhoneDetails(data.data);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const loadphones = async (searchFieldText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    const response = await fetch(url);
    const data = await response.json();
    await sleep(2000);
    displayPhones(data.data);
}

const displayPhones = phones => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ``;   // can use textcontent  or   innertext
    const notFound = document.getElementById('notFound');
    if (phones.length === 0) {
        notFound.classList.remove('hidden');
    }
    else {
        notFound.classList.add('hidden');
    }
    phones = phones.slice(0, 9);
    phones.forEach(phone => {
        console.log(phone);
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card  shadow-xl">
                <img src="${phone.image}" alt="Phone picture" class="w-4/5 h-auto mx-auto"/>
                <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                </div>
            </div>
        `
        cardsContainer.appendChild(card);
    });
    toggleLoader(false);
}

document.getElementById('searchBTN').addEventListener('click', function () {
    toggleLoader(true);
    const searchFieldText = document.getElementById('searchField').value;
    loadphones(searchFieldText);
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

loadphones();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
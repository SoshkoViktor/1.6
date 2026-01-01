const container = document.getElementById("container");
const logo = document.getElementById("logo");
const buttonWrapper = document.getElementById("btn-wrapper");
let dataArr = [];

const resetActiveButton = () => {
    const activeButton = document.querySelector('.button.active');
    activeButton?.classList.remove('active');
}

const getData = async () => {
    const data = await fetch("./data.json").then((res) => res.json());
     return data;
};


const filterCards = (key, arr) => arr.filter((obj) => obj.key === key)

const renderCards = async (arr) => {
    container.innerHTML = '';
    arr.forEach((obj) => {
        container.innerHTML += createCard(obj);
    });
};


const createCard = (obj) => {
  const { header, likes, text, link, linkText, key, image, imageM } = obj;

  const cardTemplate = `<div class="card">
         <picture>
              <source srcset="${imageM}" media="(max-width:480px)" />
               <img src="${image}" alt="Fox" class="img" />
            </picture>
       
        <div class="text-block">
          <div class="h-wrapper">
            <h3 class="h3">${header}</h3>
            <span class="likes">${likes}</span>
          </div>
          <hr class="hr" />
          <p class="card-text">${text}</p>
          <a class="card-a" href="${link}">${linkText}</a>
        </div>
      </div>`;

  return cardTemplate;
};

const init = async () => {
    const data = await getData();
    resetActiveButton();
    renderCards(data);
    dataArr = [];
    dataArr.push(...data);
}

buttonWrapper.addEventListener('click', (e) => {

    if (e.target.classList.contains('active') || ! e.target.classList.contains('button')) return;
    const key = e.target.dataset.key;
    resetActiveButton();
    e.target.classList.add('active');
    
    const filteredArr = filterCards(key, dataArr);
    renderCards(filteredArr);
})


logo.addEventListener('click', init)

init();





const container = document.getElementById("container");
const logo = document.getElementById("logo");
const buttonWrapper = document.getElementById("btn-wrapper");

const getData = async (key) => {
    const data = await fetch("./data.json").then((res) => res.json());
   if (key) {
        const filterData = data.filter((obj) => obj.key === key) ;  
        
        return filterData;
    }

  return data;
};

const buttonHandler = async (key) => {
    const data = await getData(key);
    renderCards(data);
};

const renderCards = async (arr) => {
    container.innerHTML = '';
    arr.forEach((obj) => {
        container.innerHTML += createCard(obj);
    });
};

const renderButtons = async (arr, handler) => {
        buttonWrapper.innerHTML = '';
        const uniqueKeys = {};
        arr.forEach((obj) => {
        if (!uniqueKeys[obj.key]) {
            uniqueKeys[obj.key] = obj.header;
            buttonWrapper.appendChild(createButton(obj.key, obj.header, handler));
        }
    });

 }

const createButton = (key, value, handler) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.type = "button";
  button.dataset.key = key;
  button.innerText = value.replace('smile','');

  button.addEventListener("click", () => handler(key));

  return button;
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
    renderButtons(data, buttonHandler);
    renderCards(data);
}

logo.addEventListener('click', init)

init();

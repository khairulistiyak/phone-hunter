const lodePhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displyPhone(data.data, dataLimit);
};

const displyPhone = (phones, dataLimit) => {
  const phonesConteainer = document.getElementById("phones-container");
  phonesConteainer.textContent = "";
  //disply 20 phones only
  const btnShowAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    btnShowAll.classList.remove("d-none");
  } else {
    btnShowAll.classList.add("d-none");
  }

  // disply no phones found
  const nophonsFoundMessegge = document.getElementById("no-found-messege");
  if (dataLimit && phones.length === 0) {
    nophonsFoundMessegge.classList.remove("d-none");
  } else {
    nophonsFoundMessegge.classList.add("d-none");
  }

  // disply all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    
      <div class="card">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                   <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <button onclick="lodePhoneDateals('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal">Show Details</button>
              </div>
            </div>`;
    phonesConteainer.appendChild(phoneDiv);
  });
};

const processSearch = (dataLimit) => {
  // toggleSpinner(true);
  const searchFieald = document.getElementById("search-field");
  const searchText = searchFieald.value;
  lodePhone(searchText, dataLimit);
};

//handel search button click
const btnSearch = document
  .getElementById("btn-search")
  .addEventListener("click", function () {
    // start loder
    processSearch(10);
  });
// search input field enter key handlaer

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
});

const lodePhoneDateals = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displyPhoneDeatails(data.data);
};
// disply phone ditaile modal

const displyPhoneDeatails = (phone) => {
  const modalTitle = document.getElementById("phoneDetaleModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDeatils = document.getElementById("phone-details");
  phoneDeatils.innerHTML = `
  
  <p> <b>Name:</b> ${phone.name}</p>
  <p> <b>id:</b> ${phone.slug}</p>
  <p> <b>Release Date:</b> ${
    phone.releaseDate ? phone.releaseDate : "No Release Date"
  }</p>
  <p> <b>chipSet:</b> ${phone.mainFeatures.chipSet}</p>
  <p> <b>Storage:</b> ${phone.mainFeatures.storage}</p>
  <p> <b>Memory:</b> ${phone.mainFeatures.memory}</p>
  <p> <b>Display:</b> ${phone.mainFeatures.displaySize}</p>
  
  `;

  console.log(phone);
};

lodePhone("iphone");

// show all mobile

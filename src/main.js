console.log("Connected");

const carouselContainerEl = document.querySelector(".carousel-inner");
const selectEl = document.querySelector("select");

console.log(carouselContainerEl, selectEl);

const base_url = "https://dog.ceo/api/";


// gets list of dogs
async function getDogslist() {
  try {
    const response = await fetch(`${base_url}breeds/list/all`);
    const data = await response.json();
    return Object.keys(data.message);
  } catch (error) {
    console.log(error);
  }
}

getDogslist();


// gets list of 10 images on breed
async function getDogsimages(breed) {
  try {
    const res = await fetch(`${base_url}breed/${breed}/images`);
    const data = await res.json();
    return data.message.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
}
getDogsimages("borzoi")

async function renderOptions(){
   const breedList = await getDogslist();
   for (breed of breedList){
    const option = document.createElement("option")
    option.textContent = breed[0].toUpperCase() + breed.slice(1).toLowerCase();
    option.value = breed;

    selectEl.appendChild(option)
   }
}
 renderOptions()


async function renderCarousel(breed){
  carouselContainerEl.innerHTML =''
  const images = await getDogsimages(breed);
 
  for (let i = 0; i < images.length; i++) {
    const div = document.createElement("div");
    div.classList.add("carousel-item", i === 0 && "active");
    div.innerHTML = `<img
              src="${images[i]}"
              class="d-block w-100 rounded-3"
              alt="${breed}"
            />`;
    carouselContainerEl.appendChild(div);
 }

}


selectEl.addEventListener("change", function(e){renderCarousel(e.target.value)})
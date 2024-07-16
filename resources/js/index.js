let corona = document.getElementById("corona");
async function covid(){
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${magazines[0]}`;
    let response= await fetch(url);
    let data= await response.json();
    console.log(data);
    console.log(data.items);
    console.log(data.items[0].enclosure.link);
    data.items.forEach((element,index) => {
        let carouselItem = document.createElement("div");
        carouselItem.className= "carousel-item";
        if(index==0){
            carouselItem.classList.add("active");
        }
        carouselItem.innerHTML= `<a href="${element.link}"><img src="${element.enclosure.link}" class="d-block w-100 h-90" alt="" />
        <div class="title">${element.title}</div>
        <span class="author">${element.author} <i class="fa-solid fa-circle"></i>${element.pubDate} </span>

        <div class="description">
        ${element.description}
        </div></a>`;
        corona.appendChild(carouselItem);
       
    });
}
covid();
let technology= document.getElementById("technology");
async function tech(){
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${magazines[1]}`;
    let response= await fetch(url);
    let data= await response.json();
    console.log(data);
    console.log(data.items);
    console.log(data.items[0].enclosure.link);
    data.items.forEach((element,index) => {
        let carouselItem = document.createElement("div");
        carouselItem.className= "carousel-item";
        if(index==0){
            carouselItem.classList.add("active");
        }
        carouselItem.innerHTML= `<a href="${element.link}"><img src="${element.enclosure.link}" class="d-block w-100 h-90" alt="" />
        <div class="title">${element.title}</div>
        <span class="author">${element.author} <i class="fa-solid fa-circle"></i>${element.pubDate} </span>

        <div class="description">
        ${element.description}
        </div></a>`;
        technology.appendChild(carouselItem);
       
    });
}
tech();
let Entertainment= document.getElementById("ENTER");
async function Enter(){
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${magazines[2]}`;
    let response= await fetch(url);
    let data= await response.json();
    console.log(data);
    console.log(data.items);
    console.log(data.items[0].enclosure.link);
    data.items.forEach((element,index) => {
        let carouselItem = document.createElement("div");
        carouselItem.className= "carousel-item";
        if(index==0){
            carouselItem.classList.add("active");
        }
        carouselItem.innerHTML= `<a href="${element.link}"><img src="${element.enclosure.link}" class="d-block w-100 h-90" alt="" />
        <div class="title">${element.title}</div>
        <span class="author">${element.author} <i class="fa-solid fa-circle"></i>${element.pubDate} </span>

        <div class="description">
        ${element.description}
        </div></a>`;
        Entertainment.appendChild(carouselItem);
       
    });
}
Enter();
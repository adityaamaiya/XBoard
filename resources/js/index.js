const init = async () => {
  magazines = [
    "https://flipboard.com/@jonposey.rss",
    "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
    "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss",
  ];

  let obj = [];

  let eNews = await fetchNews(magazines[0]);
  let eItems = eNews["items"];
  console.log(eItems);
  obj.push(eItems);

  let sNews = await fetchNews(magazines[1]);
  let sItems = sNews["items"];
  console.log(sItems);
  obj.push(sItems);

  let tNews = await fetchNews(magazines[2]);
  let tItems = tNews["items"];
  console.log(tItems);
  obj.push(tItems);

  addNewsToDOM(obj);
};

const fetchNews = async (url) => {
  try {
    let res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${url}`
    );
    let data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const createAccordion = (idx) => {
  let categories = ["Coronavirus", "Technology", "Sports"];
  let accordion = document.createElement("div");
  accordion.className = "accordion";

  console.log(idx);

  accordion.innerHTML = `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading${idx}">
            <button class="accordion-btn ${
              idx !== 0 ? "collapsed" : ""
            }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}" aria-expanded=${
    idx === 0 ? true : false
  } aria-controls="collapse${idx}">
              <span class="category">${categories[idx]}</span>
            </button>
          </h2>
          <div id="collapse${idx}" class="accordion-collapse collapse ${
    idx === 0 ? "show" : ""
  }" aria-labelledby="heading${idx}" data-bs-parent="#section-accordion">
            <div class="accordion-body">
              
            </div>
          </div>
        </div>
      
      `;

  return accordion;
};

const createSliderButton = (name, idx) => {
  let button = document.createElement("button");
  button.className = `carousel-control-${name}`;

  button.setAttribute("type", "button");
  button.setAttribute("data-bs-target", `#carouselExampleControls${idx}`);
  button.setAttribute("data-bs-slide", `${name}`);

  let span1 = document.createElement("span");
  span1.className = `carousel-control-${name}-icon`;
  span1.setAttribute("aria-hidden", "true");

  let span2 = document.createElement("span");
  span2.className = "visually-hidden";

  button.appendChild(span1);
  button.appendChild(span2);

  return button;
};

const createCarousalSection = (items, idx) => {
  let carousal = document.createElement("div");

  carousal.className = "carousel slide";
  carousal.setAttribute("id", `carouselExampleControls${idx}`);
  carousal.setAttribute("data-bs-ride", "carousel");

  let carousalInner = document.createElement("div");
  carousalInner.className = "carousel-inner";

  items.forEach((item, idx) => {
    carousalItem = createCarousalItem(item, idx);
    carousalInner.appendChild(carousalItem);
  });

  carousal.appendChild(carousalInner);

  let prevButton = createSliderButton("prev", idx);
  let nextButton = createSliderButton("next", idx);

  console.log(carousal);
  carousal.appendChild(prevButton);
  carousal.appendChild(nextButton);

  return carousal;
};

const createCarousalItem = (item, idx) => {
  let carousalItem = document.createElement("div");
  if (idx === 0) {
    carousalItem.className = "carousel-item active";
  } else {
    carousalItem.className = "carousel-item";
  }

  let title = item["title"];
  let author = item["author"];
  let content = item["content"];
  let image = item["enclosure"]["link"];
  let date = item["pubDate"];

  carousalItem.innerHTML = `
          <img src="${image}" class="d-block w-100" alt="${title}">
          <div>
            <h5>${title}</h5>
            <div class="details d-flex align-items-center">
              <p>${author}</p>
              <p class="period"><i class="fa-solid fa-circle"></i></p>
              <p>${new Date(date).toLocaleString("en-IN", {
                year: "numeric",
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}</p>
            </div>
            <p class="w-100 content">${content}</p>  
          </div>   
    `;

  return carousalItem;
};

const addNewsToDOM = (items) => {
  let sectionAccordion = document.getElementById("section-accordion");
  let accBody = document.getElementsByClassName("accordion-body");

  items.forEach((item, idx) => {
    let accordion = createAccordion(idx);
    sectionAccordion.appendChild(accordion);

    console.log(accBody[idx]);
    let carousal = createCarousalSection(item, idx);

    console.log(carousal);
    accBody[idx].appendChild(carousal);
  });
};

init();

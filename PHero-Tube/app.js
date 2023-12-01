let videos = [];
let isInOrder = false;
const loadDataAllShows = (id) => {
  const emptySection = document.getElementById("empty");
    emptySection.innerHTML = ""
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      videos = data.data;
     
      if (videos.length > 0) {
        document.getElementById("sort-by").classList.remove("hidden");
        DisplayData(videos);
      } else {
        document.getElementById("sort-by").classList.add("hidden");
        emptySection;
       
        showEmpty();
      }
    })
}


const DisplayData = (Data) => {
 
    console.log(Data);
    const emptySection = document.getElementById("empty");
    emptySection.innerHTML = ""
    const video_section = document.getElementById("videos-section");
    video_section.innerHTML = "";
    Data.forEach(ele => {

      let isvarified = (ele.authors[0].verified == true);
      const card = document.createElement("div");
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <div class="thumbnali-timer position-relative">
            
              <img src="${ele.thumbnail}" class=" card-img card-img-top" alt="...">
              <p class="position-absolute timer-text">${
                ele?.others?.posted_date && formatTime(ele?.others?.posted_date)
              }</p>
        </div>
      <div class="Body-section d-flex align-items-center">
          <div>
              <img class="profile-picture" src="${ele.authors[0].profile_picture}">
          </div>
          <div class="card-body">
              <h5 class="card-title">${ele.title}</h5>
              <div id="varified-section" class="author-varified-section d-flex g-2">
                  <div class="author_name">
                      <p class="card-text">${ele.authors[0].profile_name}</p>
                  </div>
                  <div class="icon">${isvarified && `<i class="ms-2 fa-solid fa-circle-check"
                          style="color: #005eff;"></i>`}</div>
              </div>
              <p class="card-text">${ele.others.views} views</p>
          </div>
      </div>
  </div>
        `
      video_section.appendChild(card);

    });
  }

loadDataAllShows(1000);

const showEmpty = () => {
  const videoSection = document.getElementById("videos-section");
    videoSection.innerHTML = "";
    const emptySection = document.getElementById("empty");
    emptySection.innerHTML = ""
    const div = document.createElement("div");
    div.innerHTML = `  <div class="container d-flex flex-column align-items-center mt-5">
    <div>
    <img src="./icon.png" class="empty-icon w-15" alt="" />
    </div>
  <h2
    class=" mx-auto"
  >
    Oops!! Sorry, There is no content here
  </h2>
</div>`;
    emptySection.appendChild(div);
};


function formatTime(seconds) {
 
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
}

const hours = Math.floor(seconds / 3600);
const remainingSeconds = seconds % 3600;

const formattedHours = hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : '';
const formattedSeconds = remainingSeconds > 0 ? `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}` : '';

const result = [formattedHours, formattedSeconds].filter(Boolean).join(' and ');

return result || "0 seconds";
}

const handleSort = () => {
  const sortVideo = sortViews(videos);
  DisplayData(sortVideo);
};

function sortViews(data) {
  const sortedData = data.sort((a, b) => {
    const aViews = parseInt(a.others.views);
    const bViews = parseInt(b.others.views);
    return bViews - aViews;
  });
  return sortedData;
}

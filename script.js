const accessKey = "QIQpfb623Ve38cjeVKso7dIDMuODatSakovkW3LFnRk"

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchBtn = document.getElementById("searchbtn");
const showMoreBtn = document.getElementById("show-more-button");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
//making an http request
    const response = await fetch(url);
    const data = await response.json();

    //to display the result in the browser

    if(page === 1){
        searchResult.innerHTML = "";
    } //To ensure that images generated are displayed on a fresh page.

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        //retrieve the small sized images:
        image.src = result.urls.small;
        //create a link to each image to unsplash website:
        const imageLink = document.createElement("a");
        //accessing the href attribute of the anchor tag
        imageLink.href = result.links.html;  //to access the html link of each image
        //to open the clicked image in a new tab, we access the "target" attribute:
        imageLink.target = "_blank";

       const imageDownload = document.createElement("a");
       imageDownload.href = result.links.download;
       imageDownload.appendChild(image);

       imageLink.appendChild(imageDownload);

        //to place the image inside the anchor tag as a child:
        imageLink.appendChild(image);

    //to display the images in the "search-result div"
        searchResult.appendChild(imageLink);
    })

    //to display the show more button
    showMoreBtn.style.display = "block";

}

//submit event on search button
searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

//to add more images on clicking the button:

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})

searchBtn.addEventListener("click", searchImages());
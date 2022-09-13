// Global dom
let searchEl = document.getElementById('name-search')
let resultsEl = document.getElementById('results')
let submitEl = document.getElementById('submit')

// global vars
let arr = [];

// request
submitEl.addEventListener('click', function(){
    if(resultsEl.children[0]){
        reset(resultsEl.children[0], resultsEl.children[1], resultsEl.children[2], resultsEl.children[3], resultsEl.children[4])
    };
    let requestUrl = 'https://shazam.p.rapidapi.com/search?term=' + searchEl.value + '&locale=en-US&offset=0&limit=5/'
    console.log(requestUrl)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7e218f9294mshed130077e09c28bp11d981jsnb67b9fe814b1',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    fetch(requestUrl, options)
	.then(response => response.json())
	.then(response => createResults(response))
        
	.catch(err => console.error(err));

})

function createResults(response){
    
    for(i=0;i<response.tracks.hits.length;i++){
        // creates display elements
        let resultsTab = document.createElement('div');
        let resultsName = document.createElement('h3');
        let resultImg = document.createElement('img');
        let shazamEl = document.createElement('a');

        // sets track name and shazam message
        resultsName.innerHTML = response.tracks.hits[i].track.share.subject;
        shazamEl.innerHTML = 'Listen on Shazam'
        
        // set class and attributes for style and links
        resultImg.setAttribute('src', response.tracks.hits[i].track.images.coverart)
        shazamEl.setAttribute('href', response.tracks.hits[i].track.url)
        shazamEl.setAttribute('target', '_blank')
        resultsName.setAttribute('target', '_blank')
        resultImg.classList.add('img-fluid', 'd-inline-block', 'col-6')
        resultsName.classList.add('text-dark', 'd-inline-block', 'col-4')
        shazamEl.classList.add('card-text')
        shazamEl.classList.add('d-block')

        // appends create elements
        resultsEl.appendChild(resultsTab)
        resultsTab.appendChild(resultImg)
        resultsTab.appendChild(resultsName)
        
        resultsName.appendChild(shazamEl)

        // add responses to array
       
        
        searchByKeyword(resultsName, response.tracks.hits[i].track.share.subject)
        }

    }

// calls youtube api and sets anchor elements
function searchByKeyword(name, trackName) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7e218f9294mshed130077e09c28bp11d981jsnb67b9fe814b1',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
    };

    fetch('https://youtube-v31.p.rapidapi.com/search?q=' + arr[i] + '&part=id%2Csnippet&type=video&maxResults=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
        let youtubeEl = document.createElement('a');
        youtubeEl.innerHTML = 'Listen on Youtube';
        youtubeEl.classList.add('youtube-link', 'd-block')
        youtubeEl.setAttribute('href', 'https://www.youtube.com/watch?v=' + response.items[0].id.videoId)
        youtubeEl.setAttribute('target', '_blank');
        name.appendChild(youtubeEl)
        })
        .catch(err => console.error(err));
}




function reset(node1, node2, node3, node4, node5) {
    resultsEl.removeChild(node1)
    resultsEl.removeChild(node2)
    resultsEl.removeChild(node3)
    resultsEl.removeChild(node4)
    resultsEl.removeChild(node5)
}
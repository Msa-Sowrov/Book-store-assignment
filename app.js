//show initial book 
function showInitialBook(){
    const url = `https://openlibrary.org/search.json?q=programming`
    fetch(url)
    .then(res=>res.json())
    .then(data => showData(data))
    document.getElementById('loding').innerHTML = `
    <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    `
}
showInitialBook();
document.getElementById('search-btn').addEventListener('click', () =>{
    const searchValue = document.getElementById('search-filed').value;
    
    //call api
    const url = `https://openlibrary.org/search.json?q=${searchValue}`
    fetch(url)
    .then(res=>res.json())
    .then(data => showData(data))

    document.getElementById('card-area').textContent = "";
    document.getElementById('loding').innerHTML = `
    <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    `

    //clear search filed
    document.getElementById('search-filed').value = '';
})

//dispaly search result
const showData = obj => {

    const section = document.getElementById('card-area');
    //clear previous result
    section.textContent = '';
    const result = document.getElementById('result');

    result.innerText = `${obj.numFound} result found`;
    
    const data = obj.docs;

    //condition if search result not found
    if(data.length === 0){
        console.log('not found')
        result.innerText = '*result not found'
    }
    else(
    data.forEach(data => {
    const src =(`https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`)
        const div = document.createElement('div');
        div.style.add = 'col'
         div.innerHTML = `
            <div  class="card">
                <img height="500" src="${src ? src : book.jpg}" onerror="this.src='book.jpg';" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">Book Name: ${data.title_suggest ? data.title_suggest:'not found'}</h5>
                <small><span class="fw-bold">Author:</span> ${data.author_name ? data.author_name : 'not found'}</small><br>
                <small><span class="fw-bold">Publisher: </span> ${data.publisher ? data.publisher : 'not found'}</small><br>
                <small><span class ="fw-bold">Published Year: </span> ${data.first_publish_year ? data.first_publish_year : 'not found'}</small>
            </div>
        </div>
            `
    section.appendChild(div)
    document.getElementById('loding').textContent = '';
    })
    );
}

//search by pressing Enter key only
const inputValue = document.getElementById('search-filed');
const searchBtn = document.getElementById('search-btn');

inputValue.addEventListener('keypress', (event)=>{
    if(event.key == "Enter"){
        searchBtn.click();
    }
})
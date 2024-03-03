const allPostCard = document.getElementById('allPostCard');
const readCountP = document.getElementById('read-count');
const selectForRead = document.getElementById('select-for-read');
const allPost = [];
let count = 0;
const fetchAll = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
    fetch(url)
        .then(res => res.json())
        .then(data => data.posts.forEach(element => {
            allPost.push(element);
            const cardDiv = document.createElement('div');
            cardDiv.className = 'bg-base-200 p-10 rounded-2xl flex flex-col lg:flex-row border-2 w-full gap-4 mb-8';
            cardDiv.innerHTML = ` 
        <div class=" px-4  relative ">
        <img src="${element.image}" alt="" class="lg:w-16 rounded-lg ">

            <div class="absolute top-[-5px]  lg:top-[-6px] right-5">
                <div class="badge badge-primary badge-xs absolute"></div>
            </div>
            <div>
            </div>
        </div>


        <div class=" flex-grow">
            <span># ${element.category}</span>
            <span class="ml-6">Author : ${element.author?.name}</span>
            <p class="font-bold">${element.title}</p>
            <p class="pb-4 border-b-2 border-dashed inter">${element.description}</p>
            <div class="flex justify-between ">
                <div class=" flex gap-4">
                    <p class="text[#12132D99]"><i class="fa-regular fa-message"></i> ${element.comment_count}</p>
                    <p><i class="fa-regular fa-eye"></i> ${element.view_count}</p>
                    <p><i class="fa-regular fa-clock"></i> ${element.posted_time} min</p>
                </div>
                <div>
                    <img onclick="readCount('${element.id}')" src="images/Vector.svg" alt="" class="cursor-pointer">
                </div>
            </div>
        </div>`;
            allPostCard.appendChild(cardDiv);
        }));
}

function readCount(id) {
    allPost.forEach(element => {
        if (element.id === parseInt(id)) {
            const bookmarkedPost = document.createElement('div');
            count++;
            readCountP.innerText = count;
            bookmarkedPost.className = 'bg-white px-4 flex justify-between rounded-lg items-center lg:text-sm mb-4';
            bookmarkedPost.innerHTML = `<p class="">${element.title}</p>
                <div class="flex items-center gap-1"><i class="fa-regular fa-eye"></i> ${element.view_count}</div>`;
            selectForRead.appendChild(bookmarkedPost);

        }
    })

}

fetchAll();
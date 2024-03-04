const allPostCard = document.getElementById('allPostCard');
const readCountP = document.getElementById('read-count');
const selectForRead = document.getElementById('select-for-read');
const latestPost = document.getElementById('latest-posts-div');
const allPost = [];
let count = 0;
let flag = false;

const fetchAll = (postCategory) => {
    let url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
    postCategory ? url = `${url}?category=${postCategory}` : url;

    allPostCard.innerHTML = '';
    const loadDiv = document.createElement('div');
    loadDiv.className = "text-center";
    loadDiv.innerHTML = `<span class="loading loading-bars loading-md"></span>`;
    allPostCard.appendChild(loadDiv);

    setTimeout(() => {
        allPostCard.innerHTML = '';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.posts.length > 0) {
                    data.posts.forEach(element => {
                        allPost.forEach((e) => {
                            if (e.id === element.id) {
                                flag = true;
                            }
                        })
                        if (!flag) {
                            allPost.push(element);
                        }
                        const cardDiv = document.createElement('div');
                        cardDiv.className = 'bg-base-200 p-8 rounded-2xl flex flex-col lg:flex-row border-2 w-full gap-4 mb-8';
                        cardDiv.innerHTML = ` 
                            <div class=" px-4 relative ">
                            <img src="${element.image}" alt="" class="lg:w-16 rounded-lg ">

                                <div class="absolute top-[-5px]  lg:top-[-6px] right-5">
                                    <div class="badge ${element.isActive ? "bg-green-600" : "bg-red-600"}  badge-xs absolute"></div>
                                </div>
                                <div>
                                </div>
                            </div>

                            <div class=" flex-grow">
                                <span class="font-medium text-sm"># ${element.category}</span>
                                <span class="ml-6 font-medium text-sm">Author : ${element.author?.name}</span>
                                <p class="font-bold text-xl">${element.title}</p>
                                <p class="pb-4 border-b-2 border-dashed inter border-gray-300 text-[#12132D99]">${element.description}</p>
                                <div class="flex justify-between mt-4">
                                    <div class=" flex gap-4 text-[#12132D99]">
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
                    })
                }
                else {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'bg-base-200 p-10 rounded-2xl flex flex-col lg:flex-row border-2 w-full gap-4 mb-8';
                    cardDiv.innerHTML = `<h1>Nothing found</h1>`;
                    allPostCard.appendChild(cardDiv);
                }
            })
            .catch(err => console.log(err));
    }, 2000)

}

const fetchLatestPosts = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';

    latestPost.innerHTML = '';
    const loadDiv = document.createElement('div');
    loadDiv.className = "text-center";
    loadDiv.innerHTML = `<span class="loading loading-bars loading-md"></span>`;
    latestPost.appendChild(loadDiv);

    setTimeout(() => {
        latestPost.innerHTML = '';
        fetch(url)
            .then(res => res.json())
            .then(data => data.forEach((element) => {
                const div = document.createElement('div');
                div.className = 'card bg-base-100 shadow-xl';
                div.innerHTML = `
                    <figure class="px-10 pt-10">
                        <img src="${element.cover_image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body ">
                        <p class="text-[#12132D99]"><i class="fa-regular fa-calendar"></i> <span id="date"> ${element.author.posted_date || "No publish date"}</span></p>
                        <h2 class="card-title " id="latest-title">${element.title}</h2>
                        <p id="latest-description" class="text-[#12132D99]">${element.description}</p>
                        <div class="card-actions">
                            <div class="mr-2">
                                <img id="latest-profile_img" src="${element.profile_image}" alt="" class="w-12 rounded-full">
                            </div>
                            <div>
                                <p id="latest-author" class="font-bold">${element.author.name}</p>
                                <p id="latest-desgination" class="text-[#12132D99]">${element.author.designation || "Unknown"}</p>
                            </div>
                        </div>
                    </div>`
                latestPost.appendChild(div);
            }
            ));
    }, 2000);
}

function readCount(id) {
    allPost.forEach(element => {
        if (element.id === parseInt(id)) {
            const bookmarkedPost = document.createElement('div');
            count++;
            readCountP.innerText = count;
            bookmarkedPost.className = 'bg-white px-4 py-2 flex justify-between rounded-lg items-center lg:text-sm mb-4';
            bookmarkedPost.innerHTML = `<p class="font-bold">${element.title}</p>
                <div class="flex items-center gap-1 text-[#12132D99]"><i class="fa-regular fa-eye"></i> ${element.view_count}</div>`;
            selectForRead.appendChild(bookmarkedPost);

        }
    })
}

function searchCategory() {
    const category = document.getElementById('search-category').value;
    fetchAll(category);
}

fetchAll();
fetchLatestPosts();
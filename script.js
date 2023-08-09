const audio = document.querySelector("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const imgc = document.getElementsByClassName("img_container");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let isplaying = false;
let index = 0;

// play button pr click krne pr kya ho jaise gaana chl rha ho to pause ho aje aur na chl rha ho to chlne lge
play.addEventListener("click", () => {
    if (isplaying) {
        pausemusic();
    }
    else {
        playmusic();
    }
});

// music chalane ke liye
playmusic = () => {
    isplaying = true;
    audio.play();
    play.classList.replace("fa-play", "fa-pause");
    imgc[0].classList.add("anime");
}

// music bnd krne ke liye
pausemusic = () => {
    isplaying = false;
    audio.pause();
    play.classList.replace("fa-pause", "fa-play");
    imgc[0].classList.remove("anime");
}

// songs naam ka ek object array bna diya hai jisme song ke title aur artist ka naam rkh rhe hai 
// jiske help se title,artist name photo vgera change kr paeyenge aage piche krne pr 
const songs = [
    { title: "Ram Ram", artist: "Mc Square" },
    { title: "Gang Wale Munde", artist: "Paradox" },
    { title: "Proper Patola", artist: "Badshah, Aastha G" },
    { title: "jadugar", artist: "Paradox"},
    { title: "safar", artist:" Juss"}
]

// ek function bna diya hai jisse photo title vgera change ho rha 
const loadsong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    audio.src = `music/${songs.title}.mpeg`;
    img.src = `pictures/${songs.title}.jpg`;
}

// next button pr click krne pr kya event ho jaise aage jae aur song title photo vgera sb 
// change ho to uske liye event listner lgaya hai 
next.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadsong(songs[index]);
    document.getElementById("progress").style.width = '0%' ;

    // agr continuos song nhi chalana hai to next line uncomment nd playmusic() comment kr dena
    // 5 line baad hoga usko comment out
    // nd kuch line no. 116 pr bhi hai jo comment uncomment krne pdenge visit that
    // pausemusic();

    // agr continuos gane chalana hai to uper ke 2 line ko comment out krke playmusic() ko uncomment krde
    // nd kuch line no. 116 pr bhi hai jo comment uncomment krne pdenge visit that
    playmusic();
})

// prev button pr click krne pr kya event ho jaise piche jae aur song title photo vgera sb 
// change ho to uske liye event listner lgaya hai 
prev.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadsong(songs[index]);
    document.getElementById("progress").style.width = '0%' ;
    pausemusic();
})


//audio mai jaise hi time update hoga vaise hi ye call krega function ko jisme apn ne e argument pass kiya hai
// nd usme jo bhi chije hai vo time update ke saath baar baar call hoti jaegi
// 1 sec mai 4 baar time update hota hai
// console.log(e) krne pr event aa jaega phir usme srcElement pr jaega to currentTime aur duration vgera milenge 
// jisse pta chlta hai ki total length kitni hai song ki hai abhi kis time pr hai
// bs issi chij ka use krke song kitna complete hua hai uske css ko manage kr rhe hai
// ek line hai jisme black line update ho rhi usko % se deal kr rhe hai css mai bhi initialise % se hi kiya 
// tha nd yha bhi % kr through usko update krte ja rhe hai 
audio.ontimeupdate = (e) => {
    // const{currentTime,duration} = e.srcElement ;
    const currentTime = e.srcElement.currentTime;
    const duration = e.srcElement.duration;
    document.getElementById("progress").style.width = `${(currentTime / duration) * 100}%`;
    let mm;
    let ss;
    mm = Math.floor(currentTime / 60);
    ss = Math.floor(currentTime % 60);
    if(ss<10){
        document.getElementById("current_time").innerHTML = `${mm}:0${ss}`;
    }
    else{
        document.getElementById("current_time").innerHTML = `${mm}:${ss}`;
    }
    mm = Math.floor(duration / 60);
    ss = Math.floor(duration % 60);
    if (duration) {
        document.getElementById("duration").innerHTML = `${mm}:${ss}`;
    }
    // else{
    //     document.getElementById("duration").innerHTML = '0:00';
    // }

    // continuos gaane chalana ya nhi chalana usko handle krne ke liye
    if (currentTime === duration) {
        // continuos gaane nhi chalane hai to image ko bhi stop krna pdega nd button ko bhi pause
        // krna pdega so next 2 line vahi kr rhe 
        // play.classList.replace("fa-pause", "fa-play");
        // imgc[0].classList.remove("anime");

        // continuos chalana hai to next line uncomment nd uper ke 2 line comment out aur next mai bhi
        // thoda part hai jo uncomment krna pdega line no. 58 check it
        next.click();
    }
}

// progess_div pr event listener lga rhe hai vo jo black line jisse pta chl rha hai kitna music complete hua hai
// vahi chij hai usko class de rkhi hai progess_div
// krna ye chahte hai ki jaha pr click kre to music vaha se chlne lge
progress_div.addEventListener("click",(e)=>{
    // abhi console.log(e) kroge then issi bar pr click nd console mai jao vaha pr event dikhega jisme usme 
    // srcElement pr jane pr clientwidth milega jisse uski width mil jaegi nd event mai hi dekhne pr
    // offsetx milega jisse uss bar mai kha click kiya vo width mil jaegi ab kha click kiya vo
    // width bhi hai nd total width bhi hai % nikalo nd .progress ke width ko update krdo
    // jisse black line vahi pr aa jaegi
    let total_width = e.srcElement.clientWidth ;
    let clicked_width = e.offsetX ;
    let percent = (clicked_width/total_width)*100 ;
    document.getElementById("progress").style.width = `${percent}%`;
    audio.currentTime=(percent/100)*audio.duration ;
})


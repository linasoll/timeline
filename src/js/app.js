const buttonSend = document.querySelector(".button-send")
const buttonVideo = document.querySelector(".button-video")
const buttonAudio = document.querySelector(".button-audio")
const input = document.querySelector(".input")
const posts = document.querySelector(".posts")
const buttons = document.querySelector(".buttons")
const errGeo = document.querySelector(".popup-geo")
const inputGeo = document.querySelector(".input-coord")
const geoForm = document.querySelector(".geo-form")

buttonSend.addEventListener("click", () => {
    if (input.value) {
        const post = document.createElement("div");
        post.classList.add("post");

        const postTime = document.createElement("div");
        postTime.classList.add("post-time");
        getTime(postTime)
        
        const postContent = document.createElement("div");
        postContent.classList.add("post-content");
        postContent.textContent = input.value;
        input.value = ""
        
        post.appendChild(postTime)
        post.appendChild(postContent)

        getCoords(post)

        posts.prepend(post)
    }
})

buttonAudio.addEventListener("click", async () => {
    buttons.classList.add("hidden")
    buttons.classList.remove("buttons")
    const recordButtons = document.querySelector(".record-buttons")

    const buttonOk = document.createElement("button")
    buttonOk.classList.add("button")
    buttonOk.classList.add("button-ok")

    const buttonStop = document.createElement("button")
    buttonStop.classList.add("button")
    buttonStop.classList.add("button-stop")

    const timer = document.createElement("div");
    timer.classList.add("timer")
    timer.textContent = "00:00"
    
    recordButtons.appendChild(buttonOk)
    recordButtons.appendChild(timer)
    recordButtons.appendChild(buttonStop)

    let interval = setInterval(() => updateTime(timer), 1000);

    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
    });

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
    });

    recorder.start();

    buttonStop.addEventListener("click", () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(interval)

        buttons.classList.remove("hidden")
        buttons.classList.add("buttons")

        recordButtons.removeChild(timer)
        recordButtons.removeChild(buttonOk)
        recordButtons.removeChild(buttonStop)

        seconds = 0;
        minutes = 0;
    });
    
    buttonOk.addEventListener("click", () => {
        buttons.classList.remove("hidden")
        buttons.classList.add("buttons")

        recordButtons.removeChild(timer)
        recordButtons.removeChild(buttonOk)
        recordButtons.removeChild(buttonStop)

        seconds = 0;
        minutes = 0;

        recorder.addEventListener("stop", () => {
            const blob = new Blob(chunks);
            audio.src = URL.createObjectURL(blob);
        });

        recorder.stop()
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(interval)

        const post = document.createElement("div");
        post.classList.add("post");

        const postTime = document.createElement("div");
        postTime.classList.add("post-time");
        getTime(postTime)
        
        const audio = document.createElement("audio");
        audio.setAttribute("controls", "true")
        
        const postCoord = document.createElement("div");
        postCoord.classList.add("post-coord")
        getCoords(postCoord)
        
        post.appendChild(postTime)
        post.appendChild(audio)
        post.appendChild(postCoord)
        
        posts.prepend(post)
    })

})

buttonVideo.addEventListener("click", async () => {
    buttons.classList.add("hidden")
    buttons.classList.remove("buttons")
    const recordButtons = document.querySelector(".record-buttons")

    const buttonOk = document.createElement("button")
    buttonOk.classList.add("button")
    buttonOk.classList.add("button-ok")

    const buttonStop = document.createElement("button")
    buttonStop.classList.add("button")
    buttonStop.classList.add("button-stop")

    const timer = document.createElement("div");
    timer.classList.add("timer")
    timer.textContent = "00:00"
    
    recordButtons.appendChild(buttonOk)
    recordButtons.appendChild(timer)
    recordButtons.appendChild(buttonStop)

    let interval = setInterval(() => updateTime(timer), 1000);

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
    });

    recorder.start();

    buttonStop.addEventListener("click", () => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(interval)

        buttons.classList.remove("hidden")
        buttons.classList.add("buttons")

        recordButtons.removeChild(timer)
        recordButtons.removeChild(buttonOk)
        recordButtons.removeChild(buttonStop)

        seconds = 0;
        minutes = 0;
    });
    
    buttonOk.addEventListener("click", () => {
        buttons.classList.remove("hidden")
        buttons.classList.add("buttons")

        recordButtons.removeChild(timer)
        recordButtons.removeChild(buttonOk)
        recordButtons.removeChild(buttonStop)

        seconds = 0;
        minutes = 0;

        recorder.addEventListener("stop", () => {
            const blob = new Blob(chunks);
            video.src = URL.createObjectURL(blob);
        });

        recorder.stop()
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(interval)

        const post = document.createElement("div");
        post.classList.add("post");

        const postTime = document.createElement("div");
        postTime.classList.add("post-time");
        getTime(postTime)
        
        const video = document.createElement("video");
        video.setAttribute("controls", "true")
        video.classList.add("video")
        
        const postCoord = document.createElement("div");
        postCoord.classList.add("post-coord")
        getCoords(postCoord)
        
        post.appendChild(postTime)
        post.appendChild(video)
        post.appendChild(postCoord)
        
        posts.prepend(post)
    })

})

function getTime (postTime) {
    let currentDate = new Date();
    postTime.textContent = currentDate;
}

function getCoords (post) {
    const postCoord = document.createElement("div");
    postCoord.classList.add("post-coord")

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (data) {
            const { latitude, longitude } = data.coords;
            postCoord.textContent = `${latitude}, ${longitude}`;
          },
        );
    } 

    // const errGeo = document.createElement("div")
    // errGeo.classList.add("popup-geo")
    // errGeo.textContent = "Что-то пошло не так! Дайте разрешение на определение геолокации или введите координаты вручную (широта и долгота через запятую):"

    // const geoForm = document.createElement("form")
    // geoForm.classList.add("geo-form")

    // const inputCoord = document.createElement("input")
    // inputCoord.classList.add("input-coord")

    // const inputOk = document.createElement("button")
    // inputOk.classList.add("input-ok")

    // geoForm.appendChild(inputCoord)
    // geoForm.appendChild(inputOk)
    // errGeo.appendChild(geoForm)
    // document.body.appendChild(errGeo)

    // geoForm.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     postCoord.textContent = inputCoord.value;
    //     errGeo.remove()
    // })
    
    post.appendChild(postCoord)
}

let seconds = 0;
let minutes = 0;
function updateTime(timer) {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

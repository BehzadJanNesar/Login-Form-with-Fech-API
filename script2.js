setTimeout(() => {
    alert("Hey, first of all, thank you for visiting this page and Click this button to create your account")
}, 500);

const creat = document.getElementById("creat-post");
const token = "63df5f946dc47f56beda5999";
const base_URL = "https://dummyapi.io/data/v1/";

creat.addEventListener("click", () => {
    document.querySelector(".section1").style.display = "flex";
    creat.style.display = "none";
});

document.getElementById("create").addEventListener("click", () => {
    const firstname = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    fetch(base_URL + "user/create", {
        method: "POST",
        body: JSON.stringify({
            firstName: firstname,
            lastName: lastName,
            email: email,
        }),
        headers: {
            "app-id": token,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => {
            localStorage.setItem("My id", json.id);
            fetch(base_URL + "post/create", {
                method: "POST",
                body: JSON.stringify({
                    text: "This text for blog post",
                    owner: localStorage.getItem("My id"),
                }),
                headers: {
                    "app-id": token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    consol.log(json);
                });
        })
        .catch((error) => console.log(error));

    document.querySelector(".welcome-text").innerHTML = "Your Account Created";
    document.querySelector(".welcome-box").style.background = "#08aa1e";
    document.querySelector(".welcome-box").classList.add("show");

    document.querySelector(".fl-name").innerHTML = ` ${firstname} ${lastName} `;
    document.querySelector(".emaill").innerHTML = email;
});

document.getElementById("new").addEventListener("click", () => {
    const id = localStorage.getItem("My id");
    fetch(base_URL + "user/" + id, {
        method: "DELETE",
        headers: {
            "app-id": token,
        },
    });
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "";
    document.querySelector(".welcome-text").innerHTML = "Create Your Account";
    document.querySelector(".welcome-box").style.background = "#4c87cf";

    document.querySelector(".fl-name").innerHTML = "";
    document.querySelector(".emaill").innerHTML = "";
});
//  Dark mode
document.querySelector(".dark_mode").addEventListener("click", () => {
    document.querySelector(".fa-regular").classList.toggle("fa-solid");
    document.querySelector(".header").classList.toggle("h_dark");
    document.querySelector("body").classList.toggle("b_dark");
    document.querySelector(".left").classList.toggle("leftsec_dark");
    document.querySelector(".total h1").classList.toggle("signin_dark");
    document.querySelector(".inp1").classList.toggle("color");
    document.querySelector(".inp2").classList.toggle("color");
    document.querySelector(".inp3").classList.toggle("color");
    document.getElementById("create").classList.toggle("buttons_dark");
    document.getElementById("new").classList.toggle("button_new_dark");
});

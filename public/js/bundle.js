var $jqtH7$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
const $f60945d37f8e594c$var$locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log($f60945d37f8e594c$var$locations);
const $f60945d37f8e594c$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoiYXNodXRvc2hvZmZpY2lhbDI1IiwiYSI6ImNsM3lmdm8zdjB0bngzY3Fnd3VleHJ2ZXkifQ.a1HzoPgSquXrazGuWKwWDQ";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11"
    });
};



const $70af9284e599e604$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($jqtH7$axios)))({
            method: "POST",
            url: "http://127.0.0.1/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") {
            alert("Logged in successfuly");
            window.setTimeout(()=>{
                location.assign("/");
            }, 500);
        }
    } catch (err) {
        console.log(err.response.data);
    }
};


//DOM
const $d0f7ce18c37ad6f6$var$mapBox = document.getElementById("map");
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form");
//values
const $d0f7ce18c37ad6f6$var$email = document.getElementById("email").value;
const $d0f7ce18c37ad6f6$var$password = document.getElementById("password").value;
//delegation
if ($d0f7ce18c37ad6f6$var$mapBox) {
    const locations = JSON.parse($d0f7ce18c37ad6f6$var$mapBox.dataset.locations);
    (0, $f60945d37f8e594c$export$4c5dd147b21b9176)(locations);
}
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    (0, $70af9284e599e604$export$596d806903d1f59e)($d0f7ce18c37ad6f6$var$email, $d0f7ce18c37ad6f6$var$password);
});


//# sourceMappingURL=bundle.js.map

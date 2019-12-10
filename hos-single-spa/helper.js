export default function myHandler(data) {
    var element = document.getElementById("content");
    if (data) {
        element.classList.add("expanded")
    } else {
        element.classList.remove("expanded")
    }
}
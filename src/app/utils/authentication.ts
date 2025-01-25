export default function isAuthenticated() {
    return localStorage.getItem("isAuthenticated") == "1" ? true : false
}
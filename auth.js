// Simple front-end login gate. Change the credentials here.
// Note: this runs in the browser, so it keeps casual visitors out but is not real security.
const KT_USER = "admin", KT_PASS = "kt@2026";
const ktOk = () => { try { return sessionStorage.getItem("kt_auth") === "1"; } catch (e) { return false; } };
if (!document.getElementById("kt-login") && !ktOk()) location.replace("login.html");

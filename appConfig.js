// var locationPath = location.pathname.replace(/\/[^\/]+$/, "/");
var locationPath = "http://localhost:8080/";

window.dojoConfig = {
    deps: ["app/main"],
    packages: [
        {
            name: "app",
            location: locationPath + "dist/app"
        }
    ]
};

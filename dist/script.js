"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const route = (event) => {
    var _a;
    event = event || window.event;
    console.log("route event run. event:", event);
    event.preventDefault();
    window.history.pushState({}, "", (_a = event.target) === null || _a === void 0 ? void 0 : _a.href);
    handleLocation();
};
const routes = {
    404: "/pages/404.html",
    "/": "PLACEHOLDER FROM ROUTES",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
    "/services": "/pages/services.html"
};
const handleLocation = () => {
    const path = window.location.pathname;
    console.log("path:", path);
    const route = routes[path] || routes[404];
    console.log("route:", route);
    let page;
    fetchPage(route)
        .then(data => page = data)
        .then(() => {
        getMainTag()
            .then(data => data.innerHTML = page);
    });
};
const fetchPage = (route) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fetch(route)
            .then(data => data.text())
            .then(htmlString => resolve(htmlString))
            .catch((err) => {
            console.error("fetchPage(): Error fetching page!", err);
            reject(err);
        });
    });
});
const getMainTag = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const mainTag = document.querySelector("main");
        mainTag ? resolve(mainTag) : reject("Couldn't find main tag");
    });
});
window.addEventListener("popstate", handleLocation);

const route = (event: any) => {
    event = event || window.event;
    console.log("route event run. event:", event);
    event.preventDefault();
    window.history.pushState({}, "", event.target?.href);
    handleLocation();
}

const routes: Record<string | number, string> = {
    404: "/pages/404.html",
    "/": "PLACEHOLDER FROM ROUTES",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
    "/services": "/pages/services.html"
}

const handleLocation = () => {
    const path: string | null = window.location.pathname;
    console.log("path:", path);
    const route = routes[path] || routes[404];
    console.log("route:", route);
    let page: string;
    fetchPage(route)
    .then(data => page = data)
    .then(() => {
        getMainTag()
        .then(data => data.innerHTML=page);
    })

}

const fetchPage = async(route:string) => {
    return new Promise<string>((resolve, reject) => {
        fetch(route)
        .then(data => data.text())
        .then(htmlString => resolve(htmlString))
        .catch((err) => {
            console.error("fetchPage(): Error fetching page!",err);
            reject(err);
        });
    });
}

const getMainTag = async () => {
    return new Promise<HTMLElement>((resolve, reject) => {
        const mainTag: HTMLElement|null= document.querySelector("main");
        mainTag? resolve(mainTag) : reject("Couldn't find main tag");
    });
}

window.addEventListener("popstate", handleLocation);
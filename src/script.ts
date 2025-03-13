const route = (event: any) => {
    event = event || window.event;
    console.log("route event run. event:", event);
    event.preventDefault();
    window.history.pushState({}, "", event.target?.href);
    handleLocation();
}

type Page = {
    title: string;
    contentPath: string;
    tagId: string;
    content?: string;
}

const routes: Record<string | number, Page> = {
    404: {
        title: "404 - Page Not Found",
        contentPath: "/pages/404.html",
        tagId: "404"
    },
    "/": {
        title: "About Me",
        contentPath: "/pages/about.html",
        tagId: "about"
    },
    "/about": {
        title: "About Me",
        contentPath: "/pages/about.html",
        tagId: "about"
    },
    "/projects": {
        title: "My Projects",
        contentPath: "/pages/projects.html",
        tagId: "projects"
    },
    "/contact": {
        title: "Contact Me",
        contentPath: "/pages/contact.html",
        tagId: "contact"
    }
}

const handleLocation = () => {
    const path: string | null = window.location.pathname;
    const route = (routes[path] || routes[404]);
    const page: Page = {
        title: route.title, 
        contentPath: route.contentPath, 
        tagId: route.tagId
    };
    fetchPage(page.contentPath)
        .then(data => page.content = data)
        .then(() => renderPage(page));
}

const fetchPage = async (route: string) => {
    return new Promise<string>((resolve, reject) => {
        fetch(route)
            .then(data => data.text())
            .then(htmlString => resolve(htmlString))
            .catch((err) => {
                console.error("fetchPage(): Error fetching page!", err);
                reject(err);
            });
    });
}

const fetchTag = async (tagname: string) => {
    return new Promise<HTMLElement>((resolve, reject) => {
        const tag: HTMLElement | null = document.querySelector(tagname);
        tag ? resolve(tag) : reject("Couldn't find <" + tagname + "> tag!");
    });
}

const renderPage = (page: Page) => {
        fetchTag("main")
            .then(mainTag => {
                mainTag.innerHTML = page.content || "404 - Page Not Found";
                mainTag.id = page.tagId;
                document.title = page.title;
            });
}

window.addEventListener("popstate", handleLocation);
document.addEventListener("DOMContentLoaded", handleLocation);
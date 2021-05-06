import { requestServer } from './request.js'

export const singleProjectCreation = (getProject, /*link,*/ allowTag = true) => {

    let location = document.location.origin
    let params = (new URL(document.location)).searchParams;

    requestServer(getProject).then(response => {

        const data = response.data

        console.log(data)

        let projectId = parseInt(params.get('projectId'))
        const projectOnPage = data.findIndex(project => project.id.toString() === projectId.toString())

        const singleProject = document.getElementById("project-wrapper")


        let singleProjectImg = data[projectOnPage].images.hidpi;

        if (singleProjectImg === null) {
            singleProjectImg = data[projectOnPage].images.normal;
        }

        let projectTitleType = data[projectOnPage].title.split(" - ");

        if (data[projectOnPage].tags.find(tag => tag === "game")){

            let gamePage = document.implementation.createHTMLDocument("Game");
            let div = gamePage.createElement("div");

            div.innerHTML = data[projectOnPage].description;



            singleProject.innerHTML = `
                <div id="first-piece">
                        <div id="project-infos">
                            <div id="project-name-type">
                                <p>${projectOnPage} · ${projectTitleType[0]}</p>
                                <p>${projectTitleType[1]}</p>
                            </div>
                            <iframe class="gameIframe" title="${projectTitleType[0]}" height="600" width="600" src="about:blank"></iframe>
                            <div id="prj-descr"><p>${data[projectOnPage].description}</p></div>
                        </div>
                        <div id="skills-carousel"></div>
                    </div>
                    <div id="prj-img-container">
                </div>
            `

            let frame = document.querySelector(".gameIframe");

            let destDocument = frame.contentDocument;
            let srcNode = gamePage.documentElement;
            let newNode = destDocument.importNode(srcNode, true);

            destDocument.replaceChild(newNode, destDocument.documentElement);

            console.log(destDocument)

        } else {


            singleProject.innerHTML = `
                <div id="first-piece">
                    <div id="project-infos">
                        <div id="project-name-type">
                            <p>${projectOnPage} · ${projectTitleType[0]}</p>
                            <p>${projectTitleType[1]}</p>
                        </div>
                        <div id="main-prj-img-container">

                            <img src="${singleProjectImg}" height="100%" id="main-prj-img">
                        </div>
                        <div id="prj-descr"><p>${data[projectOnPage].description}</p></div>
                    </div>
                    <div id="skills-carousel"></div>
                </div>
                <div id="prj-img-container">

                </div>
        `

        }

        const secondaryImgContainer = document.querySelector("#prj-img-container");

        data.forEach(imgData => {

            let projectImg = imgData.images.hidpi;

            if (projectImg === null) {
                projectImg = imgData.images.normal;
            }

            if (imgData.description === null && data[projectOnPage].title === imgData.title) {

                secondaryImgContainer.innerHTML += `
                                                <div class="prj-img-wrapper">
                                                    <img src="${projectImg}" class="prj-imgs">
                                                </div>
            `
            }

        })

    })
}
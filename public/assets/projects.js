let carouselProjectsWrapper = document.querySelector(".splide__list");

const requestProjects = async () => {
    const APILocation = "http://localhost:3000/";
    //const APILocation = "https://maxlepan.herokuapp.com/";

    const response = await axios.get(`${APILocation}getProjects`);

    try {
        const datas = response.data;

        datas.reverse().forEach(data => {

            if (datas.find(element => element.title !== data.title) && data.description !== null){
                carouselProjectsWrapper.innerHTML += `
                    <li class="splide__slide">
                        <a href="" id="${data.id}" class="carousel-projects">
                            <img src="${data.images.hidpi}" class="carousel-img">
                        </a>
                        
                    </li>`
            }

        })

        let projects = document.querySelectorAll(".carousel-projects");

        projects.forEach(project => {
            const idProject = project.getAttribute("id");

            let location = document.location.origin;

            let projectUrl = `${location}/pages/project.html?projectId=${idProject}`;

            project.href = projectUrl;
        })

    } catch (err) {
        console.log(err);
    }
}

requestProjects();
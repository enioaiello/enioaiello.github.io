document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".menu .link");

    const updateActiveLinkOnScroll = () => {
        const sections = Array.from(document.querySelectorAll("section"));
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionId = section.getAttribute("id");
            const link = document.querySelector(`.menu .link[href="#${sectionId}"]`);

            if (
                link &&
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLinkOnScroll);

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => l.classList.remove("active"));

            link.classList.add("active");
        });
    });

    updateActiveLinkOnScroll();
});

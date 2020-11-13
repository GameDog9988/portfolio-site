import Head from "next/head";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from "react";

export default function Home() {
  const projectArray = [
    {
      name: "grademyaid",
      description:
        "A website that allows students to grade and compare scores for their college financial aid packages using data from the US Department of Education.",
      image: "/images/www.grademyaid.com_.png",
      link: "https://www.grademyaid.com/",
      page: "https://github.com/GameDog9988/grade-my-aid",
    },
    {
      name: "New York Times Critic's Picks",
      description:
        "A website that showcases movies that The New York Times considers critic's picks using their API.",
      image: "/images/NYT_Critic_Picks.png",
      link: "https://nytcriticpicks.netlify.app",
      page: "https://github.com/GameDog9988/Movie-Review-App",
    },
    {
      name: "Virtual Safari",
      description:
        "A recreation of Timon and Pumbaa's Virtual Safari, a choose-your-own adventure from The Lion King DVD.",
      image: "/images/Virtual_Safari_Snippet.png",
      link: "https://virtualsafari.netlify.app/",
      page: "https://github.com/GameDog9988/Virtual-Safari",
    },
    {
      name: "Danny's Subs",
      description:
        "This ficticious restaurant website was my first foray into using GSAP's animation library in React.",
      image: "/images/Danny_Subs.png",
      link: "https://dannysubs.netlify.app",
      page: "https://github.com/GameDog9988/Restaurant-React",
    },
  ];

  const [dimensions, setDimensions] = useState();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    function debounce(fn, ms) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, arguments);
        }, ms);
      };
    }

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      console.log(dimensions);
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    gsap.registerPlugin(ScrollTrigger);

    let projects = gsap.utils.toArray(".project-row .project");

    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".project-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: { min: 0.2, max: 0.3 },
          delay: 0,
        },
        // Base vertical scrolling on how wide the container is so it feels more natural.
        end: () => "+=" + document.querySelector(".project-row").offsetHeight,
      },
    });

    gsap.to("body", { duration: 0, css: { visibility: "visible" } });
    gsap.from(".title", { duration: 1, y: 20, opacity: 0, ease: "power4.out" });
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Alexander Grattan Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <div className="space-between">
          <div className="logo">AG</div>
          <ul className="nav-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Me</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main">
        <h1 className="title">I create playful experiences.</h1>
        <h3 className="job-title">Alexander Grattan / Full Stack Developer</h3>
      </main>
      <div className="project-container">
        <div className="project-row">
          {projectArray.map(({ name, description, image, link, page }) => (
            <div className="project">
              <img src={image} alt={name} />
              <div className="project-info">
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="project-btns">
                  <a href={page} target="_blank" rel="noopener noreferrer">
                    <button>Learn More</button>
                  </a>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <button>To Site</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>
        <ul className="footer-links">
          <li>
            <a
              href="https://github.com/GameDog9988"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="Resume_Alexander_Grattan.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/agrattan0820"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
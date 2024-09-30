import { Suspense, useEffect, useState } from "react";
import {
  Await,
  defer,
  Link,
  useLoaderData
} from "react-router-dom"
import { getProjects } from "../api";

export async function loader() {
  return defer({projects: getProjects()})
}

export default function Projects() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      setWindowWidth(window.innerWidth);
    });
  }, []);
  const data = useLoaderData();
  
  return (
    <main className="projects-container">
      <div className="projects-title">
        <h1 className="project-sub-title">PROJECTS</h1>
        <p>Stuff I did.</p>
      </div>

      <Suspense fallback={<div className="loading-header"></div>}>
        <Await resolve={data.projects}>
          {projects => {
            const projectsMap = projects.map(project => {
              return (
                <div key={project.id}>
                  {windowWidth < 750 || project.id % 2 === 0
                  ?
                  <div className="project-container">
                    <img className="project-image" src={project.imageUrl} alt={`Picture of ${project.name}`}/>
                    <div className="project-info">
                      <h1>{project.name}</h1>
                      <p>{project.description}</p>
                      <Link to={project.link} target="_blank" rel="noopener noreferrer"><div className="project-cta">Check it out &rarr;</div></Link>
                    </div>
                  </div>
                  :
                  <div className="project-container">
                    <div className="project-info">
                      <h1>{project.name}</h1>
                      <p>{project.description}</p>
                      <Link to={project.link} target="_blank" rel="noopener noreferrer"><div className="project-cta">Check it out</div></Link>
                    </div>
                    <img className="project-image" src={project.imageUrl} alt={`Picture of ${project.name}`}/>
                  </div>                  
                }
                </div>
              )
            })

            return (
              <div>
                {projectsMap}
              </div>
            )
          }}
        </Await>
      </Suspense>
    </main>
  )
}
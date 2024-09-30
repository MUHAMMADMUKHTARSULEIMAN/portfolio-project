import { useEffect} from "react"
import {NavLink, Outlet} from "react-router-dom"
import { useState } from "react"
import useLocalStorage from "use-local-storage"
import { Menu, Moon, Sun, X } from "lucide-react"

export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      e.preventDefault();
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkTheme, setTheme] = useLocalStorage("dark-theme", defaultDark ? true : false);
  const [menu, setMenu] = useState(false)
  const toggleMenu = () => {
    setMenu(menu => !menu)
  }
  const switchTheme = () => {
    setTheme(darkTheme => !darkTheme)
  }

  return (
    <div data-theme={darkTheme}>
      <header className="header">
        <NavLink to="/" onClick={menu ? toggleMenu : ""}>
          <div className="hero-container">
            <p className="hero">SULEI<span className="hero-span">MAN</span></p>
          </div>
        </NavLink>
        {
          windowWidth < 750 ?
          <div className="mobile-nav">
            {
              darkTheme ?
              <Sun onClick={switchTheme} className="theme-icon" strokeWidth={1.25}/>
              :
              <Moon onClick={switchTheme} className="theme-icon" strokeWidth={1.25}/>
            }
            {
              !menu ? <Menu onClick={toggleMenu} className="menu" strokeWidth={1.25}/>
              :
              <X onClick={toggleMenu} className="menu" strokeWidth={1.25}/>
            }
          </div> :
          <div className="desktop-nav">
            {
            darkTheme
            ? <Sun onClick={switchTheme} className="theme-icon" strokeWidth={1.25}/>
            : <Moon onClick={switchTheme} className="theme-icon" strokeWidth={1.25}/>
            }
            <NavLink className={({isActive}) => isActive ? "active-link" : ""} to="/about">
              <p>ABOUT</p>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : ""} to="projects">
              <p>PROJECTS</p>
              </NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : ""} to="contact">
              <p>CONTACT</p>
              </NavLink>
          </div>        
        }
      </header>
      {menu && windowWidth < 750 &&
        <div className="menu-container">
          <NavLink onClick={menu ? toggleMenu : ""} className={({isActive}) => isActive ? "active-link" : ""} to="/about">
            <p>ABOUT</p>
          </NavLink>
          <hr/>
          <NavLink onClick={menu ? toggleMenu : ""} className={({isActive}) => isActive ? "active-link" : ""} to="projects">
            <p>PROJECTS</p>
          </NavLink>
          <hr/>
          <NavLink onClick={menu ? toggleMenu : ""} className={({isActive}) => isActive ? "active-link" : ""} to="contact">
            <p>CONTACT</p>
          </NavLink>
        </div>
      }
      {menu && windowWidth < 750 ? "" : <div className="outlet"><Outlet/></div>}
    </div>
  )
}



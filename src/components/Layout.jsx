import { useEffect} from "react"
import {NavLink, Outlet} from "react-router-dom"
import { useState } from "react"
import useLocalStorage from "use-local-storage"
import {Moon, Sun,} from "lucide-react"

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
    <div data-theme={darkTheme} className="layout-container">
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
              <Sun onClick={switchTheme} className="theme-icon"/>
              :
              <Moon onClick={switchTheme} className="theme-icon"/>
            }
            {
              <div onClick={toggleMenu} className={!menu ? "menu-div" : "menu-div-opened"}>
                <div className="div-1"></div>
                <div className="div-2"></div>
              </div>
            }
          </div> :
          <div className="desktop-nav">
            {
            darkTheme
            ? <Sun onClick={switchTheme} className="theme-icon"/>
            : <Moon onClick={switchTheme} className="theme-icon"/>
            }
            <NavLink className={({isActive}) => isActive ? "active-link" : ""} to="/about">
              <p className="desktop-nav-animator">ABOUT</p>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : ""} to="projects">
              <p className="desktop-nav-animator">WORK</p>
              </NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : ""} to="contact">
              <p className="desktop-nav-animator">CONTACT</p>
              </NavLink>
          </div>        
        }
      </header>
      {menu && windowWidth < 750 &&
        <div className="menu-container-container">
          <div className="menu-container">
            <NavLink onClick={menu ? toggleMenu : ""} className={({isActive}) => isActive ? "active-link" : ""} to="/about">
              <p className="mobile-nav-animator">ABOUT</p>
            </NavLink>
            <hr className="mobile-nav-animator"/>
            <NavLink onClick={menu ? toggleMenu : ""} className={({isActive}) => isActive ? "active-link" : ""} to="projects">
              <p className="mobile-nav-animator">WORK</p>
            </NavLink>
            <hr className="mobile-nav-animator"/>
            <NavLink onClick={menu ? toggleMenu : ""} className={({isActive}) => isActive ? "active-link" : ""} to="contact">
              <p className="mobile-nav-animator">CONTACT</p>
            </NavLink>
          </div>
        </div>
      }
      {menu && windowWidth < 750 ? "" : <div className="outlet"><Outlet/></div>}
    </div>
  )
}



import {Link} from "react-router-dom"

export default function NotFound() {
  return (
    <div>
      <div className="not-found-container">
        <div>
          <div className="not-found-header">
            <h1>404</h1>
          </div>
          <p>Page Not Found</p>
          <Link to="/"><div className="not-found-button">Return Home</div></Link>
        </div>
      </div>
    </div>
  )
}
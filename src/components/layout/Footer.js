import React from 'react'

const Footer = () => {

  return (
      <footer className="container py-5">
          <div className="row">
              <div className="col-12 col-md">
                  <small className="d-block mb-3 text-muted">&copy; 2020 Noam Kanonich</small>
              </div>
              <div className="col-6 col-md">
                  <h5>Noam Kanonich</h5>
                  <p>
                     B.Sc. graduate in Computer Science,<br/>
                     IDC Herzliya
				  </p>
        
              </div>
              <div className="col-6 col-md">
                  <h5>Follow me</h5>
                  <ul className="list-unstyled text-small">
                      <li><a target="_blank" rel="noopener noreferrer" className="text-muted" href="https://www.linkedin.com/in/noam-kanonich-68a368162/">Linkedin</a></li>

                      <li><a className="text-muted" href="https://github.com/noamkanonich">GitHub</a></li>

                  </ul>
              </div>
          </div>
      </footer>
  )
}
export default Footer;
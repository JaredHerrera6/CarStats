import React from 'react'
import {FiLink} from 'react-icons/fi'
import {FaHome} from 'react-icons/fa'
import {FcStatistics,FcAbout} from 'react-icons/fc'
import {GoGitCompare} from 'react-icons/go'
import {GiRank1} from 'react-icons/gi'
import {Link} from 'react-router-dom' 
function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <footer className='footer'>
      <div className="footer-title">
        <FiLink className='fi-Link'/>
        <h2>Useful Links</h2>
      </div>
      <div className="footer-links">
      <ul>
          <li><Link to = '/'>
            <FaHome className='footer-icon'/>
            Home</Link>
          </li>
          <li><Link to = '/carstats'>
            <FcStatistics className='footer-icon' />
            Car Stats</Link>
          </li>
          <li><Link to = '/compare'>
            <GoGitCompare className='footer-icon'/>
            Compare</Link>
          </li>
          <li><Link to = '/rankings'>
            <GiRank1 className='footer-icon'/>
            Rankings</Link>
            </li>
          <li><Link to = '/about'>
            <FcAbout className='footer-icon'/>
            About</Link></li>
        </ul>
      </div>
      <p className='footer-rights'>Copyright &copy; {footerYear} All Rights Reserved</p>
    </footer>
  )
}

export default Footer
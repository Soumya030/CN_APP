import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { Link } from 'react-router-dom'
import { useWidgetContext } from './Context';

const Nav = () => {
  const { setSearchQuery } = useWidgetContext();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    setSearchQuery(query);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">Home &gt; <span className='Dashboard'>DashboardV2</span></Link>
          <form id='nav' className="d-flex" role="search" onSubmit={handleSearch}>
            <div className="input-group" style={{ width: '500px' }}>
              <span className="input-group-text">
                <i className="fas fa-search"></i> 
              </span>
              <input
                className="form-control"
                type="search"
                name="search"
                placeholder="Search anything"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Nav;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLinks from '../Header/HeaderLinks';
import imagine from '../../assets/img/sidebar-4.jpg';
import logo from '../../assets/img/reactlogo.png';

class Sidebar extends Component {
  state = {
    width: window.innerWidth
  };

  activeRoute(routeName) {
    return this.props.location.pathname === routeName ? 'active' : '';
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  handleChildren(value) {
    if (this.state[value] && this.state[value] === true) {
      this.setState({ [value]: false });
    } else {
      this.setState({ [value]: true });
    }
  }

  render() {
    const sidebarBackground = {
      backgroundImage: 'url(' + imagine + ')'
    };

    return (
      <div id="sidebar" className="sidebar" data-color="purple" data-image={imagine}>
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a href="https://frontend-institution.azurewebsites.net" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a href="https://frontend-institution.azurewebsites.net" className="simple-text logo-normal">
            Hectane
          </a>
          <p>Institution Management Suite</p>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {this.props.sideBarData.map((prop, key) => {
              if (!prop.redirect && prop.visible && prop.path != null) {
                return (
                  <li className={this.activeRoute(prop.path)} key={key}>
                    <NavLink to={prop.path} className="nav-link" activeClassName="active">
                      <i className={prop.icon} />
                      <div>{prop.name}</div>
                    </NavLink>
                  </li>
                );
              } else if (!prop.redirect && prop.visible && !prop.path && prop.children.length > 0) {
                return (
                  <li
                    key={key}
                    className={`${this.state[prop.name] ? 'parent open' : 'parent'}`}
                    onClick={e => {
                      if (e.target.innerText !== e.currentTarget.children[2].innerText) {
                        return;
                      }
                      this.handleChildren(prop.name);
                    }}
                  >
                    <span className={this.state[prop.name] ? 'arrow rotate' : 'arrow'} />
                    <i className={prop.icon} />
                    <div>{prop.name}</div>
                    {this.state[prop.name] && (
                      <ul className="nav">
                        {prop.children.map((cprop, ckey) => {
                          if (!cprop.redirect && cprop.visible && cprop.path != null) {
                            return (
                              <li className={this.activeRoute(cprop.path)} key={key + ckey}>
                                <NavLink to={cprop.path} className="nav-link" activeClassName="active">
                                  <i className={cprop.icon} />
                                  <div>{cprop.name}</div>
                                </NavLink>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;

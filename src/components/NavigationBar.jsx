import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';

import STYLES from './section.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

import { colorGray700 } from 'bpk-tokens/tokens/base.es6';

const linkStyle = { color: colorGray700, fontFamily: 'Neuton' };

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
      const { className, ...rest } = this.props;
      const outerClassNameFinal = [];
      if (className) { outerClassNameFinal(className); }

      return (
        <div>
          <Navbar light expand="sm" {...rest}>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle style={linkStyle} nav caret>
                    Articles 📝
                  </DropdownToggle>
                  <DropdownMenu >
                    <NavItem>
                      <NavLink style={linkStyle} href="/articles/vim/">Switching to Vim</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={linkStyle} href="/articles/net-neutrality/">My Take on Net Neutrality</NavLink>
                    </NavItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle style={linkStyle} nav caret>
                    Travel ✈️
                  </DropdownToggle>
                  <DropdownMenu >
                    <NavItem>
                      <NavLink style={linkStyle} href="/travel/iceland-2018/">Iceland</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={linkStyle} href="/travel/longleat-2017/">Longleat</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={linkStyle} href="/travel/munich-2017/">Munich</NavLink>
                    </NavItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle style={linkStyle} nav caret>
                    Documents
                  </DropdownToggle>
                  <DropdownMenu >
                    <NavItem>
                      <NavLink style={linkStyle} href="/documents/degree/">Degree Certificate</NavLink>
                    </NavItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle style={linkStyle} nav caret>
                    Other stuff 🤷‍♂️
                  </DropdownToggle>
                  <DropdownMenu >
                    <NavItem>
                      <NavLink style={linkStyle} href="/about">About me</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={linkStyle} href="/contact">Contact</NavLink>
                    </NavItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
}

NavigationBar.propTypes = {
  className: PropTypes.string,
};

NavigationBar.defaultProps = {
  className: null,
};

export default NavigationBar;

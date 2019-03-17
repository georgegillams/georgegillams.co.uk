import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qr-svg';

import './ticket.scss';
import 'containers/pages.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, email, ticket, ...rest } = this.props;

    const outerClassNameFinal = ['ticket__outer'];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const ticketValue = JSON.stringify(ticket)
      .split('"')
      .join("'");
    // const imageUrl = `https://qrcode.online/img/?type=text&size=10&data=${ticketValue}`;

    return (
      <div>
        <span>{`Email: ${email}`}</span>
        <br />
        <br />
        <QRCode
          className="ticket__qr"
          bgColor="#FFFFFF"
          fgColor="#1e1e1e"
          level="Q"
          value={ticketValue}
        />
      </div>
    );
  }
}

Ticket.propTypes = {
  email: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Ticket.defaultProps = {
  className: null,
};

export default Ticket;

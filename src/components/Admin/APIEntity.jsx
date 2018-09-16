import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, Section } from '../';

class APIEntity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entityType, entity } = this.props;
    const { id, timestamp, deleted, authorId } = entity;

    return (
      <Section name={`${entityType || 'Entity'} ${id}`}>
        {`Created ${timestamp}`}
        <br />
        {`Deleted ${deleted}`}
        <br />
        {`Created by ${authorId}`}
      </Section>
    );
  }
}

APIEntity.propTypes = {
  entity: PropTypes.object.isRequired,
  entityType: PropTypes.String,
};

APIEntity.defaultProps = {
  entityType: null,
};

export default APIEntity;

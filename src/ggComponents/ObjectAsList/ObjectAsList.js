import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ObjectAsList = props => {
  const { name, value, depth, ...rest } = props;

  const [expanded, setExpanded] = useState(false);

  if (value && typeof value === 'object') {
    return (
      <>
        <div
          style={{ marginLeft: `${depth}rem` }}
          role="button"
          tabIndex={0}
          onClick={() => {
            setExpanded(!expanded);
          }}
          onKeyPress={() => {
            setExpanded(!expanded);
          }}
          {...rest}>{`${expanded ? '🔽' : '▶️'} ${name || 'top-level'}:`}</div>
        {expanded && Object.keys(value).map(k => <ObjectAsList key={k} name={k} value={value[k]} depth={depth + 1} />)}
      </>
    );
  }

  return <div style={{ marginLeft: `${depth}rem` }} {...rest}>{`${name}: ${value}`}</div>;
};

ObjectAsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  name: PropTypes.string,
  depth: PropTypes.number,
};

ObjectAsList.defaultProps = {
  depth: 0,
  name: null,
};

export default ObjectAsList;

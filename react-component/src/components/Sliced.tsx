import React, { useState } from 'react';

const Sliced = ({ text, maxLength }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const displayText = expanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <span>
      {displayText}{' '}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
          padding: 0,
        }}
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
};

export default Sliced;

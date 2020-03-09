import React, { useState } from 'react';
import { Link } from '@reach/router';
import { css, keyframes } from '@emotion/core';
import colors from './colors';

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

const NavBar = () => {
  return (
    <header
      css={css`
        background-color: ${colors.secondary};
        padding: 15px;
      `}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        css={css`
          animation: 2s ${spin} linear infinite;
          display: inline-block;
          font-size: 60px;

          &:hover {
            text-decoration: underline;
          }
        `}
        role="img"
        aria-label="logo"
      >
        🐶
      </span>
    </header>
  );
};

export default NavBar;

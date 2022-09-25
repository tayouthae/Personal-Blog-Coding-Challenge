import React, { FC } from 'react';
import { Container } from 'reactstrap';

export const Footer: FC = () => (
  <Container fluid className="text-center p-3 m-0" style={{ backgroundColor: '#ecf0f1 ' }}>
    &copy; {new Date().getFullYear()} Copyright:{' '}
    <a className="text-dark" href="https://tayouthmalla.com.np/" target="_blank" rel="noreferrer">
      Tayouth Malla
    </a>
  </Container>
);

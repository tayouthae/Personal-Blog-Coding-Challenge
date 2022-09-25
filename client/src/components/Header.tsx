import React, { ReactNode, FC } from 'react';
import { Col, Container, Row } from 'reactstrap';

export interface IHeaderProps {
  height?: string;
  image?: string;
  title: string;
  // eslint-disable-next-line no-undef, react/require-default-props
  children?: ReactNode | string;
}

export const Header: FC<IHeaderProps> = (props) => {
  const { children, height, image, title } = props;

  const headerStyle = {
    background: `linear-gradient(rgba(36, 20, 38, 0.5), rgba(36, 39, 38, 0.5)), url(${image}) no-repeat center center`,
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    OBackgroundSize: 'cover',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height,
  };

  return (
    <header style={headerStyle}>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className="display-4 text-white m-5">{title}</h1>
            {children}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

Header.defaultProps = {
  height: '100%',
  image:
    'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
};

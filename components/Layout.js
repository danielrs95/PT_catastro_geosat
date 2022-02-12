import React from 'react';
import { Row, Col } from 'antd';

const MainContainer = ({ children }) => {
  return (
    <>
      <Row>
        <Col span={24}>{children}</Col>
      </Row>
    </>
  );
};

export default MainContainer;

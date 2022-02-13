import Head from 'next/head';
import TableAnt from '../components/TableAnt';
import Link from 'next/link';

import { Button, Layout } from 'antd';
import { Row, Col } from 'antd';
import { wrapper } from '../redux/store';
import { connect, useDispatch, useSelector } from 'react-redux';
import { listPredios } from '../redux/action/prediosActions';
import { bindActionCreators } from 'redux';
import React from 'react';

const { Header, Footer, Content } = Layout;

const Home = ({ predios }) => {
  // we can use hooks or connect
  // const { predios } = useSelector((state) => state);
  // console.log(predios);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <Row justify='center'>
        <Col xs={18}>
          <Header></Header>
          <Content>
            <Link href='/predios/new/'>
              <a>Nuevo predio</a>
            </Link>
            <p>Tabla for catastros</p>
            <TableAnt data={predios} />
          </Content>

          <Footer>Footer</Footer>
        </Col>
      </Row>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      console.log('2. Page.getStaticProps uses the store to dispatch things');
      await store.dispatch(listPredios());
    }
);

const mapStateToProps = (state) => {
  return {
    predios: state.prediosList.predios,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     listPredios: bindActionCreators(listPredios, dispatch),
//   };
// };

export default connect(mapStateToProps, null)(Home);

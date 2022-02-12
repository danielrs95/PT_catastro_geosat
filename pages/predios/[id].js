import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  listPredioDetails,
  updatePredio,
} from '../../redux/action/prediosActions';
import { wrapper } from '../../redux/store';

const Edit = ({ predio, dispatch }) => {
  const onFinish = (values) => {
    // console.log('Success:', values);

    let updatedPredio = {
      ...predio,
      nombre: values.nombre,
      precio: values.precio,
      departamento: values.departamento,
      municipio: values.municipio,
      propietario: values.propietario,
      construcciones: values.construcciones,
      terreno: values.terreno,
    };
    // console.log(updatedPredio);

    dispatch(updatePredio(updatedPredio));

    // update(updatedPredio);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        nombre: predio.nombre,
        precio: predio.precio,
        departamento: predio.departamento,
        municipio: predio.municipio,
        propietario: predio.propietario,
        construcciones: predio.construcciones,
        terreno: predio.terreno,
      }}
      autoComplete='off'
    >
      <Form.Item
        label='Nombre'
        name='nombre'
        rules={[
          {
            required: true,
            message: 'Ingrese un nombre',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Precio'
        name='precio'
        rules={[
          {
            required: true,
            message: 'Ingrese un precio',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Departamento'
        name='departamento'
        rules={[
          {
            required: true,
            message: 'Ingrese un departamento',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Municipio'
        name='municipio'
        rules={[
          {
            required: true,
            message: 'Ingrese un municipio',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario'
        name='propietario'
        rules={[
          {
            required: true,
            message: 'Ingrese un propietario',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Construcciones'
        name='construcciones'
        rules={[
          {
            required: true,
            message: 'Ingrese un construcciones',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Terreno'
        name='terreno'
        rules={[
          {
            required: true,
            message: 'Ingrese un terreno',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>

        <Button type='link' href='/'>
          Volver
        </Button>
      </Form.Item>
    </Form>
  );
};

export const getStaticPaths = async () => {
  const { data } = await axios.get('http://localhost:3000/api/predios/'); // your database query or fetch to remote API

  // console.log(data);
  // generate the paths
  const paths = data.map((predio) => ({
    params: { id: JSON.stringify(predio.id) }, // keep in mind if post.id is a number you need to stringify post.id
  }));

  // Structure for getStaticPaths
  // const paths = [{ params: { id: '5' } }];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps((store) =>
  // We destructure from context preview & params
  async ({ preview, params }) => {
    console.log('2. Page.getStaticProps uses the store to dispatch things');
    console.log(params);
    await store.dispatch(listPredioDetails(params.id));
  }
);

const mapStateToProps = (state) => {
  return {
    predio: state.predioDetails.predio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: bindActionCreators(updatePredio, dispatch),
  };
};

export default connect(mapStateToProps, null)(Edit);

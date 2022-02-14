import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deletePredio,
  listPredioDetails,
  updatePredio,
} from '../../redux/action/prediosActions';
import { wrapper } from '../../redux/store';

const Edit = ({ predio, dispatch }) => {
  console.log('console log predio desde editar', predio);
  const router = useRouter();

  const onFinish = (values) => {
    console.log('DESDE CLIENTE', predio);

    let updatedPredio = {
      ...predio,
      nombre: values.nombre,
      precio: values.precio,
      departamento: values.departamento,
      municipio: values.municipio,
      c_pisos: values.c_pisos,
      c_area: values.c_area,
      c_tipo: values.c_tipo,
      c_direccion: values.c_direccion,
      p_direccion: values.p_direccion,
      p_telefono: values.p_telefono,
      p_email: values.p_email,
      p_tipo: values.p_tipo,
      t_area: values.t_area,
      t_precio: values.t_precio,
      t_tipo: values.t_tipo,
    };
    console.log('Predio enviado a editar', updatedPredio);

    dispatch(updatePredio(updatedPredio));
    router.push('/');
  };

  const onDeletedHandler = (predio) => {
    dispatch(deletePredio(predio));
    router.push('/');
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        nombre: predio.nombre,
        precio: predio.precio,
        departamento: predio.departamento,
        municipio: predio.municipio,
        c_pisos: predio.c_pisos,
        c_area: predio.c_area,
        c_tipo: predio.c_tipo,
        c_direccion: predio.c_direccion,
        p_direccion: predio.p_direccion,
        p_telefono: predio.p_telefono,
        p_email: predio.p_email,
        p_tipo: predio.p_tipo,
        t_area: predio.t_area,
        t_precio: predio.t_precio,
        t_tipo: predio.t_tipo,
      }}
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 5,
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
        label='Propietario Direccion'
        name='p_direccion'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario Telefono'
        name='p_telefono'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario Email'
        name='p_email'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario Tipo'
        name='p_tipo'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Terreno Area'
        name='t_area'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Terreno precio'
        name='t_precio'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Terreno tipo'
        name='t_tipo'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Construccion pisos'
        name='c_pisos'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Construccion area'
        name='c_area'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Construccion tipo'
        name='c_tipo'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Construccion direccion'
        name='c_direccion'
        rules={[{ message: 'Ingrese un construcciones' }]}
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

        <Link href='/'>
          <a>Regresar</a>
        </Link>

        <Button
          type='primary'
          danger='true'
          onClick={() => onDeletedHandler(predio)}
        >
          Delete
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updatePredio: bindActionCreators(updatePredio, dispatch),
//   };
// };

export default connect(mapStateToProps, null)(Edit);

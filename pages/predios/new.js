import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPredio } from '../../redux/action/prediosActions';
import { wrapper } from '../../redux/store';

const New = ({ predio, dispatch }) => {
  const router = useRouter();

  const onFinish = (values) => {
    let newPredio = {
      t_area: values.t_area,
      t_precio: values.t_precio,
      t_tipo: values.t_tipo,
      p_direccion: values.propietario_direccion,
      p_telefono: values.propietario_telefono,
      p_email: values.propietario_email,
      p_tipo: values.propietario_direccion,
      nombre: values.nombre,
      precio: values.precio,
      departamento: values.departamento,
      municipio: values.municipio,
    };

    console.log('Log desde new.js', newPredio);

    dispatch(createPredio(newPredio));
    router.push('/');
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
        name='propietario_direccion'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario Telefono'
        name='propietario_telefono'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario Email'
        name='propietario_email'
        rules={[{ message: 'Ingrese un propietario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Propietario Tipo'
        name='propietario_tipo'
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

      {/* <Form.Item
        label='Construcciones Direccion'
        name='construccion_direccion'
        rules={[{ message: 'Ingrese un construcciones' }]}
      >
        <Input />
      </Form.Item> */}

      {/* <Form.Item
        label='Terreno'
        name='terreno'
        rules={[
          {
            // required: true,
            message: 'Ingrese un terreno',
          },
        ]}
      >
        <Input />
      </Form.Item> */}

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
      </Form.Item>
    </Form>
  );
};

export default connect()(New);

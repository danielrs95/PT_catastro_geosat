import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listPredioDetails } from '../../redux/action/prediosActions';
import { wrapper } from '../../redux/store';

const Edit = ({ predio }) => {
  // console.log(predio);
  // const [form] = Form.useForm();

  // form.setFields({
  //   nombre: predio.name,
  // });

  // useEffect(() => {
  //   form.resetFields();

  //   form.setFieldsValue({
  //     nombre: predio.nombre,
  //   });
  // }, []);

  // return (
  //   <Form form={form} name='edit_data_form'>
  //     <Form.Item name='nombre'>
  //       <Input />
  //     </Form.Item>

  //     <Form.Item name='precio'>
  //       <Input />
  //     </Form.Item>

  //     <Form.Item>
  //       <Button
  //         className='button'
  //         type='primary'
  //         htmlType='submit'
  //         disabled={
  //           form.getFieldsError().filter(({ errors }) => errors.length).length
  //         }
  //       >
  //         Submit
  //       </Button>
  //     </Form.Item>
  //   </Form>
  // );

  return (
    <Form
      // name='basic'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        // nombre: 'test',
        nombre: predio.nombre,
        precio: 'test',
      }}
      autoComplete='off'
    >
      <Form.Item
        label='Nombre'
        name='nombre'
        // initialValue={predio.name}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        // value='test'
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Precio'
        name='precio'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
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
      </Form.Item>
    </Form>
  );
};

// export const getStaticPaths = async () => {
//    const posts = await // your database query or fetch to remote API

//    // generate the paths
//    const paths = posts.map(post => ({
//         params: { id: post.id } // keep in mind if post.id is a number you need to stringify post.id
//       })
//    );

//    return {
//       paths,
//       fallback: true
//    }

//  }

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
    predio: state.predioDetails,
  };
};

export default connect(mapStateToProps, null)(Edit);

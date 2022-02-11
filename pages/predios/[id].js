import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import { connect } from 'react-redux';
import { listPredioDetails } from '../../redux/action/prediosActions';
import { wrapper } from '../../redux/store';

const Edit = ({ predio }) => {
  console.log(predio);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      Edita catastro
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Nombre'
          name='name'
          initialValue={predio.name}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
          value='test'
        >
          <Input value='test' />
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
          <Input.Password />
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
    </div>
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
  //  const posts = await // your database query or fetch to remote API

  // generate the paths
  // const paths = posts.map((post) => ({
  //   params: { id: '5' }, // keep in mind if post.id is a number you need to stringify post.id
  // }));

  // Structure for getStaticPaths
  const paths = [{ params: { id: '5' } }];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      console.log('2. Page.getStaticProps uses the store to dispatch things');
      await store.dispatch(listPredioDetails('5'));
    }
);

const mapStateToProps = (state) => {
  return {
    predio: state.predioDetails,
  };
};

export default connect(mapStateToProps, null)(Edit);

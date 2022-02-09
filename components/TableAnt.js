import { Table, Tag, Space } from 'antd';
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Precio',
    dataIndex: 'precio',
    key: 'precio',
  },
  {
    title: 'Departamento',
    dataIndex: 'Departamento',
    key: 'Departamento',
  },
  {
    title: 'municipio',
    key: 'municipio',
    dataIndex: 'municipio',
  },
  {
    title: 'propietario',
    key: 'propietario',
    dataIndex: 'propietario',
  },
  {
    title: 'construcciones',
    key: 'construcciones',
    dataIndex: 'construcciones',
  },
  {
    title: 'terreno',
    key: 'terreno',
    dataIndex: 'terreno',
  },
  {
    title: 'created_on',
    key: 'created_on',
    dataIndex: 'created_on',
  },
];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const TableAnt = ({ data }) => {
  console.log(data);
  return <Table columns={columns} dataSource={data} />;
};

export default TableAnt;

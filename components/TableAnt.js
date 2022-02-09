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
  // {
  //   title: 'created_on',
  //   key: 'created_on',
  //   dataIndex: 'created_on',
  // },
];

const TableAnt = ({ data }) => {
  console.log(data);
  return <Table columns={columns} dataSource={data} />;
};

export default TableAnt;

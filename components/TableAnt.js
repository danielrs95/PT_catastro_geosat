import { Table, Tag, Space } from 'antd';
import Link from 'next/link';
const columns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   key: 'id',
  // },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text, record) => (
      <Link href={'predios/' + record.id}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: 'Precio',
    dataIndex: 'precio',
    key: 'precio',
  },
  {
    title: 'Departamento',
    dataIndex: 'departamento',
    key: 'departamento',
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
];

const TableAnt = ({ data }) => {
  // console.log(data);
  return <Table columns={columns} dataSource={data} />;
};

export default TableAnt;

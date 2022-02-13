import { Table, Tag, Space } from 'antd';
import Link from 'next/link';
const columns = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text, predio) => (
      <Link href={'/predios/' + predio.id}>
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
  return <Table rowKey='id' columns={columns} dataSource={data} />;
};

export default TableAnt;

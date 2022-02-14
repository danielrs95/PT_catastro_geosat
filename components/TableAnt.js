import { Table, Tag, Space } from 'antd';
import Link from 'next/link';
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'pid',
    dataIndex: 'pid',
    key: 'pid',
  },
  {
    title: 'tid',
    dataIndex: 'tid',
    key: 'tid',
  },
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
    title: 'p_direccion',
    key: 'p_direccion',
    dataIndex: 'p_direccion',
  },
  {
    title: 'p_telefono',
    key: 'p_telefono',
    dataIndex: 'p_telefono',
  },
  {
    title: 'p_email',
    key: 'p_email',
    dataIndex: 'p_email',
  },
  {
    title: 'p_tipo',
    key: 'p_tipo',
    dataIndex: 'p_tipo',
  },
  {
    title: 't_area',
    key: 't_area',
    dataIndex: 't_area',
  },
  {
    title: 't_precio',
    key: 't_precio',
    dataIndex: 't_precio',
  },
  {
    title: 't_tipo',
    key: 't_tipo',
    dataIndex: 't_tipo',
  },
  {
    title: 'c_pisos',
    key: 'c_pisos',
    dataIndex: 'c_pisos',
  },
  {
    title: 'c_area',
    key: 'c_area',
    dataIndex: 'c_area',
  },
  {
    title: 'c_tipo',
    key: 'c_tipo',
    dataIndex: 'c_tipo',
  },
  {
    title: 'c_direccion',
    key: 'c_direccion',
    dataIndex: 'c_direccion',
  },
];

const TableAnt = ({ data }) => {
  return (
    <Table
      rowKey={data.id}
      columns={columns}
      dataSource={data}
      size='small'
      bordered
    />
  );
};

export default TableAnt;

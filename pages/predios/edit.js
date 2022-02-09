import Link from 'next/link';

const edit = () => {
  return (
    <div>
      Edita catastro
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  );
};

export default edit;

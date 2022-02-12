// import '../styles/globals.css';
import 'antd/dist/antd.css';
import MainContainer from '../components/Layout';
import { wrapper } from '../redux/store';

function WrappedApp({ Component, pageProps }) {
  return (
    <MainContainer>
      <Component {...pageProps} />
    </MainContainer>
  );
}

export default wrapper.withRedux(WrappedApp);

// import '../styles/globals.css';
import 'antd/dist/antd.css';
import { wrapper } from '../redux/store';

function WrappedApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(WrappedApp);

import React from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import PropTypes from 'prop-types';
import GlobalStyle from '../components/shared/globalstyle';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>비드잇</title>
        <meta property="keywords" content="구슬 만들기, 지식 공유" />
        <meta
          property="description"
          content="가치 있고 연관성 있는 여러 웹페이지 링크를 모아서 한 번에 전달할 수 있음"
        />
        <meta property="og:title" content="bead it!" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="620" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.oneofType([PropTypes.func, PropTypes.object]).isRequired,
};

export default MyApp;

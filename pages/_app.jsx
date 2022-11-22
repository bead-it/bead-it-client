import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import PropTypes from 'prop-types';

import GlobalStyle from '../components/styles/globalstyle';
import RefreshUser from '../components/refreshuser';
import throttle from '../utils/throttle';

function MyApp({ Component, pageProps }) {
  const [refreshUserToggle, setRefreshUserToggle] = useState(false);

  useEffect(() => {
    if (refreshUserToggle) {
      setRefreshUserToggle(false);
    }
  }, [refreshUserToggle]);

  useEffect(() => {
    const doIntervalRefresh = () => {
      setRefreshUserToggle(true);

      setTimeout(doIntervalRefresh, 1800000);
    };

    doIntervalRefresh();
  }, []);

  const refreshHandler = () => {
    throttle(() => {
      setRefreshUserToggle(true);
    }, 600000);
  };

  return (
    <GlobalEvent onMouseMove={refreshHandler}>
      <RecoilRoot>
        <Head>
          <title>비딧</title>
          <meta property="keywords" content="구슬 만들기, 지식 공유" />
          <meta
            property="description"
            content="가치 있고 연관성 있는 여러 웹페이지 링크를 모아서 한 번에 전달할 수 있음"
          />
          <meta
            property="og:title"
            content="bead it! 연결된 웹 페이지들의 모음"
          />
          <meta
            property="og:description"
            content="웹 페이지를 모아 하나의 보물을 만드세요. 하나의 주소에 모아 전달하세요~!"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="620" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
        {refreshUserToggle && <RefreshUser />}
      </RecoilRoot>
    </GlobalEvent>
  );
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

const GlobalEvent = styled.div``;

export default MyApp;

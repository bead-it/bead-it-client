import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AiOutlineExpandAlt as ExpandIcon,
  AiOutlineShrink as ShrinkIcon,
  AiOutlineExport as ExternalTabIcon,
  AiFillCaretLeft as GoBackwardIcon,
  AiFillCaretRight as GoForwardIcon,
} from 'react-icons/ai';

import getPageData from '../../service/pageapi';
import apiErrorHandler from '../../service/apierrorhandler';
import replaceRefs from '../../utils/previewpage/replacerefs';
import findUrlToGo from '../../utils/previewpage/findurltogo';

import {
  currentBeadIdAtom,
  currentSrcAtom,
  webViewModalAtom,
  srcHistoryAtom,
} from '../../recoilstore/atoms';
import { beadsMapSel } from '../../recoilstore/seletors';

export default function WebViewModal() {
  const router = useRouter();

  const [src, setSrc] = useRecoilState(currentSrcAtom);
  const [srcHistory, setSrcHistory] = useRecoilState(srcHistoryAtom);

  const modalOpen = useRecoilValue(webViewModalAtom);
  const beadId = useRecoilValue(currentBeadIdAtom);
  const beadsMap = useRecoilValue(beadsMapSel);

  const [largeModal, setLargeModal] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [injectedHtml, setInjectedHtml] = useState('no data');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchPortal, setSearchPortal] = useState('google');
  const [searchPrefix, setSearchPrefix] = useState('');

  let selectedBeadData;

  useEffect(() => {
    if (beadId) {
      selectedBeadData = beadsMap[beadId];
      setSrc(selectedBeadData.page.url);
      setSrcHistory({
        pos: 0,
        stack: [selectedBeadData.page.url],
      });
    }
    setSearchKeyword('');
    setSearchPortal('google');
  }, [beadId]);

  useEffect(() => {
    if (src) {
      setAddressValue(src);
    }
  }, [src]);

  useEffect(() => {
    if (src) {
      (async () => {
        const originalHtml = await apiErrorHandler(
          async () => {
            const response = await getPageData(src);
            return response;
          },
          errorResult => {
            window.alert(errorResult.message);
            return null;
          },
          { router },
        );

        if (!originalHtml) {
          return;
        }

        const protocol = src.split(':')[0];
        const domain = src.split('/')[2];
        const html = replaceRefs(originalHtml, domain, protocol);

        setInjectedHtml(html);
      })();
    }
  }, [src]);

  // useEffect(() => {
  //   if (injectedHtml) {
  //     const upperShadow = document.querySelector('.webframe');
  //     const shadowRoot = document.createElement('div');
  //     const shadow = shadowRoot.attachShadow({ mode: 'open' });

  //     shadow.innerHTML = injectedHtml;

  //     upperShadow.replaceChildren(shadowRoot);
  //   }
  // }, [injectedHtml]);

  useEffect(() => {
    const documents = document.querySelectorAll('a');
    const callback = e => {
      e.preventDefault();
      const newUrl = findUrlToGo(e);
      setSrc(newUrl);
      setSrcHistory(prev => {
        const newPos = prev.pos + 1;
        const newStack = [...prev.stack];
        newStack[newPos] = newUrl;

        return {
          pos: newPos,
          stack: newStack.slice(0, newPos + 1),
        };
      });
    };

    documents.forEach(doc => doc.addEventListener('click', callback));

    return () => {
      documents.forEach(doc => {
        doc.removeEventListener('click', callback);
      });
    };
  }, [injectedHtml]);

  useEffect(() => {
    if (searchPortal === 'google') {
      setSearchPrefix('https://google.com/search?q=');
    } else if (searchPortal === 'naver') {
      setSearchPrefix('https://search.naver.com/search.naver?query=');
    }
  }, [searchPortal]);

  const expandModal = e => {
    e.stopPropagation();
    setLargeModal(true);
  };
  const shrinkModal = e => {
    e.stopPropagation();
    setLargeModal(false);
  };

  const openNewTab = () => {
    window.open(src, '_blank');
  };

  const editSrc = e => {
    if (e.key === 'Enter') {
      setSrc(e.target.value);
      setSrcHistory(prev => {
        const newPos = prev.pos + 1;
        const newStack = [...prev.stack];
        newStack[newPos] = e.target.value;

        return {
          pos: newPos,
          stack: newStack.slice(0, newPos + 1),
        };
      });
    }
  };

  const goBackwardButtonHandler = e => {
    e.stopPropagation();
    if (srcHistory.pos > 0) {
      setSrc(srcHistory.stack[srcHistory.pos - 1]);
      setSrcHistory(prev => {
        return {
          ...prev,
          pos: prev.pos - 1,
        };
      });
    }
  };

  const goForwardButtonHandler = e => {
    e.stopPropagation();
    if (srcHistory.stack[srcHistory.pos + 1]) {
      setSrc(srcHistory.stack[srcHistory.pos + 1]);
      setSrcHistory(prev => {
        return {
          ...prev,
          pos: prev.pos + 1,
        };
      });
    }
  };

  const searchEnterkeyHandler = e => {
    if (e.key === 'Enter') {
      const targetUrl = searchPrefix + e.target.value.replaceAll(' ', '+');
      setSrc(targetUrl);
      setSrcHistory(prev => {
        const newPos = prev.pos + 1;
        const newStack = [...prev.stack];
        newStack[newPos] = targetUrl;

        return {
          pos: newPos,
          stack: newStack.slice(0, newPos + 1),
        };
      });
    }
  };

  const searchButtonHandler = e => {
    e.stopPropagation();
    const targetUrl =
      searchPrefix + e.target.previousElementSibling.value.replaceAll(' ', '+');
    setSrc(targetUrl);
    setSrcHistory(prev => {
      const newPos = prev.pos + 1;
      const newStack = [...prev.stack];
      newStack[newPos] = targetUrl;

      return {
        pos: newPos,
        stack: newStack.slice(0, newPos + 1),
      };
    });
  };

  return (
    <Wrapper
      modalOpen={modalOpen}
      largeModal={largeModal}
      onClick={e => e.stopPropagation()}
    >
      <TopRow>
        {largeModal ? (
          <ShrinkIcon size={24} className="icon" onClick={shrinkModal} />
        ) : (
          <ExpandIcon size={24} className="icon" onClick={expandModal} />
        )}
        <Address
          onKeyDown={editSrc}
          value={addressValue}
          onChange={e => setAddressValue(e.target.value)}
        />
        <ExternalTabIcon size={24} className="icon" onClick={openNewTab} />
      </TopRow>
      <SecondRow>
        <HistoryButtons>
          <GoBackwardIcon size={24} onClick={goBackwardButtonHandler} />
          <GoForwardIcon size={24} onClick={goForwardButtonHandler} />
        </HistoryButtons>
        <SearchBox>
          <select
            value={searchPortal}
            onChange={e => setSearchPortal(e.target.value)}
          >
            <option>google</option>
            <option>naver</option>
          </select>
          <SearchInput
            onKeyDown={searchEnterkeyHandler}
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
          <SubmitButton onClick={searchButtonHandler}>search</SubmitButton>
        </SearchBox>
      </SecondRow>
      {modalOpen && (
        <Webframe dangerouslySetInnerHTML={{ __html: injectedHtml }} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${props => (props.largeModal ? '98vw' : '60vw')};
  position: absolute;

  right: 1vw;
  top: 100px;
  bottom: 20px;

  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: gray;

  @media (max-width: 767px) {
    width: 98vw;
    height: 90vh;

    top: 105vh;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;

  .icon {
    width: 5%;
  }
`;

const Address = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 90%;

  text-align: center;
  border: 1px solid black;
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
`;

const HistoryButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 45%;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  width: 45%;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 5%;
`;

const SubmitButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
`;

const Webframe = styled.div`
  position: relative;

  width: 100%;
  height: 90%;
  max-height: 90%;

  background-color: white;

  overflow-y: scroll;
  object-fit: contain;

  transform: translateZ(0);
`;

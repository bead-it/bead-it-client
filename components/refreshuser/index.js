import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { tokenInfo } from '../../recoilstore/atoms';
import refreshUser from '../../utils/refreshuser';

export default function RefreshUser() {
  const [newToken, setNewToken] = useRecoilState(tokenInfo);

  useEffect(() => {
    refreshUser(setNewToken);
  }, [newToken]);

  return null;
}

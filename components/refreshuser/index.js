import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { token } from '../../recoilstore/atoms';
import refreshUser from '../../utils/refreshuser';

export default function RefreshUser() {
  const [newToken, setNewToken] = useRecoilState(token);

  useEffect(() => {
    refreshUser(setNewToken);
  }, [newToken]);

  return null;
}

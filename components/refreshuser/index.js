import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { tokenInfoAtom } from '../../recoilstore/atoms';

import refreshUser from '../../utils/authutil/refreshuser';

export default function RefreshUser() {
  const [newToken, setNewToken] = useRecoilState(tokenInfoAtom);

  useEffect(() => {
    refreshUser(setNewToken);
  }, [newToken]);

  return null;
}

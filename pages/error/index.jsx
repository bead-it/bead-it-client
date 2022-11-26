import React from 'react';
import { useRouter } from 'next/router';

import Error from 'next/error';

export default function ErrorDirector() {
  const router = useRouter();
  const { errorStatus } = router.query;

  return <Error statusCode={errorStatus} />;
}

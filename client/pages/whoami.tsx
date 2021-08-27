import { useEffect } from 'react';
import axios from 'axios';

function whoami() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/auth/whoami`, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  });

  return <div></div>;
}

export default whoami;

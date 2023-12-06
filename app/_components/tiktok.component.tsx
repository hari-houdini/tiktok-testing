'use client';

import { redirect } from 'next/navigation';

export const TikTok = () => {
  const authorizeTikTokAccount = async () => {
    try {
      // const res = await fetch(`/api/authorize`, {
      //   method: 'POST',
      // });

      // const jwtToken = await res.json();
      // return jwtToken;
      const csrfState = Math.random().toString(36).substring(2);
      // NextResponse.next().cookies.set('csrfState', csrfState, {
      //   maxAge: 60000,
      // });

      const authorizeUrl =
        'https://www.tiktok.com/v2/auth/authorize/';

      // the following params need to be in `application/x-www-form-urlencoded` format.

      const urlSearchParams = new URLSearchParams({
        client_key: `${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}`,
        scope: 'user.info.basic',
        response_type: 'code',
        redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT_REDIRECT}`,
        state: `${csrfState}`,
      });

      const redirectUrl = new URL(
        `${authorizeUrl}?${urlSearchParams}`
      ).toString();

      console.log({ redirectUrl });

      return window.location.replace(`${redirectUrl}`);
    } catch (e) {
      throw e;
    }
  };

  return (
    <a onClick={() => authorizeTikTokAccount()}>
      Continue with TikTok
    </a>
  );
};

import { url } from 'inspector';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const csrfState = Math.random().toString(36).substring(2);

  const res = NextResponse.next();

  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT'
  );
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.cookies.set('csrfState', csrfState, {
    maxAge: 60000,
  });

  const authorizeUrl = 'https://www.tiktok.com/v2/auth/authorize/';

  // the following params need to be in `application/x-www-form-urlencoded` format.

  const urlSearchParams = new URLSearchParams({
    client_key: `${process.env.TIKTOK_CLIENT_KEY}`,
    scope: 'user.info.basic',
    response_type: 'code',
    redirect_uri: `${process.env.SERVER_ENDPOINT_REDIRECT}`,
    state: `${csrfState}`,
  });

  const redirectUrl = new URL(`${authorizeUrl}?${urlSearchParams}`);

  console.log({ redirectUrl });

  // return NextResponse.redirect(redirectUrl, {
  //   headers: {
  //     "Access-Control-Allow-Credentials": "true",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods"
  //   }
  // });
};

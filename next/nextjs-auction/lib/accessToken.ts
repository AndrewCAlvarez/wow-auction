interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  sub: string;
}

export async function getAccessToken(): Promise<AccessToken> {
  let accessToken: AccessToken = {
    access_token: "",
    token_type: "",
    expires_in: 0,
    sub: "",
  };
  let clientID = process.env.CLIENT_ID;
  let clientSecret = process.env.CLIENT_SECRET;
  let grantType = process.env.GRANT_TYPE;
  const options = {
    method: "POST",
  };
  const accessTokenURL = `https://oauth.battle.net/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}`;

  try {
    await fetch(accessTokenURL, options)
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined) {
          accessToken = {
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
            sub: data.sub,
          };
          console.log(accessToken);
        }
      });
  } catch (error) {
    console.log(error);
  }
  return accessToken;
}

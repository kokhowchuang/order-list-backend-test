export const variable = {
  development: {
    NAME: "development",
    DOMAIN: "",
    EMAIL: {
      APIKEY: "",
      SENDER: "",
    },
    TWILIO: {
      ACCOUNT_SID: "",
      AUTH_TOKEN: "",
      NUMBER: "",
    },
    DATABASE: {
      NAME: "testmodels",
      USERNAME: "root",
      PASSWORD: "",
    },
    JWT: {
      SECRETKEY: "",
    },
    FACEBOOK: {
      CLIENT_ID: "",
      CLIENT_SECRET: "",
      CALLBACK_URL: "",
    },
  },
  production: {
    NAME: "production",
    DOMAIN: "",
    EMAIL: {
      APIKEY: "",
      SENDER: "",
    },
    TWILIO: {
      ACCOUNT_SID: "",
      AUTH_TOKEN: "",
      NUMBER: "",
    },
    DATABASE: {
      NAME: "",
      USERNAME: "",
      PASSWORD: "",
    },
    JWT: {
      SECRETKEY: "",
    },
    FACEBOOK: {
      CLIENT_ID: "",
      CLIENT_SECRET: "",
      CALLBACK_URL: "",
    },
  },
  staging: {
    NAME: "staging",
    EMAIL: {
      APIKEY: "",
    },
    DATABASE: {
      NAME: "",
      USERNAME: "",
      PASSWORD: "",
    },
    JWT: {
      VERIFYKEY: "",
      DEFAULTKEY: "",
      SIGNKEY: "",
      CHANGEKEY: "",
      INVITEKEY: "",
    },
  },
};

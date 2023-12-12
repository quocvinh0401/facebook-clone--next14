export namespace Configuration {
  export interface Security {
    jwt: {
      secret: string;
    };
  }

  export interface Configure {
    security: Configuration.Security;
  }
}

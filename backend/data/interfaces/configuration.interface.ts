export namespace Configuration {
  export interface Security {
    jwt: {
      secret: string;
    };
  }

  export interface Cloudinary {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  }

  export interface Configure {
    security: Configuration.Security;
    cloudinary: Configuration.Cloudinary;
  }
}

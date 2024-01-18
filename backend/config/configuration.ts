import { Builder } from 'builder-pattern';
import { Configuration } from 'data/interfaces/configuration.interface';

export default () =>
  Builder<Configuration.Configure>()
    .security({
      jwt: { secret: process.env.JWT_SECRET },
    })
    .cloudinary({
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      cloudName: process.env.CLOUDINARY_NAME,
    })
    .build();

import { Builder } from 'builder-pattern';
import { Configuration } from 'data/interfaces/configuration.interface';

export default () =>
  Builder<Configuration.Configure>()
    .security({
      jwt: { secret: process.env.JWT_SECRET },
    })
    .build();

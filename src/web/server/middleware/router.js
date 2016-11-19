import { authenticationController, reactController } from '../controller';

export default function (app) {
  return app
    .use('/user', authenticationController)
    .use('*', reactController);
}

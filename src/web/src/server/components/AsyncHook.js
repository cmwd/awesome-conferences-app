import React from 'react';
import { AsyncActions } from '../../common/lib/server-async-hooks';

type Props = {
  asyncContext: Object,
};

const AsyncHook = Component =>
  ({ asyncContext, ...props } : Props) => (
    <AsyncActions context={asyncContext}>
      <Component {...props} />
    </AsyncActions>
  );

export default AsyncHook;

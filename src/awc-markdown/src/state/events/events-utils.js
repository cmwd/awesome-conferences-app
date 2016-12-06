import isString from 'lodash/isString';

export const validate = {
  uuid(uuid) {
    if (!uuid || !isString(uuid)) {
      throw new Error('Property uuid is missing or incorrect');
    }
  }
};

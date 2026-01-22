export const successResponse = (
  data: any,
  message = 'Success'
) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message = 'Something went wrong',
  errors: any = null
) => {
  return {
    success: false,
    message,
    errors,
  };
};

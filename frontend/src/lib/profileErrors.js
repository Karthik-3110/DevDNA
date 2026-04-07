export function getProfileErrorMessage(error, fallbackMessage) {
  return error.response?.status === 404
    ? "User not found"
    : error.response?.data?.message || error.message || fallbackMessage;
}

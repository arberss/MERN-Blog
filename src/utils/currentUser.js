import jwtDecode from 'jwt-decode';

export const getCurrentUser = () => {
  try {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      if (new Date().getTime() / 1000 > decoded.exp) {
        localStorage.removeItem('token');
        return null;
      }
      return { ...decoded, token };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

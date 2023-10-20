export const generateKey = () => {
  return (
    (Math.random() + 1).toString(36).substring(2) +
    new Date().getTime().toString().slice(0, 10)
  );
};

export default function () {
  return (req, res, next) => {
    const pocket = new Map();

    Object.assign(req, { pocket });
    next(null);
  };
}

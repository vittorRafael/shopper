// eslint-disable-next-line react/prop-types
const Button = ({ text, classes, ...opt }) => {
  return (
    <button className={`${classes} px-5 py-2 rounded-md`} {...opt}>
      {text}
    </button>
  );
};

export default Button;

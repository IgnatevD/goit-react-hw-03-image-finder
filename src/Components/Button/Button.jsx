const Button = ({ newPage }) => {
  return (
    <button type="button" className="Button" onClick={newPage}>
      Загрузить еще
    </button>
  );
};

export default Button;

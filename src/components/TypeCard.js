const TypeCard = ({ type }) => {
  return (
    <>
      <div
        className="typeCard-container"
        style={{
          backgroundImage: `url(${type.typeName}/1.png)`,
        }}
      >
        <div className="typeCard-disc">
          <h1 data-cy="type-name">{type?.typeName}</h1>
          <textarea
            spellCheck="false"
            readOnly
            unselectable="none"
            data-cy="type-disc"
            value={type?.typeDiscription}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default TypeCard;

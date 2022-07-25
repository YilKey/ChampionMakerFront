function TitleLine({ small, big }) {
  return (
    <div className="champions-title">
      <p className="champions-title-small">{small}</p>
      <div className="champions-big-title">
        <p></p>
        <p>{big}</p>
        <p></p>
      </div>
    </div>
  );
}

export default TitleLine;

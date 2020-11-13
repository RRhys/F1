function Controls({
  playing,
  handleFirstLap,
  handleBackLap,
  handlePlay,
  handleForwardLap,
  handleLastLap,
}) {
  return (
    <div className="d-flex flex-row justify-content-center mb-3">
      <Button className="fas fa-fast-backward" onClick={handleFirstLap} />
      <Button className="fas fa-backward" onClick={handleBackLap} />
      <Button
        className={playing ? "fas fa-pause" : "fas fa-play"}
        onClick={handlePlay}
      />
      <Button className="fas fa-forward" onClick={handleForwardLap} />
      <Button className="fas fa-fast-forward" onClick={handleLastLap} />
    </div>
  );
}

const Button = ({ onClick, className }) => {
  return (
    <button className="btn btn-sm btn-dark mr-1" onClick={onClick}>
      <i className={className}></i>
    </button>
  );
};

export default Controls;

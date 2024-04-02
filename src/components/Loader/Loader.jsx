import map from "../../assets/img/map.png";

const Loading = () => {
  return (
    <div className="loader-div flex-col">
      <div>
        <img src={map} alt="Loader" />
      </div>
    </div>
  );
};

export default Loading;

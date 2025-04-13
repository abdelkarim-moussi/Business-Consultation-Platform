export const ExpertCard = ({ tags=[] }) => {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <div>
          <h4>consultant name</h4>
          <h4>domain of expertize</h4>
          <p>experience</p>
        </div>
        <div>
          <div>
            <img src="../assets/images/tag.png" alt="" />
            <div>
              {tags.map((tag) => {
                <p>{tag}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

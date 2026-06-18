export default function InfoBoxContent({ data }) {
  if (!data) return null;

  if (data.type === "stage") return <LineupList items={data.items} />;
  if (data.type === "stand") return <StandList items={data.items} />;
  if (data.type === "area") return <ProgramList items={data.items} />;

  return null;
}

function ProgramList({ items }) {
  return (
    <>
      <ul className="programList">
        {items.map((item) => (
          <li key={item.activity}>
            <div className="programListInfo">
              <div className="programListText">
                <h4>{item.activity}</h4>
                <p>{item.place}</p>
              </div>

              <div className="programListTime">
                <h3>{item.time}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function LineupList({ items }) {
  return (
    <>
      <ul className="lineupList">
        {items.map((item) => (
          <li key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="lineupListInfo">
              <h4>{item.name}</h4>
              <div className="lineupListTime">
                <h3>{item.time}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function StandList({ items }) {
  return (
    <ul className="standList">
      {items.map((item) => (
        <li key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="standListInfo">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

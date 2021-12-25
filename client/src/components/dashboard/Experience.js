import React from "react";
import Moment from "react-moment";

const Experience = ({
  experience: { title, company, from, to, current, _id },
  onClick,
}) => {
  return (
    <tr>
      <td>{company}</td>
      <td className="hide-sm">{title}</td>
      <td className="hide-sm">
        {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {current ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onClick(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Experience;

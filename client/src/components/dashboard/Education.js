import React from "react";
import Moment from "react-moment";

const Education = ({
  education: { school, degree, from, current, to, _id },
  onClick,
}) => {
  return (
    <tr>
      <td>{school}</td>
      <td class="hide-sm">{degree}</td>
      <td class="hide-sm">
        {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {current ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </td>
      <td>
        <button onClick={() => onClick(_id)} class="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Education;

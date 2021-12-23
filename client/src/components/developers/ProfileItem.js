import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={profile.user.avatar} alt="" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status}</p>
        <p>{profile.location}</p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {profile?.skills.slice(0, 5).map((skill, index) => (
          <li className="text-primary" key={index}>
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;

// import React from "react";
// import { Link } from "react-router-dom";

// const ProfileItem = ({
//   user: { _id, avatar, name },
//   status,
//   location,
//   skills,
// }) => {
//   return (
//     <div className="profile bg-light">
//       <img className="round-img" src={avatar} alt="" />
//       <div>
//         <h2>{name}</h2>
//         <p>{status}</p>
//         <p>{location}</p>
//         <Link to={`/profile/${_id}`} className="btn btn-primary">
//           View Profile
//         </Link>
//       </div>

//       <ul>
//         {skills.length > 0 &&
//           skills.slice(0, 5).map((skill, index) => (
//             <li className="text-primary" key={index}>
//               <i className="fas fa-check"></i> {skill}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default ProfileItem;

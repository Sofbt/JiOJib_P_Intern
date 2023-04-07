
import { useLocation } from 'react-router-dom';
import avatarMale from './avatar-male.png';
import avatarFemale from './avatar.png';
import './pdp.css'; 

const Profile = () => {
  const location = useLocation();

  const user = JSON.parse(window.localStorage.getItem("user"));

  const getDefaultAvatar = () => {
    if (user && user.gender === "male") {
      return avatarMale;
    } else {
      return avatarFemale;
    }
  };
  
  return (
    <div className='row'>
         <span className="material-symbols-outlined notification-logo">
notifications
</span>
        <img src="logoB2.png" alt="" className='jiwjiblogo' />
        <img src={getDefaultAvatar()} alt="" />
    </div>
  );
  };  
export default Profile;

import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "../../axios"
import { baseimageUrl, userMatches, userNotifications } from "../../Constants/Constants";
import moment from "moment";

function Notification() {
  const Token = localStorage.getItem('user_id')
  const [notifications, setNotifications] = useState([]);
  const formatTimestamp = (timestamp) => {
    const formattedTimestamp = moment(timestamp).fromNow();
    return formattedTimestamp
  }
  const getNotification = () => {
    axios.get(`${userNotifications}${Token}`)
      .then(response => {
        response.data ? setNotifications(response.data) : setNotifications(null)
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }
  useEffect(() => {
    getNotification()
  }, []);

  useEffect(() => {
    axios.post(userMatches, { "currUser_id": Token })
      .then(response => {
        getNotification();
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div>
      <div className="w-100 h-20 flex justify-center items-center border-b-4">
        <Header title="Notification" subtitle="" />
      </div>
      <div className="md:px-28 w-100 text-black  ">
        {notifications ? (
          <ul>
            {(notifications.map(notification => (
              <li key={notification.id}>
                <div className="flex cursor-pointer justify-between bg-[#c1c0ec] rounded-3xl m-2 md:m-10 px-2 md:px-10 h-20 items-center">
                  {/* Render notification details */}
                  <div className="flex items-center">
                    <div className="w-[30px] h-[30px] flex items-center rounded-xl">
                      <img className="w-100 h-100 rounded-2xl" src={`${baseimageUrl}${notification.sender.image}`} alt="" />
                    </div>
                    <div className="flex items-center px-3">
                    <p className="md:text-lg">{notification.message}.</p>
                    </div>
                  </div>
                  <p className="md:text-base">{formatTimestamp(notification.timestamp)}</p>
                </div>
              </li>
            )))}
          </ul>
        ) : (
          <div className="flex h-96 justify-center items-center">
            <p className="bg-[#c1c0ec] rounded-2xl px-2 text-3xl font-bold">You have no Notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notification;
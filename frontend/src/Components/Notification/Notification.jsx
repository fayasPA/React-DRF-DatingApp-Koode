import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "../../axios"
import { baseimageUrl, userMatches, userNotifications } from "../../Constants/Constants";
import moment from "moment";
import SocketContext from '../../Context/SocketContext'

function Notification() {

  const notification_socket = useContext(SocketContext)
  useEffect(() => {
    console.log("notification_socket", notification_socket)
  }, [notification_socket])

  const Token = localStorage.getItem('user_id')
  const [notifications, setNotifications] = useState([]);
  const [oldNotifications, setOldNotifications] = useState([]);
  const [whichNot, setWhichNot] = useState('new');
  const formatTimestamp = (timestamp) => {
    const formattedTimestamp = moment(timestamp).fromNow();
    return formattedTimestamp
  }
  const getNotification = () => {
    axios.get(`${userNotifications}${Token}`)
      .then(response => {
        response.data.notifications ? setNotifications(response.data.notifications) : setNotifications(null)
        response.data ? setOldNotifications(response.data.old_notifications) : setOldNotifications(null)
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }

  useEffect(() => {
    axios.post(userMatches, { "currUser_id": Token })
      .then(response => {
        getNotification();
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  const oldNotBtn = () => {
    setWhichNot('old');
  }
  const newNotBtn = () => {
    setWhichNot('new')
  }


  return (
    <div>
      <div className="w-100 h-20 flex justify-center items-center border-b-4">
        <Header title="Notification" subtitle="" />
      </div>
      <div className="w-100 flex p-2">

        <div className=" w-1/2 flex justify-center">
          <button onClick={newNotBtn} className="bg-[#384263] rounded-md px-5 text-white text-sm hover:bg-[#1b3272]">
            NEW
          </button>
        </div>
        <div className=" w-1/2 flex justify-center">
          <button onClick={oldNotBtn} className="bg-[#384263] rounded-md px-5 text-white text-sm hover:bg-[#1b3272]">
            OLD
          </button>
        </div>

      </div>
      {
        (whichNot == 'new') && <div className="md:px-28 w-100 text-black  ">
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
      }
      {
        (whichNot == 'old') && <div className="md:px-28 w-100 text-black  ">
          {oldNotifications && (
            <ul>
              {(oldNotifications.map(notification => (
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
          )}
        </div>
      }

    </div>
  )
}

export default Notification;
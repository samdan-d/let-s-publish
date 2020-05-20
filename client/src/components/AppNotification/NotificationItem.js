import React from "react";
import {Avatar} from "antd";


const NotificationItem = ({notification}) => {
  console.log(notification);
  const {icon, image, title, createdAt} = notification;
  return (
    <li className="gx-media">
      <Avatar className="gx-size-40 gx-mr-3"
              alt='https://firebasestorage.googleapis.com/v0/b/let-s-publish.appspot.com/o/1589901298894_naruto1.png?alt=media'
              src='https://firebasestorage.googleapis.com/v0/b/let-s-publish.appspot.com/o/1589901298894_naruto1.png?alt=media'/>
      <div className="gx-media-body gx-align-self-center">
        <p className="gx-fs-sm gx-mb-0">{title}</p>
        <i className={`icon icon-alert gx-text-blue gx-pr-2`}/> <span className="gx-meta-date"><small>{createdAt}</small></span>
      </div>
    </li>
  );
};

export default NotificationItem;

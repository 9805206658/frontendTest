//function for generating the notification
import { notification } from "antd"
import  "./notification.css"
const createNotification=({isSuccess=true,description,placement="topRight",duration=3})=>
{
  let message;
  if(isSuccess)
    message="Success!";
 else
  message="failed !";

 const config=
  {
    message,
    description,
    placement,
    duration,
 }
  if(isSuccess)
return notification.success(config);
else
return notification.error(config);
}

export default createNotification
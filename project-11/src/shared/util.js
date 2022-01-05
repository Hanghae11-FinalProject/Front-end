export const icons = [
  "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/06/urbanbrush-20200615001928725725-1560x1653.jpg",
  "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/06/urbanbrush-20200616083526566260-1560x1653.jpg",
  "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/09/urbanbrush-20190910211651035917.png",
  "https://i.pinimg.com/736x/77/0e/75/770e750b31ce0a5d3698e699f21ceb4e.jpg",
];

export const copyUrlToClip = () => {
  const dummy = document.createElement("input");
  const text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

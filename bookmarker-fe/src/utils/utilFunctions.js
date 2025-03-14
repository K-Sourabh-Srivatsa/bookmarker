function alertTimeout(mymsg, mymsecs) {
  var myelement = document.createElement("div");
  myelement.setAttribute("style", "background-color: white; color:black; width: 200px; height: 50px; position: absolute; top:10px; left:0; right:0; margin:auto; border: 1px solid black; border-radius: 10px; font-family:arial; font-size:15px; display: flex; align-items: center; justify-content: center; text-align: center;");
  myelement.innerHTML = mymsg;
  setTimeout(function () {
    myelement.parentNode.removeChild(myelement);
  }, mymsecs);
  document.body.appendChild(myelement);
}

export const ensureHttps = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const copyToClipboard = (url, e) => {
  e.preventDefault();
  e.stopPropagation();

  navigator.clipboard.writeText(ensureHttps(url))
    .then(() => {
      alertTimeout("Link copied to clipboard!", 2000)
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

export const matchPasswordFields = (password, confirmPassword) => {
  if(password != confirmPassword) {
    return false;
  } else {
    return true
  }
}
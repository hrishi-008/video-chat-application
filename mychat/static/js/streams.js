const APP_ID = "f86e8e7143f14315b01a90cf2f3f0b64";
const TOKEN = sessionStorage.getItem("token");
const CHANNEL = sessionStorage.getItem("room_name");
let UID = Number(sessionStorage.getItem("UID"));
let NAME = sessionStorage.getItem("name");
const CLIENT = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  document.getElementById("room-name").innerText = CHANNEL;

  CLIENT.on("user-published", handleUserJoined);
  CLIENT.on("user-left", handleUserLeft);

  try {
    await CLIENT.join(APP_ID, CHANNEL, TOKEN, UID);
  } catch (err) {
    console.error(err);
    window.open("/", "_self");
  }

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
  let member = await createMember();

  let player = `
    <div class="video-container" id="user-container-${UID}">
    <div class="username-wrapper"><span class="user-name">${member.name}</span></div>
    <div class="video-player" id="user-${UID}"></div></div>`;
  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);
  localTracks[1].play(`user-${UID}`);
  await CLIENT.publish([localTracks[0], localTracks[1]]);
};

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await CLIENT.subscribe(user, mediaType);

  if (mediaType === "video") {
    let player = document.getElementById(`user-container-${user.uid}`);
    if (player != null) {
      player.remove();
    }

    let member = await getMember(user);

    if (!player) {
      player = `
      <div class="video-container" id="user-container-${user.uid}">
      <div class="username-wrapper"><span class="user-name">${member.name}</span></div>
      <div class="video-player" id="user-${user.uid}"></div></div>`;
      document
        .getElementById("video-streams")
        .insertAdjacentHTML("beforeend", player);
      user.videoTrack.play(`user-${user.uid}`);
    }
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

let handleUserLeft = (user) => {
  delete remoteUsers[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
};

let leaveAndRemoveLocalStream = async () => {
  localTracks.forEach((track) => {
    track.stop();
    track.close();
  });
  await CLIENT.leave();
  deleteMember();
  window.open("/", "_self");
};

let toggleCamera = async (e) => {
  if (localTracks[1].muted) {
    await localTracks[1].setMuted(false);
    e.target.style.backgroundColor = "#fff";
  } else {
    await localTracks[1].setMuted(true);
    e.target.style.backgroundColor = "rgba(255,80,80,0.5)";
  }
};

let toggleMic = async (e) => {
  if (localTracks[0].muted) {
    await localTracks[0].setMuted(false);
    e.target.style.backgroundColor = "#fff";
  } else {
    await localTracks[0].setMuted(true);
    e.target.style.backgroundColor = "rgba(255,80,80,0.5)";
  }
};

let createMember = async () => {
  let response = await fetch("/create_member/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'name': NAME,
      'room_name': CHANNEL,
      'UID': UID,
    }),
  });
  let member = await response.json();
  return member;
}


let getMember = async (user) => {
  let response = await fetch(`/get_member/?UID=${user.uid}&room_name=${CHANNEL}`)
  let member = await response.json()
  return member
}

let deleteMember = async () => {
  let response = await fetch('/delete_member/', {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body:JSON.stringify({'name':NAME, 'room_name':CHANNEL, 'UID':UID})
  })
  let member = await response.json()
}

window.addEventListener("beforeunload",deleteMember);



joinAndDisplayLocalStream();
document.getElementById("leave-btn").addEventListener("click", leaveAndRemoveLocalStream);
document.getElementById("camera-btn").addEventListener("click", toggleCamera);
document.getElementById("mic-btn").addEventListener("click", toggleMic);

const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");

const trackDB = require("./Tracks");
const albumDB = require("./Albums");
const playlistDB = require("./Playlists");
const baseDB = require("./Base");

require("dotenv").config();

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log("conect");
});

const musicschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "deleted"],
    default: "active",
  },
  tracks: [],
  isadmin: { type: Boolean, default: false },
  ismaster: { type: Boolean, default: false },
  isverify: { type: Boolean, default: false },
  banupload: { type: Boolean, default: false },
  requests: [],
  bio: { type: String, maxlength: 500, trim: true },
  socialmedia: [],
  subscribe: [],
  artists: [],
  saveAlbums: [],
  saveTracks: [],
  savePlaylists: [],
  lastplay: {},
  notification: [],
  profile: { type: String, default: null },
  favouriteGenre: { type: String, default: null },
  recommendUser: [],
  albums: [],
  playlists: [],
  likes: [],
});
musicschema.plugin(timestamp);

const User = mongoose.models.Users || mongoose.model("Users", musicschema);

async function checkusername(value) {
  const username = await User.findOne({ username: value });
  if (!username) {
    return true;
  } else {
    return false;
  }
}
async function checkemail(value) {
  const email = await User.findOne({ email: value });

  if (!email) {
    return {
      msg: "Availabe",
      status: true,
    };
  } else {
    return {
      msg: "This email already exists",
      status: false,
    };
  }
}
async function register(username, email, password) {
  let token;
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
  token = jwt.sign({ _id: user.id }, process.env.REGISTER_JWT);
  await notification(
    { _id: user.id },
    "/profile",
    "welcome to our site",
    "welcome"
  );
  return {
    token: token,
  };
}

async function login(user, password) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

  if (emailRegex.test(user)) {
    const foundUser = await User.findOne({ email: user });

    if (foundUser && foundUser.password === password) {
      let token = jwt.sign({ _id: foundUser._id }, process.env.REGISTER_JWT);

      return {
        status: true,
        msg: "Login successfully",
        token,
        userid: foundUser._id,
      };
    } else {
      return {
        status: false,
        msg: "Username or Password was wrong",
      };
    }
  } else {
    const foundUser = await User.findOne({ username: user });
    if (foundUser && foundUser.password === password) {
      let token = jwt.sign({ _id: foundUser._id }, process.env.REGISTER_JWT);

      return {
        status: true,
        msg: "Login successfully",
        token,
        userid: foundUser._id,
      };
    } else {
      return {
        status: false,
        msg: "Username or Password was wrong",
      };
    }
  }
}

async function forgetpassword(user) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  if (emailRegex.test(user)) {
    const foundUser = await User.findOne({ email: user });
    if (foundUser) {
      token = jwt.sign({ _id: foundUser.id }, process.env.PENDING_JWT);
      const link = `http://localhost:${process.env.PORT}/f/${token}`;
      const html = `    <h1 style="text-align: center">Hello , ${foundUser.username}</h1>
      <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">To restore your password please Click on blow button</p>
      <div style="display: flex; justify-content: center">
        <button
          style="
          margin-top: 10px;
          margin-left: 40%;
            border-radius: 20px;
            background-color: blue;
            color: white;
            padding: 20px 10px;
            width: 220px;
            text-transform: bold;
            outline:none;
            border:2px solid darkblue;
          "
        >
          <a
            href="${link}"
            style="
              text-decoration: none;
              color: white;
              font-size: 1.5rem;
              font-style:sans-serif;
              text-transform: capitalize;
              font-weight: bold;
              cursor:pointer;
            "
            >Restore Your Password</a
          >
        </button>
        
      </div>
      <hr style="margin-top:30px;" />
      <footer style="margin-top:30px;">
        <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
          > if you arent sign up , please Dont send this email for other
          people.</p
        >
      </footer>`;
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transport.sendMail({
        from: process.env.MAIL_USER,
        to: foundUser.email,
        subject: "Restore Your Password",
        html: html,
      });

      if (!info.rejected[0]) {
        return {
          status: true,
          msg: "Email send to your inbox",
        };
      } else {
        return {
          status: false,
          msg: "Please try again later",
        };
      }
    } else {
      return {
        status: false,
        msg: "User not found",
      };
    }
  } else {
    const foundUser = await User.findOne({ username: user });
    if (foundUser) {
      token = jwt.sign({ _id: foundUser.id }, process.env.PENDING_JWT);
      const link = `${process.env.Site_Adress}f/${token}`;
      const html = `    <h1 style="text-align: center">Hello , ${foundUser.username}</h1>
      <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;">To restore your password please Click on blow button</p>
      <div style="display: flex; justify-content: center">
        <button
          style="
          margin-top: 10px;
          margin-left: 40%;
            border-radius: 20px;
            background-color: blue;
            color: white;
            padding: 20px 10px;
            width: 220px;
            text-transform: bold;
            outline:none;
            border:2px solid darkblue;
          "
        >
          <a
            href="${link}"
            style="
              text-decoration: none;
              color: white;
              font-size: 1.5rem;
              font-style:sans-serif;
              text-transform: capitalize;
              font-weight: bold;
              cursor:pointer;
            "
            >Restore Your Password</a
          >
        </button>
        
      </div>
      <hr style="margin-top:30px;" />
      <footer style="margin-top:30px;">
        <p style="font-size:1.5rem;text-align: center;font-weight:bold;  text-transform: capitalize;"
          > if you arent sign up , please Dont send this email for other
          people.</p
        >
      </footer>`;
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transport.sendMail({
        from: process.env.MAIL_USER,
        to: foundUser.email,
        subject: "Restore Your Password",
        html: html,
      });

      if (!info.rejected[0]) {
        return {
          status: true,
          msg: "Email send to your inbox",
        };
      } else {
        return {
          status: false,
          msg: "Please try again later",
        };
      }
    } else {
      return {
        status: false,
        msg: "User not found",
      };
    }
  }
}

async function verify(token) {
  try {
    const decode = jwt.verify(token, process.env.PENDING_JWT);
    let user = await User.findById(decode._id);
    return user ? user._id : false;
  } catch (err) {
    return false;
  }
}

async function changepasswordbylink(id, password) {
  try {
    await User.findByIdAndUpdate(id, { password });

    return {
      status: true,
      msg: "Password have has changed successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again later",
    };
  }
}

async function getuser(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    let user = await User.findById(decode._id);
    let tracks = [];
    let album = [];
    let playlists = [];

    if (user.albums.length > 0) {
      await Promise.all(
        user.albums.map(async (e) => {
          const res = await albumDB.findalbum(e.id);
          album.push(res);
        })
      );
    }

    if (user.tracks.length > 0) {
      await Promise.all(
        user.tracks.map(async (e) => {
          const res = await trackDB.findtrackbyid(e.id);

          tracks.push(res);
        })
      );
    }

    if (user.socialmedia.length > 0) {
      await Promise.all(
        user.socialmedia.map(async (e) => {
          e.iconlink = await baseDB.findsocialmedia(e.icon);
        })
      );
    }

    if (user.recommendUser.length > 0) {
      await Promise.all(
        user.recommendUser.map(async (e, index) => {
          user.recommendUser[index] = await User.findById(e);
        })
      );
    }
    if (user.playlists.length > 0) {
      await Promise.all(
        user.playlists.map(async (playlistid) => {
          const playlist = await playlistDB.findplaylistbyid(playlistid);
          playlists.push(playlist);
        })
      );
    }
    user.tracks = tracks;
    user.albums = album;
    user.playlists = playlists;
    return user;
  } catch {
    return false;
  }
}

async function getuserbyid(id) {
  try {
    const user = await User.findOne({ _id: id });
    user.playlists = await Promise.all(
      user.playlists.map(async (e) => {
        return await playlistDB.findplaylistbyid(e);
      })
    );
    user.albums = await Promise.all(
      user.albums.map(async (e) => {
        return await albumDB.findalbum(e.id);
      })
    );

    user.playlists = await Promise.all(
      user.playlists.map(async (e) => {
        return await playlistDB.findplaylistbyid(e);
      })
    );

    let library = await trackDB.getalltracks();
    const albums = await albumDB.getallalbums();
    albums.forEach((album) => {
      album.tracks.forEach((track) => {
        track.cover = album.cover;
        library.push(track);
      });
    });

    user.playlists = await Promise.all(
      user.playlists.map(async (playlist) => {
        const tracks = await Promise.all(
          playlist.tracks.map(async (track) => {
            return library.find((e) => {
              return e._id.toString() === track.toString();
            });
          })
        );

        playlist.tracks = tracks;
        return playlist;
      })
    );

    user.tracks = await Promise.all(
      user.tracks.map(async (e) => {
        return await trackDB.findtrackbyid(e.id);
      })
    );
    user.subscribe = await Promise.all(
      user.subscribe.map(async (e) => {
        return await User.findById(e);
      })
    );
    user.artists = await Promise.all(
      user.artists.map(async (e) => {
        return await User.findById(e);
      })
    );
    user.recommendUser = await Promise.all(
      user.recommendUser.map(async (e) => {
        return await User.findById(e);
      })
    );
    return user;
  } catch {
    return false;
  }
}

async function getuserbyusername(username) {
  try {
    const user = await User.findOne({ username });

    user.playlists = await Promise.all(
      user.playlists.map(async (e) => {
        return await playlistDB.findplaylistbyid(e);
      })
    );

    let library = await trackDB.getalltracks();
    const albums = await albumDB.getallalbums();
    albums.forEach((album) => {
      album.tracks.forEach((track) => {
        track.cover = album.cover;
        library.push(track);
      });
    });

    user.playlists = await Promise.all(
      user.playlists.map(async (playlist) => {
        const tracks = await Promise.all(
          playlist.tracks.map(async (track) => {
            return library.find((e) => {
              return e._id.toString() === track.toString();
            });
          })
        );

        playlist.tracks = tracks;
        return playlist;
      })
    );

    user.albums = await Promise.all(
      user.albums.map(async (e) => {
        return await albumDB.findalbum(e.id);
      })
    );

    user.tracks = await Promise.all(
      user.tracks.map(async (e) => {
        return await trackDB.findtrackbyid(e.id);
      })
    );
    user.subscribe = await Promise.all(
      user.subscribe.map(async (e) => {
        return await User.findById(e);
      })
    );
    user.artists = await Promise.all(
      user.artists.map(async (e) => {
        return await User.findById(e);
      })
    );

    user.recommendUser = await Promise.all(
      user.recommendUser.map(async (e) => {
        return await User.findById(e);
      })
    );

    return user;
  } catch {
    return false;
  }
}

async function changeusername(token, newusername) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        username: newusername,
      },
    });
    await notification(
      { _id: decode._id },
      "/profile",
      `your username was chaged to ${newusername}`,
      "changeusername"
    );
    return {
      status: true,
      msg: "Username successfully changed",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function getallusers() {
  const users = await User.find({ ismaster: false });
  return users;
}
async function verifyusers() {
  const users = await User.find({ isverify: true });
  return users;
}

async function changeadmin(userid) {
  try {
    const user = await User.findById(userid);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { isadmin: !user.isadmin },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}

async function changeverify(userid) {
  try {
    const user = await User.findById(userid);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { isverify: !user.isverify },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}
async function changebanupload(userid) {
  try {
    const user = await User.findById(userid);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { banupload: !user.banupload },
      { new: true }
    );
    return updatedUser ? true : false;
  } catch {
    return false;
  }
}

async function checktrackandalbumname(name, edit) {
  try {
    let albumtrack = [];
    let library = [];

    const tracks = await trackDB.getalltracks();
    const albums = await albumDB.getallalbums();
    albums.forEach((album) => {
      album.tracks.forEach((track) => {
        albumtrack.push(track);
      });
    });
    const requests = await getallrequest();

    tracks.forEach((track) => library.push(track.name.toLowerCase()));
    albums.forEach((album) => library.push(album.name.toLowerCase()));
    albumtrack.forEach((track) => library.push(track.name.toLowerCase()));
    requests.forEach((request) => {
      library.push(request.name.toLowerCase());
    });
    if (edit) {
      const index = library.findIndex((e) => {
        return e.toLowerCase() === edit.toLowerCase();
      });

      library.splice(index, 1);
    }

    const search = library.findIndex((e) => {
      return e.toLowerCase() === name.toLowerCase();
    });
    console.log(search);
    return search >= 0 ? false : true;
  } catch (error) {
    console.error(error);
  }
}

async function getallrequest() {
  const users = await getallusers();

  let pendingRequests = [];
  users.forEach((user) => {
    const userPendingRequests = user.requests.filter(
      (request) => request.status === "pending"
    );
    pendingRequests.push(...userPendingRequests);
  });
  return pendingRequests;
}

async function addrequesttrack(
  token,
  name,
  type,
  genre,
  description,
  lyric,
  feat,
  cover,
  track,
  visibility
) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  if (user.isverify) {
    await trackDB
      .addtrack(
        name,
        type,
        genre,
        decode._id,
        description,
        album,
        lyric,
        cover,
        feat,
        track,
        visibility
      )
      .then((res) => {
        return res;
      });
  } else {
    try {
      const decode = jwt.verify(token, process.env.REGISTER_JWT);

      const user = await User.findOneAndUpdate(
        { _id: decode._id },
        {
          $push: {
            requests: {
              artistid: decode._id,
              track,
              name,
              type,
              genre,
              description,
              lyric,
              feat,
              cover,
              status: "pending",
              visibility,
              msg: "",
            },
          },
        },
        { new: true }
      );
      console.log("in");
      return user;
    } catch (errr) {
      console.log(errr);
    }
  }
}

async function addrequestalbum(
  token,
  name,
  visibility,
  genre,
  tracks,
  cover,
  description,
  totalduaration
) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  if (user.isverify) {
    await albumDB
      .addalbum(name, id, description, cover, status, genre, totalduaration)
      .then(async (res) => {
        await User.findByIdAndUpdate(userId, {
          $push: {
            albums: {
              name,
              id: res._id,
            },
          },
        });
        return res;
      });
  } else {
    try {
      const decode = jwt.verify(token, process.env.REGISTER_JWT);
      tracks.forEach((e) => {
        e.artistid = decode._id;
      });
      const user = await User.findOneAndUpdate(
        { _id: decode._id },
        {
          $push: {
            requests: {
              artistid: decode._id,
              name,
              genre,
              tracks,
              status: "pending",
              visibility,
              cover,
              description,
              msg: "",
              type: "album",
              totalduaration,
            },
          },
        },
        { new: true }
      );
      return user;
    } catch {
      return false;
    }
  }
}

async function addprofile(id, url) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profile: url },
      { new: true }
    );
    return updatedUser;
  } catch {
    return false;
  }
}

async function subscribe(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);

    const subscriber = await User.findOneAndUpdate(
      { _id: decode._id },
      {
        $push: {
          artists: id,
        },
      },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          subscribe: decode._id,
        },
      },
      { new: true }
    );

    await notification(
      { _id: id },
      "/profile",
      `${subscriber.username} subscribed to you`,
      "follow"
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function unsubscribe(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const subscriber = await User.findOneAndUpdate(
      { _id: decode._id },
      {
        $pull: {
          artists: id,
        },
      },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          subscribe: decode._id,
        },
      },
      { new: true }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function changebio(token, text) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  try {
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        bio: text,
      },
    });
    return {
      msg: "Bio changed successfully",
      status: true,
    };
  } catch {
    return {
      status: false,
      msg: "Please try again later",
    };
  }
}

async function saveplaylist(token, playlistid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        savePlaylists: playlistid,
      },
    });
    return true;
  } catch {
    return false;
  }
}
async function removesaveplaylist(token, playlistid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        savePlaylists: playlistid,
      },
    });
    return true;
  } catch {
    return false;
  }
}
async function savealbum(token, albumid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        saveAlbums: albumid,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function removesavealbum(token, albumid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    console.log(albumid);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        saveAlbums: albumid,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function savetrack(token, trackid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        saveTracks: trackid,
      },
    });
    return true;
  } catch {
    return false;
  }
}
async function removesavetrack(token, trackid) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        saveTracks: trackid,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function changefavouritegenre(token, text) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        favouriteGenre: text,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function addsocialmedia(token, title, icon, link) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        socialmedia: {
          title,
          icon,
          link,
        },
      },
    });
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function editsocialmedia(token, socialmedia) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        socialmedia,
      },
    });
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function deletsocial(token, title) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(
      decode._id,
      { $pull: { socialmedia: { title: title } } },
      { new: true }
    );
    return {
      status: true,
      msg: "Deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function verifytrack(token, name) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;
    const user = await User.findById(userId);
    const requests = user.requests;
    const updatedRequests = await Promise.all(
      requests.map(async (request) => {
        if (request.name === name) {
          const res = await trackDB.addtrack(
            request.name,
            request.type,
            request.genre,
            request.artist,
            request.description,
            request.lyric,
            request.cover,
            request.feat,
            request.track,
            request.visibility
          );
          console.log(res);
          await User.findByIdAndUpdate(userId, {
            $push: {
              tracks: {
                name,
                id: res._id,
              },
            },
          });
          request.status = "accept";
          return {
            ...request,
            msg: undefined,
          };
        }
        return request;
      })
    );
    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });
    await notification(
      { _id: userId },
      "/profile/request",
      `${name} has been accepted`,
      "accept"
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function rejectrack(token, name, msg) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;

    let user = await User.findById(userId);
    let requests = user.requests;

    const updatedRequests = await Promise.all(
      requests.map(async (request) => {
        if (request.name === name) {
          request.status = "reject";
          return {
            ...request,
            msg,
          };
        }
        return request;
      })
    );

    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });
    await notification(
      { _id: userId },
      "/profile/request",
      `${name} was been rejected`,
      "reject"
    );
    return true;
  } catch {
    return false;
  }
}

async function searchbyusername(name) {
  return await User.find({ username: { $regex: name, $options: "i" } });
}

async function addrecomendeuser(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findOneAndUpdate(
      { _id: decode._id },
      {
        $push: {
          recommendUser: id,
        },
      },
      { new: true }
    );
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function removerecommandeuser(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findOneAndUpdate(
      { _id: decode._id },
      {
        $pull: {
          recommendUser: id,
        },
      },
      { new: true }
    );
    return {
      status: true,
      msg: "Removed successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}

async function favourite(token, trackid) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const user = await User.findById(decode._id);
  let userlikes = user.favourite;
  let index = userlikes.findindex((e) => e === trackid);
  if (index) {
    userlikes.splite(index, 1);
    await User.findByIdAndUpdate(decode_id, {
      $set: {
        favourite: userlikes,
      },
    });
    return "add";
  } else {
    await User.findByIdAndUpdate(decode_id, {
      $push: {
        favourite: userlikes,
      },
    });
    return "remove";
  }
}

async function checknameandalbum(token, name) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);
  const trackname = await checktrackandalbumname(token, name);
  const user = await User.findById(decode._id);
  const requestname = user.requests.find((e) => {
    return e.name == name;
  });

  return trackname && !requestname ? true : false;
}

async function edittrack(token, id, newname) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const usertracks = user.tracks;
    usertracks.map((e) => {
      if (e.id === id) {
        e.name = newname;
      }
    });
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        tracks: usertracks,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletetrack(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);

    const trackid = new mongoose.Types.ObjectId(id);

    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        tracks: { id: new mongoose.Types.ObjectId(trackid) },
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function lastplay(token, value) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        lastplay: value,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getlastplay(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);

    if (user.lastplay.type == "track") {
      let library = [];

      let albums = await albumDB.getallalbums();
      albums.forEach((album) => {
        album.tracks.forEach((track) => {
          if (track.status.toLowerCase() == "public") {
            track.cover = album.cover;
            library.push(track);
          }
        });
      });

      let tracks = await trackDB.getalltracks();
      tracks.forEach((e) => {
        if (e.status.toLowerCase() === "public") {
          library.push(e);
        }
      });

      let search = library.find((e) => {
        return e._id.toString() === user.lastplay.id;
      });

      if (search) {
        if (search.artist) {
          search.artist = await User.findById(search.artist);
        } else {
          search.artist = await User.findById(search.artistid);
        }
      }

      return search;
    } else if (user.lastplay.type == "album") {
      let track;
      const albums = await albumDB.getallalbums();
      const album = albums.find((e) => {
        return e._id == user.lastplay.albumid;
      });

      if (album.status.toLowerCase() === "private") {
        return false;
      }

      if (user.lastplay.id) {
        track = album.tracks.find((track) => {
          return track._id == user.lastplay.id;
        });
        if (track.status.toLowerCase() === "private") {
          return false;
        }
      } else {
        track = album.tracks[0];
      }
      let artist = await User.findById(track.artistid);

      const resaultTrack = {
        ...track,
        artist,
        cover: album.cover,
        album,
      };
      return resaultTrack;
    } else if (user.lastplay.type == "playlist") {
      const playlist = await playlistDB.findplaylistbyid(
        user.lastplay.playlistid
      );
      if (playlist.visibility.toLowerCase() === "public") {
        let track;
        let library = [];
        let tracks = await trackDB.getalltracks();
        tracks.forEach(async (e) => {
          if (e.status.toLowerCase() === "public") {
            library.push(e);
          }
        });
        const albums = await albumDB.getallalbums();

        albums.forEach((album) => {
          album.tracks.forEach(async (track) => {
            track.cover = album.cover;
            library.push(track);
          });
        });

        if (user.lastplay.id) {
          track = library.find((item) => {
            return item._id.toString() == user.lastplay.id;
          });
        } else {
          track = library.find(async (item) => {
            return item._id.toString() == playlist.tracks[0]._id;
          });
        }

        track.artist = await User.findById(playlist.creator);
        return track;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

async function getLibrary(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    if (user.lastplay.type == "track") {
      let library = [];
      let albums = await Promise.all(
        user.albums.map(async (e) => {
          const album = await albumDB.findalbum(e.id);
          return album;
        })
      );

      albums.forEach((album) => {
        album.tracks.forEach(async (track) => {
          if (track.status.toLowerCase() === "public") {
            track.artist = await User.findById(track.artistid);
            track.cover = album.cover;
            library.push(track);
          }
        });
      });

      let tracks = await Promise.all(
        user.tracks.map(async (e) => {
          const track = await trackDB.findtrackbyid(e.id);
          return track;
        })
      );

      for (const track of tracks) {
        if (track.status.toLowerCase() === "public") {
          track.artist = await User.findById(track.artist);
          library.push(track);
        }
      }
      return library;
    } else if (user.lastplay.type == "album") {
      const albums = await albumDB.getallalbums();
      let library = albums.filter((e) => e.status.toLowerCase() === "public");
      const search = library.find(
        (e) => e._id.toString() === user.lastplay.albumid
      );

      if (search) {
        await Promise.all(
          search.tracks.map(async (e) => {
            e.artist = await User.findById(e.artistid);
          })
        );
      }

      search.tracks.forEach(async (e) => {
        e.cover = search.cover;
        e.artist = await User.findById(e.artistid);
      });

      resault = search.tracks.filter(
        (e) => e.status.toLowerCase() === "public"
      );
      return resault;
    } else {
      const playlists = await playlistDB.getallplaylists();
      let publicplaylists = playlists.filter(
        (e) => e.visibility.toLowerCase() === "public"
      );
      const playlist = publicplaylists.find(
        (e) => e._id.toString() === user.lastplay.playlistid
      );
      let library = [];
      let tracks = await trackDB.getalltracks();

      await Promise.all(
        tracks.map(async (e) => {
          if (e.status.toLowerCase() === "public") {
            e.artist = await User.findById(e.artist);
            library.push(e);
          }
        })
      );
      const albums = await albumDB.getallalbums();

      await Promise.all(
        albums.map(async (album) => {
          await Promise.all(
            album.tracks.map(async (track) => {
              if (track.status.toLowerCase() === "public") {
                track.artist = await User.findById(track.artistid);
                track.cover = album.cover;
                library.push(track);
              }
            })
          );
        })
      );

      playlist.tracks = await Promise.all(
        playlist.tracks.map(async (track) => {
          return library.find((e) => {
            return track.toString() === e._id.toString();
          });
        })
      );

      return playlist.tracks;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function notification(query, link, text, img) {
  let users = await User.find(query);
  for (const user of users) {
    await User.findByIdAndUpdate(user._id, {
      $push: {
        notification: {
          text,
          link,
          img,
          seen: false,
        },
      },
    });
  }
}

async function verifyalbum(token, name) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;
    const user = await User.findById(userId);
    const requests = user.requests;

    const updatedRequests = await Promise.all(
      requests.map(async (request) => {
        if (request.name === name) {
          await albumDB
            .addalbum(
              request.name,
              request.artist,
              request.description,
              request.cover,
              request.visibility,
              request.genre,
              request.totalduaration,
              request.tracks
            )
            .then(async (res) => {
              await User.findByIdAndUpdate(userId, {
                $push: {
                  albums: {
                    name,
                    id: res._id,
                  },
                },
              });
              return res;
            });

          request.status = "accept";
          return {
            ...request,
            msg: undefined,
          };
        }
        return request;
      })
    );

    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });

    await notification(
      { _id: userId },
      "/profile/request",
      `${name} has been verified`,
      " accept"
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function rejectalbum(token, name, msg) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const userId = decode._id;

    const user = await User.findById(userId);
    const requests = user.requests;

    const updatedRequests = await Promise.all(
      requests.map(async (request) => {
        if (request.name === name) {
          request.status = "reject";
          return {
            ...request,
            msg,
          };
        }
        return request;
      })
    );

    await User.findByIdAndUpdate(userId, {
      $set: {
        requests: updatedRequests,
      },
    });

    await notification(
      { _id: userId },
      "/profile/request",
      `${name} was been rejected`,
      "reject"
    );
    return true;
  } catch {
    return false;
  }
}

async function editalbum(token, id, newname) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const useralbums = user.albums;
    useralbums.map((e) => {
      if (e.id === id) {
        e.name = newname;
      }
    });
    await User.findByIdAndUpdate(decode._id, {
      $set: {
        albums: useralbums,
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function deletealbum(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        albums: { id: new mongoose.Types.ObjectId(id) },
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deletacccount(id) {
  try {
    await trackDB.deletedaccounttracks(id);
    await playlistDB.deletaccountplaylists(id);
    await User.findByIdAndUpdate(id, {
      $set: {
        status: "deleted",
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function loginback(id) {
  try {
    await Users.findByIdAndUpdate(id, {
      $set: {
        status: "active",
      },
    });
    await trackDB.loginback(id);
    await deletacccount.loginback(id);

    return true;
  } catch {
    return false;
  }
}

async function getrequests() {
  try {
    const users = await getallusers();
    let pendingRequests = users.reduce((acc, user) => {
      let userPendingRequests = user.requests.filter((request) =>
        request.status ? request.status == "pending" : null
      );
      return [...acc, ...userPendingRequests];
    }, []);
    await Promise.all(
      pendingRequests.map(async (e) => {
        let user = await User.findById(e.artistid);
        e.artist = user;
      })
    );
    await Promise.all(
      pendingRequests.map(async (e) => {
        if (e.type == "podcast" || e.type == "music") {
          if (e.feat.length > 0) {
            await Promise.all(
              e.feat.map(async (feat) => {
                let user = await User.findById(feat._id);
                feat = user;
              })
            );
          }
        }
      })
    );
    return pendingRequests;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function like(token, id) {
  console.log(id);
  const decode = jwt.verify(token, process.env.REGISTER_JWT);

  try {
    await User.findByIdAndUpdate(decode._id, {
      $push: {
        likes: id,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function unlike(token, id) {
  const decode = jwt.verify(token, process.env.REGISTER_JWT);

  try {
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        likes: id,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function gettracks(type, id) {
  try {
    if (type === "track") {
      let library = [];
      const user = await User.findById(id);

      await Promise.all(
        user.tracks.map(async (e) => {
          let track = await trackDB.findtrackbyid(e.id);
          track.artist = await User.findById(track.artist);
          if (track.status === "public") {
            library.push(track);
          }
        })
      );

      await Promise.all(
        user.albums.map(async (album) => {
          let albumData = await albumDB.findalbum(album.id);
          for (let track of albumData.tracks) {
            if (track.status === "Public") {
              track.artist = await User.findById(track.artistid);
              track.cover = albumData.cover;
              track.album = albumData._id;
              track.type = "music";
              library.push(track);
            }
          }
        })
      );

      library.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return library;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getusernamebyid(id) {
  const user = await User.findById(id);
  return user.username;
}

async function addplaylist(id, playlistid) {
  try {
    await User.findByIdAndUpdate(id, {
      $push: {
        playlists: playlistid,
      },
    });
    return {
      status: true,
      msg: "Saved successfully",
    };
  } catch {
    return {
      status: false,
      msg: "Please try again",
    };
  }
}
async function deleteplaylist(token, id) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    await User.findByIdAndUpdate(decode._id, {
      $pull: {
        playlists: new mongoose.Types.ObjectId(id),
      },
    });
    return true;
  } catch {
    return false;
  }
}

async function changeidtouser(arr, type) {
  try {
    if (type === "track") {
      await Promise.all(
        arr.map(async (e) => {
          if (e.artistid) {
            e.artist = await User.findById(e.artistid);
          } else {
            e.artist = await User.findById(e.artist);
          }
          return e;
        })
      );
      return arr;
    } else if (type === "album") {
      await Promise.all(
        arr.map(async (album) => {
          await Promise.all(
            album.tracks.map(async (track) => {
              track.artist = await User.findById(track.artistid);
            })
          );
          return album;
        })
      );

      return arr;
    } else {
      arr.forEach(async (e) => {
        e.creator = new mongoose.Types.ObjectId(e.creator);
        e.artist = await User.findById(e.creator);
        return e;
      });

      return arr;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function topartist() {
  let users = await User.find({});
  users.sort((a, b) => b.subscribe.length - a.subscribe.length);
  let resault = users.slice(0, 20);
  return resault;
}

async function getsavedtrack(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const SavedTrack = user.saveTracks;

    const tracks = await trackDB.getalltracks();
    let library = [];

    await Promise.all(
      tracks.map(async (e) => {
        if (e.status.toLowerCase() === "public") {
          e.artist = await User.findById(e.artist);
          library.push(e);
        }
      })
    );

    let albums = await albumDB.getallalbums();
    await Promise.all(
      albums.map(async (album) => {
        await Promise.all(
          album.tracks.map(async (e) => {
            if (e.status.toLowerCase() === "public") {
              e.cover = album.cover;
              e.artist = await User.findById(e.artistid);
              library.push(e);
            }
          })
        );
      })
    );

    let resault = [];

    SavedTrack.forEach((e) => {
      library.forEach((track) => {
        if (e.toString() === track._id.toString()) {
          return resault.push(track);
        }
      });
    });

    return resault;
  } catch {
    return false;
  }
}

async function getsavedalbum(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const Savedalbum = user.saveAlbums;

    const allalbums = await albumDB.getallalbums();
    const albums = allalbums.filter(
      (album) => album.status.toLowerCase() === "public"
    );
    let library = [];

    await Promise.all(
      Savedalbum.map(async (e) => {
        const resault = albums.find((album) => album._id.toString() === e);
        library.push(resault);
      })
    );

    return library && library.length > 0 ? library : false;
  } catch {
    return false;
  }
}

async function getsavedplaylist(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const savePlaylists = user.savePlaylists;

    const playlists = await playlistDB.getallplaylists();
    const publicplaylists = playlists.filter(
      (e) => e.visibility.toLowerCase() === "public"
    );

    let library = [];

    await Promise.all(
      savePlaylists.map(async (e) => {
        let result = publicplaylists.find(
          (playlist) => playlist._id.toString() === e
        );
        library.push(result);
      })
    );

    return library && library.length > 0 ? library : false;
  } catch {
    return false;
  }
}

async function artist(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    let artist = user.artists;

    const library = await Promise.all(
      artist.map(async (e) => {
        return await getuserbyid(e);
      })
    );

    return library;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function fullsearch(val) {
  try {
    const users = await searchbyusername(val);

    let library = [];
    const tracks = await trackDB.getalltracks();
    const albums = await albumDB.getallalbums();
    await Promise.all(
      tracks.map(async (e) => {
        if (e.status.toLowerCase() === "public") {
          e.artist = await User.findById(e.artist);
          library.push(e);
        }
      })
    );
    await Promise.all(
      albums.map(async (album) => {
        await Promise.all(
          album.tracks.map(async (track) => {
            if (track.status.toLowerCase() === "public") {
              track.cover = album.cover;
              track.artist = await User.findById(track.artistid);
              library.push(track);
            }
          })
        );
      })
    );
    const regex = new RegExp(val, "i");
    const resulttracks = library.filter((e) => regex.test(e.name));

    const searchalbums = await albumDB.searchbyusername(val);

    const searchplaylists = await playlistDB.searchbyusername(val);

    const resault = {
      users,
      tracks: resulttracks,
      albums: searchalbums,
      playlists: searchplaylists,
    };

    return resault;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function newtracksandalbum() {
  try {
    let albums = await albumDB.getallalbums();
    albums = albums
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, 20);

    const resaultAlbums = await Promise.all(
      albums.map(async (album) => {
        await Promise.all(
          album.tracks.map(async (track) => {
            track.artist = await User.findById(track.artistid);
            return track;
          })
        );
        return album;
      })
    );

    const tracks = await trackDB.getalltracks();

    let podcasts = tracks
      .filter(
        (e) =>
          e.status.toLowerCase() === "public" &&
          e.type.toLowerCase() === "podcast"
      )
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, 20);
    const resultPodcasts = await Promise.all(
      podcasts.map(async (e) => {
        e.artist = await User.findById(e.artist);
        return e;
      })
    );

    let musics = tracks.filter(
      (e) =>
        e.status.toLowerCase() === "public" && e.type.toLowerCase() === "music"
    );

    musics = await Promise.all(
      musics.map(async (e) => {
        e.artist = await User.findById(e.artist);
        return e;
      })
    );
    albums.map((album) => {
      album.tracks.forEach((track) => {
        if (track.status.toLowerCase() === "public") {
          track.cover = album.cover;
          musics.push(track);
        }
      });
    });

    const resaultMusic = musics
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(0, 20);

    return {
      newmusic: resaultMusic,
      newpodcast: resultPodcasts,
      newalbum: resaultAlbums,
    };
  } catch {
    return false;
  }
}

async function discover() {
  try {
    const banner = await baseDB.getbanner();
    const resbanner = await baseDB.getresbanner();
    const topgenre = await baseDB.gettopgenre();

    const users = await User.find({});
    const resaultusers = users
      .sort((a, b) => new Date(b.subscribe) - new Date(a.subscribe))
      .slice(0, 20);

    let playlists = await playlistDB.getallplaylists();
    playlists = playlists.filter(
      (e) => e.visibility.toLowerCase() === "public"
    );
    const resaultplaylists = playlists
      .sort((a, b) => new Date(b.plays) - new Date(a.plays))
      .slice(0, 20);

    const resault = {
      banner,
      resbanner,
      topgenre,
      topusers: resaultusers,
      topplaylists: resaultplaylists,
    };
    return resault;
  } catch {
    return false;
  }
}

async function toptracks() {
  try {
    let tracks = await trackDB.getalltracks();
    tracks = tracks.filter(
      (e) =>
        e.status.toLowerCase() === "public" && e.type.toLowerCase() === "music"
    );
    tracks = await Promise.all(
      tracks.map(async (track) => {
        track.artist = await getusernamebyid(track.artist);
        return track;
      })
    );

    const albums = await albumDB.getallalbums();

    await Promise.all(
      albums.map(async (album) => {
        await Promise.all(
          album.tracks.map(async (track) => {
            if (track.status.toLowerCase() === "public") {
              track.artist = await getusernamebyid(track.artistid);
              track.cover = album.cover;
              tracks.push(track);
            }
          })
        );
      })
    );

    tracks.sort((a, b) => b.plays - a.plays).slice(0, 30);
    return tracks;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getnotification(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);
    const notification = user.notification;
    return notification;
  } catch {
    return false;
  }
}

async function readnotification(token) {
  try {
    const decode = jwt.verify(token, process.env.REGISTER_JWT);
    const user = await User.findById(decode._id);

    if (!user) {
      throw new Error("User not found");
    }

    user.notification.forEach((e) => {
      e.seen = true;
    });

    user.markModified("notification");

    const newdata = await user.save();
    return newdata.notification;
  } catch  {
    return false;
  }
}

module.exports = {
  checkusername,
  checkemail,
  register,
  login,
  forgetpassword,
  verify,
  changepasswordbylink,
  getuser,
  changeusername,
  getallusers,
  changeadmin,
  addrequesttrack,
  addrequestalbum,
  addprofile,
  subscribe,
  changebio,
  checktrackandalbumname,
  savealbum,
  savetrack,
  changefavouritegenre,
  addsocialmedia,
  deletsocial,
  verifytrack,
  rejectrack,
  addrecomendeuser,
  removerecommandeuser,
  searchbyusername,
  favourite,
  checknameandalbum,
  deletetrack,
  edittrack,
  lastplay,
  notification,
  verifyalbum,
  rejectalbum,
  editalbum,
  deletealbum,
  deletacccount,
  loginback,
  changeverify,
  changebanupload,
  getrequests,
  verifyusers,
  getuserbyid,
  getuserbyusername,
  unsubscribe,
  getlastplay,
  like,
  unlike,
  removesavetrack,
  gettracks,
  editsocialmedia,
  getusernamebyid,
  addplaylist,
  deleteplaylist,
  removesavealbum,
  saveplaylist,
  removesaveplaylist,
  getLibrary,
  changeidtouser,
  topartist,
  getsavedtrack,
  getsavedalbum,
  getsavedplaylist,
  artist,
  fullsearch,
  newtracksandalbum,
  discover,
  toptracks,
  getnotification,
  readnotification,
};

//TODO check img home loaded

<template>
  <loader v-if="popups.loader" />
  <div v-else id="parent">
    <section class="content container px-5 mt-4">
      <section class="d-flex justify-content-between">
        <span class="text-uppercase color-blue fw-semibold fs-5">profile</span>
      </section>

      <section
        class="mt-4 d-flex flex-column justify-content-center align-items-center"
      >
        <div class="profile-parent d-flex gap-5 align-items-center">
          <input
            type="file"
            hidden
            id="profile"
            ref="profileinput"
            @change="changeprofile"
          />
          <label for="profile">
            <img
              v-if="user.profile"
              :src="user.profile"
              class="img-thumbnail rounded-circle"
              alt="" />
            <img
              v-else
              src="../../assets/img/icon.jpg"
              class="img-thumbnail rounded-circle"
              alt=""
          /></label>
        </div>
        <div class="mt-2 d-flex align-center follow-parent">
          <span
            class="color-gray text-capitalize fw-bold pointer"
            @click="goto(`/user/${user.username}/follower`)"
            >{{ user.subscribe ? user.subscribe.length : 0 }} followers</span
          >
          <span
            class="color-gray text-capitalize fw-bold pointer"
            @click="goto(`/user/${user.username}/following`)"
            >{{ user.artists ? user.artists.length : 0 }} following</span
          >
        </div>
      </section>
      <section
        class="bio-parent mt-4 rounded-4 mx-4 py-2 d-flex flex-column gap-2"
      >
        <textarea
          class="form-control text-capitalize text-secondary"
          name="textarea"
          id=""
          cols="10"
          rows="10"
          maxlength="500"
          placeholder="bio"
          ref="bio"
          :value="bio"
        ></textarea>
        <div class="d-flex justify-content-center">
          <button
            @click="changebio"
            class="btn btn-save px-3 py-2 text-white text-capitalize"
          >
            save
          </button>
        </div>
      </section>
      <section class="d-flex justify-content-center mt-4">
        <table class="table table-bordered w-75">
          <tr class="">
            <th
              class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
            >
              <img
                src="../../assets/icons/usernameinput.png"
                class="img-fluid pointer"
                alt=""
              />
              <span>username</span>
            </th>
            <th class="text-capitalize fw-semibold color-black text-center">
              <span class="me-3 text-capitalize">{{ user.username }}</span>
              <img
                src="../../assets/icons/change.png"
                class="img-fluid pointer"
                alt=""
                @click="goto('/settings')"
              />
            </th>
          </tr>
          <tr>
            <th
              class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
            >
              <img src="../../assets/icons/emailinput.png" alt="" />
              <span>email</span>
            </th>
            <th class="text-capitalize fw-semibold color-black text-center">
              <span class="text-capitalize">{{ user.email }}</span>
            </th>
          </tr>
          <tr>
            <th
              class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
            >
              <img src="../../assets/icons/verifyinput .png" alt="" />
              <span>verify</span>
            </th>
            <th class="text-capitalize fw-semibold color-black text-center">
              <img
                v-if="user.isverify"
                src="../../assets/icons/verify.png"
                alt=""
              />
              <img src="../../assets/icons/unverify.png" alt="" />
            </th>
          </tr>
          <tr>
            <th
              class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
            >
              <img src="../../assets/icons/banupload.png" alt="" />
              <span>upload status</span>
            </th>
            <th class="text-capitalize fw-semibold color-black text-center">
              <img
                v-if="!user.banupload"
                src="../../assets/icons/check.png"
                alt=""
              />
              <img v-else src="../../assets/icons/uncheck.png" alt="" />
            </th>
          </tr>
          <tr class="">
            <th
              class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5 favouritegenre-label"
            >
              <img src="../../assets/icons/favourite.png" alt="" />
              <span>favourite genre</span>
            </th>
            <th class="">
              <select
                name=""
                id=""
                class="form-select genre-select text-capitalize fw-semibold color-black text-center"
                @change="changefavouritegenre($event.target.value)"
              >
                <option
                  class="text-capitalize"
                  :selected="!user.favouriteGenre"
                  :disabled="user.favouriteGenre"
                >
                  not Different
                </option>
                <option
                  v-for="x in base.genres"
                  :key="x"
                  :selected="user.favouriteGenre == x.name"
                  class="text-capitalize"
                  :value="x.name"
                >
                  {{ x.name }}
                </option>
              </select>
            </th>
          </tr>
        </table>
      </section>
      <section class="mt-4">
        <div class="d-flex justify-content-center gap-5 select-box">
          <span
            @click="whichcomponent = 'request'"
            :class="
              whichcomponent == 'request'
                ? 'fw-bold text-capitalize pointer active-box p-1'
                : 'fw-bold text-capitalize pointer p-1 '
            "
            >request</span
          >

          <span
            @click="whichcomponent = 'socialmedia'"
            :class="
              whichcomponent == 'socialmedia'
                ? 'fw-bold text-capitalize pointer active-box p-1'
                : 'fw-bold text-capitalize pointer p-1 '
            "
            >social media</span
          >
          <span
            @click="whichcomponent = 'recommenduser'"
            :class="
              whichcomponent == 'recommenduser'
                ? 'fw-bold text-capitalize pointer active-box p-1'
                : 'fw-bold text-capitalize pointer p-1 '
            "
            >recommend user</span
          >
          <span
            @click="whichcomponent = 'detail'"
            :class="
              whichcomponent == 'detail'
                ? 'fw-bold text-capitalize pointer active-box p-1'
                : 'fw-bold text-capitalize pointer p-1 '
            "
            >detail</span
          >
        </div>
        <div v-if="whichcomponent == 'request'">
          <table class="table table-borderless mt-4">
            <tr>
              <th class="text-center text-capitalize fw-semibold">name</th>
              <th class="text-center text-capitalize fw-semibold">status</th>
              <th class="text-center text-capitalize fw-semibold">message</th>
            </tr>
            <tr v-for="x in user.requests" :key="x" class="request-parent">
              <th class="text-center text-capitalize">{{ x.name }}</th>
              <th class="text-center text-capitalize">
                <div>
                  <img
                    v-if="x.status == 'accept'"
                    src="../../assets/icons/check.png"
                    alt=""
                  />
                  <img
                    v-else-if="x.status == 'reject'"
                    src="../../assets/icons/uncheck.png"
                    alt=""
                  />
                  <img v-else src="../../assets/icons/pending.png" alt="" />
                </div>
              </th>
              <th class="text-center text-capitalize">
                <img
                  v-if="x.status == 'reject'"
                  class="pointer message-img"
                  @click="messageshowopener(x.msg)"
                  src="../../assets/icons/message.png"
                  alt=""
                />
                <img
                  v-else
                  class="message-img"
                  src="../../assets/icons/nomessage.png"
                  alt=""
                />
              </th>
            </tr>
            <messageshowpopup
              @close="popups.messageshow = false"
              v-if="popups.messageshow"
              :message="rejectmessage"
            />
            <tr class="pointer">
              <th
                class="text-center text-capitalize fw-semibold request-table-footer"
                colspan="4"
              >
                <div
                  class="d-flex justify-content-center align-items-center gap-1 btn-save"
                  @click="goto('/profile/requests')"
                >
                  <span class="text-white" @click="goto('/profile/requests')"
                    >see more</span
                  >
                  <svg
                    class="pointer ms-2 mt-1"
                    width="18"
                    height="6"
                    viewBox="0 0 18 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                    <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
                  </svg>
                </div>
              </th>
            </tr>
          </table>
        </div>

        <div v-else-if="whichcomponent == 'socialmedia'" class="mt-4">
          <div>
            <table class="table" v-if="user.socialmedia.length > 0">
              <tr>
                <th class="text-center text-capitalize fw-bold fs-5">icon</th>
                <th class="text-center text-capitalize fw-bold fs-5">link</th>
                <th class="text-center text-capitalize fw-bold fs-5">title</th>
                <th class="text-center text-capitalize fw-bold fs-5">edit</th>
              </tr>
              <tr
                class="align-middle"
                v-for="(x, i) in user.socialmedia"
                :key="x"
              >
                <th class="text-center text-capitalize">
                  <img
                    :src="
                      x.iconlink
                        ? x.iconlink
                        : require('../../assets/icons/earth.png')
                    "
                    class="socialmedia-icon"
                    alt=""
                  />
                </th>
                <th class="text-center text-capitalize socialmedia-link">
                  {{ x.link }}
                </th>
                <th class="text-center text-capitalize socialmedia-title">
                  {{ x.title }}
                </th>
                <th
                  class="text-center text-capitalize"
                  @click="editsocialmediaopener(x, i)"
                >
                  <img src="../../assets/icons/edit.png" class="pointer" />
                </th>
              </tr>
              <tr>
                <th
                  @click="goto('/profile/socialmedia')"
                  class="text-center text-capitalize fw-semibold request-table-footer pointer"
                  colspan="4"
                >
                  <div
                    class="d-flex justify-content-center align-items-center gap-1 btn-add"
                  >
                    <span class="text-white">see more</span>
                    <svg
                      class="pointer ms-2 mt-1"
                      width="18"
                      height="6"
                      viewBox="0 0 18 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                      <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
                    </svg>
                  </div>
                </th>
              </tr>
            </table>
          </div>
          <form action="" class="mt-3 d-flex flex-column gap-3 py-3">
            <div class="d-flex gap-4 flex">
              <div
                class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3 w-75"
              >
                <input
                  ref="socialmedialink"
                  type="text"
                  name=""
                  class="form-control text-capitalize"
                  maxlength="25"
                  id=""
                  placeholder="enter link"
                />
              </div>
              <div
                class="d-flex align-items-center justify-content-between px-3 input-parent rounded-3"
              >
                <input
                  type="text"
                  ref="socialmediatitle"
                  name=""
                  class="form-control text-capitalize"
                  maxlength="25"
                  id=""
                  placeholder="enter title"
                />
              </div>
            </div>
            <div
              class="select-parent rounded-3 d-flex align-items-center justify-content-center"
            >
              <select class="form-select text-capitalize" ref="socialmediaicon">
                <option class="text-capitalize text-center">select icon</option>
                <option
                  class="text-capitalize text-center"
                  v-for="x in base.socialicon"
                  :key="x"
                  :value="x.name"
                >
                  {{ x.name }}
                </option>
              </select>
            </div>
            <div class="d-flex justify-content-center">
              <button
                @click.prevent="savenewsocial"
                class="btn px-3 w-100 py-2 btn-save text-white fw-semibold fs-6 text-capitalize"
              >
                Add social media
              </button>
            </div>
          </form>
          <editsocialmediapopup
            :data="editsociladata"
            v-if="popups.editsocialmedia"
            @close="popups.editsocialmedia = false"
            @save="editsocialmedia"
          />
        </div>
        <div
          v-else-if="whichcomponent == 'recommenduser'"
          class="mt-4 d-flex justify-content-center align-items-center flex-column gap-1"
        >
          <div
            class="search-parent d-flex rounded-3 px-2 py-1 justify-content-between mt-1 ms-3 align-items-center"
          >
            <input
              type="text"
              class="search-input"
              maxlength="43"
              placeholder="Search ..."
              ref="searchinput"
            />
            <svg
              class="search-icon pointer"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="searchuser(this.$refs.searchinput)"
            >
              <path
                d="M19 19L13.8571 13.8571M8.71429 16.4286C4.4538 16.4286 1 12.9748 1 8.71429C1 4.4538 4.4538 1 8.71429 1C12.9748 1 16.4286 4.4538 16.4286 8.71429C16.4286 12.9748 12.9748 16.4286 8.71429 16.4286Z"
                stroke="#B3B3BC"
                stroke-width="2"
              />
            </svg>
          </div>
          <div
            class="rounded-3 search-resault p-2"
            v-if="searchuserdata.length > 0"
          >
            <div
              v-for="x in searchuserdata"
              :key="x"
              class="search-resault-child p-1 px-3 d-flex justify-content-between"
            >
              <div class="d-flex gap-4">
                <img
                  :src="
                    x.profile ? x.profile : require('../../assets/img/icon.jpg')
                  "
                  class="img-fluid rounded-circle"
                  alt=""
                />
                <div class="d-flex flex-column align-items-center">
                  <span class="text-capitalize fw-semibold">{{
                    x.username
                  }}</span>
                  <span class="text-capitalize color-gray"
                    >{{ formatview(x.subscribe.length) }} follower</span
                  >
                </div>
              </div>
              <button
                @click="addrecommenduser(x._id)"
                class="px-3 py-2 text-white btn-add rounded-3"
              >
                Add
              </button>
            </div>
          </div>
          <div
            class="mt-3 d-flex justify-content-center align-items-center recommend flex-column"
          >
            <div
              v-for="x in user.recommendUser"
              :key="x"
              class="recommend-child w-100 p-1 px-3 d-flex justify-content-between"
            >
              <div class="d-flex gap-4">
                <img
                  :src="
                    x.profile ? x.profile : require('../../assets/img/icon.jpg')
                  "
                  class="img-fluid rounded-circle"
                  alt=""
                />
                <div class="d-flex flex-column align-items-center">
                  <span class="text-capitalize fw-semibold">{{
                    x.username
                  }}</span>
                  <span class="text-capitalize color-gray"
                    >{{ formatview(x.subscribe.length) }} follower</span
                  >
                </div>
              </div>
              <button
                @click="removerecommenduser(x._id)"
                class="px-3 py-2 text-white btn-add rounded-3 text-capitalize"
              >
                remove
              </button>
            </div>
          </div>
          <div
            @click="goto('/profile/recomenduser')"
            class="text-center text-capitalize fw-semibold d-flex align-items-center justify-content-center pointer w-100 more-recomenduser"
          >
            <div
              class="d-flex justify-content-center align-items-center gap-1 btn-add"
            >
              <span class="text-white">see more</span>
              <svg
                class="pointer ms-2 mt-1"
                width="18"
                height="6"
                viewBox="0 0 18 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="3" fill="#B3B3BC" />
                <circle cx="15" cy="3" r="3" fill="#B3B3BC" />
              </svg>
            </div>
          </div>
        </div>

        <div
          v-else
          class="mt-4 d-flex justify-content-center align-items-center"
        >
          <table class="table table-bordered w-75">
            <tr class="">
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>total view</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                <span class="">{{ analyze.totalview }}</span>
              </th>
            </tr>

            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>albums</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                <span> {{ analyze.albumlenght }}</span>
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>musics</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.musiclenght }}
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>podcast</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.podcastlenght }}
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>playlist</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.playlistlenght }}
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>best music</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.bestmusic }}
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>best album</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.bestalbum }}
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>best podcast</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.bestpodcast }}
              </th>
            </tr>
            <tr>
              <th
                class="text-uppercase text-center d-flex justify-content-start align-items-center gap-5"
              >
                <span>best playlist</span>
              </th>
              <th class="text-capitalize fw-semibold color-black text-center">
                {{ analyze.bestplaylist }}
              </th>
            </tr>
          </table>
        </div>
        <div></div>
      </section>
    </section>
  </div>
</template>

<script>
import Register from "../Register.vue";
import axios from "axios";
import info from "../../../default";
import iziToast from "izitoast";

import messageshowpopup from "../profile components/messageshowpopup.vue";
import editsocialmediapopup from "../profile components/editsocialmediapopup.vue";
import loader from "../loader.vue";

export default {
  name: "profile",
  mounted() {
    this.getdata();
  },
  data() {
    return {
      apiaddress: info.Api_ADDRESS,
      whichcomponent: "request",
      user: [],
      base: [],
      searchuserdata: [],
      popups: {
        loader: true,
        messageshow: false,
        reloadheader: false,
        editsocialmedia: false,
      },
      rejectmessage: null,
      editsociladata: null,
      editsocialcount: null,
      analyze: [],
      bio: null,
    };
  },
  watch: {
    whichcomponent: {
      handler(newData) {
        if (newData === "detail") {
          this.analyzer();
        }
      },
    },
  },
  methods: {
    goto: function (e) {
      location.href = e;
    },
    getdata: function () {
      axios
        .get(`${this.apiaddress}users/user`, {
          headers: {
            jwt: Register.methods.getcookies("jwt"),
          },
        })
        .then((res) => {
          this.user = res.data;
          this.user.requests = this.user.requests.slice(0, 3);
          this.user.socialmedia = this.user.socialmedia.slice(0, 3);
          this.popups.loader = false;

          axios.get(`${this.apiaddress}base/`).then((data) => {
            this.base = data.data;
          });

          this.bio = this.user.bio;
        });
    },
    changeprofile: function () {
      const formData = new FormData();
      formData.append("objectKey", this.$refs.profileinput.files[0]);
      formData.append("id", this.user._id);

      axios.post(`${this.apiaddress}upload/profile`, formData).then((res) => {
        if (res.data.status == "success") {
          iziToast.success({
            message: res.data.msg,

            position: "topRight",
          });
          this.popups.reloadheader = !this.popups.reloadheader;

          this.getdata();
        }
      });
    },
    changebio: function () {
      axios
        .put(
          `${this.apiaddress}users/bio`,
          {
            text: this.$refs.bio.value,
          },
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            iziToast.success({
              message: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    changefavouritegenre: function (e) {
      axios
        .put(
          `${this.apiaddress}users/favouritegenre/${e}`,
          {},
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            this.getdata();
          }
        });
    },
    messageshowopener: function (e) {
      this.rejectmessage = e;
      this.popups.messageshow = true;
    },
    savenewsocial: function () {
      if (this.user.socialmedia < 7) {
        if (
          this.$refs.socialmedialink.value &&
          this.$refs.socialmediaicon.value &&
          this.$refs.socialmediatitle.value
        ) {
          axios
            .put(
              `${this.apiaddress}users/addsocial`,
              {
                link: this.$refs.socialmedialink.value,
                icon: this.$refs.socialmediaicon.value,
                title: this.$refs.socialmediatitle.value,
              },
              {
                headers: {
                  jwt: Register.methods.getcookies("jwt"),
                },
              }
            )
            .then((res) => {
              if (res.data) {
                iziToast.success({
                  title: res.data.msg,
                  position: "topRight",
                });
                this.clearsocialinputs();
                this.getdata();
              } else {
                iziToast.error({
                  title: res.data.msg,
                  position: "topRight",
                });
              }
            });
        }
      } else {
        iziToast.error({
          title: "You Reached limit",
          position: "topRight",
        });
      }
    },
    clearsocialinputs: function () {
      this.$refs.socialmedialink.value = null;
      this.$refs.socialmediaicon.value = null;
      this.$refs.socialmediatitle.value = null;
    },
    editsocialmediaopener: function (data, count) {
      this.editsocialcount = count;
      this.editsociladata = data;
      this.popups.editsocialmedia = true;
    },
    editsocialmedia: function (data) {
      this.user.socialmedia[this.editsocialcount] = data;
      axios
        .put(
          `${this.apiaddress}users/editsocial`,
          {
            data: this.user.socialmedia,
          },
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.getdata();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    searchuser: function (value) {
      axios.get(`${this.apiaddress}users/search/${value}`).then((res) => {
        if (res.data) {
          this.searchuserdata = res.data;

          const thisuserindex = this.searchuserdata.findIndex((e) => {
            return e.username === this.user.username;
          });

          thisuserindex >= 0
            ? this.searchuserdata.splice(thisuserindex, 1)
            : null;

          if (this.user.recommendUser.length > 0) {
            this.user.recommendUser.forEach((recommendUser) => {
              const recommendUserIndex = this.searchuserdata.findIndex(
                (e) => e.username === recommendUser.username
              );
              if (recommendUserIndex >= 0) {
                this.searchuserdata.splice(recommendUserIndex, 1);
              }
            });
          }
        }
      });
    },
    addrecommenduser: function (id) {
      if (this.user.recommendUser.length < 5) {
        axios
          .put(
            `${this.apiaddress}users/addrecommanduser/${id}`,
            {},
            {
              headers: {
                jwt: Register.methods.getcookies("jwt"),
              },
            }
          )
          .then((res) => {
            if (res.data) {
              iziToast.success({
                title: res.data.msg,
                position: "topRight",
              });
              this.$refs.searchinput.value = null;
              this.searchuserdata = [];
              this.getdata();
            } else {
              iziToast.error({
                title: res.data.msg,
                position: "topRight",
              });
            }
          });
      } else {
        iziToast.error({
          title: "You Reached limit",
          position: "topRight",
        });
      }
    },
    removerecommenduser: function (id) {
      axios
        .put(
          `${this.apiaddress}users/removerecommanduser/${id}`,
          {},
          {
            headers: {
              jwt: Register.methods.getcookies("jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data) {
            iziToast.success({
              title: res.data.msg,
              position: "topRight",
            });
            this.$refs.searchinput.value = null;
            this.searchuserdata = [];
            this.getdata();
          } else {
            iziToast.error({
              title: res.data.msg,
              position: "topRight",
            });
          }
        });
    },
    formatview: function (number) {
      if (number >= 1e6) {
        return (number / 1e6).toFixed(0) + "M";
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(0) + "K";
      } else {
        return number;
      }
    },
    analyzer: function () {
      let library = [];
      let musiclibrary = [];
      let podcastlibrary = [];
      let albumtracklibrary = [];
      let albumlibrary = [];
      let playlistlibrary = [];

      if (this.user.tracks.length > 0) {
        this.user.tracks.forEach((e) => {
          if (e.type == "music") {
            musiclibrary.push(e);
          } else {
            podcastlibrary.push(e);
          }
          library.push(e);
        });
      }

      if (this.user.albums.length > 0) {
        this.user.albums.forEach((album) => {
          albumlibrary.push(album);
          library.push(album);
          album.tracks.forEach((track) => {
            albumtracklibrary.push(track);
            library.push(track);
          });
        });
      }

      if (this.user.playlists.length > 0) {
        playlistlibrary = this.user.playlists;
        playlistlibrary.forEach((playlist) => {
          library.push(playlist);
        });
      }

      this.analyze.totalview = library.reduce(
        (newvalue, currentvalue) => newvalue + currentvalue.plays,
        0
      );

      this.analyze.albumlenght = albumlibrary.length;
      this.analyze.musiclenght = musiclibrary.length;
      this.analyze.podcastlenght = podcastlibrary.length;
      this.analyze.playlistlenght = playlistlibrary.length;

      musiclibrary.length > 1
        ? (this.analyze.bestmusic = musiclibrary.reduce((prev, current) => {
            return prev.plays > current.plays ? prev : current;
          }).name)
        : (this.analyze.bestmusic = "---");

      podcastlibrary.length > 1
        ? (this.analyze.bestpodcast = podcastlibrary.reduce((prev, current) =>
            prev.plays > current.plays ? prev.name : current.name
          ))
        : (this.analyze.bestpodcast = "---");

      albumlibrary.length > 1
        ? (this.analyze.bestalbum = albumlibrary.reduce((prev, current) =>
            prev.plays > current.plays ? prev.name : current.name
          ))
        : (this.analyze.bestalbum = "---");

      playlistlibrary.length > 1
        ? (this.analyze.bestplaylist = playlistlibrary.reduce((prev, current) =>
            prev.plays > current.plays ? prev.name : current.name
          ))
        : (this.analyze.bestplaylist = "---");
    },
  },
  components: {
    messageshowpopup,
    editsocialmediapopup,
    loader,
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}

.profile-parent img {
  width: 110px;
  height: 110px;
  cursor: pointer;
}

hr {
  border-bottom: 2px solid #4343ef;
}
.follow-parent {
  gap: 85px;
}
.follow-parent span {
  font-size: 14px !important;
  height: 22px;
}
.follow-parent span:hover {
  border-bottom: 1px solid var(--blue-main) !important;
}

.favouritegenre-label {
  margin-top: 10px;
}

.request-table-footer,
.more-recomenduser {
  background-color: var(--blue-main);
  color: white;
}
.more-recomenduser {
  height: 40px;
}
.active-box {
  border-bottom: 2px solid var(--blue-main) !important;
}

.socialmedia-icon {
  width: 38px;
  width: 38px;
}
.socialmedia-link {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.socialmedia-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

.form-control,
.form-select {
  border: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}
.form-control:focus,
.form-select:focus {
  outline: none;
  box-shadow: none;
}

.input-parent {
  border: 2px solid var(--blue-main);
  width: 450px;
}
.select-parent select {
  border: 2px solid var(--blue-main);
}
.select-parent span {
  border-bottom: 2px solid var(--blue-main);
}
.btn-save,
.btn-add {
  background-color: var(--blue-main);
}

.search-parent {
  width: 600px;
  height: 33px;
  border: 1px solid var(--gray-main);
}

.search-resault {
  background-color: rgba(46, 46, 46, 0.2);
  margin-left: 15px;
  width: 600px;
  overflow: scroll;
  height: 200px;
}
.search-resault-child img,
.recommend img {
  width: 50px;
}
.recommend {
  width: 600px;
}
.search-resault-child:not(:nth-last-child()) {
  border-bottom: 2px solid var(--blue-main);
}

.bio-parent {
  border: 2px solid var(--blue-main);
}
textarea {
  resize: none;
  height: 200px;
}

@media screen and (max-width: 767px) {
  #parent {
    margin-bottom: 68px;
  }
  .profile-parent img {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  .follow-parent {
    gap: 60px;
  }
  textarea {
    height: 100px;
  }
  .btn-save {
    padding: 4px 12px !important;
  }
  .table {
    width: 100% !important;
  }
  .table th {
    gap: 10px !important;
    font-size: 13px !important;
  }
  .table img {
    width: 36px;
    height: 36px;
  }

  .select-box {
    font-size: 14px !important;
    gap: 10px !important;
  }
  .request-parent img {
    width: 24px;
    height: 24px;
  }
  .message-img {
    width: 36px !important;
    height: 36px !important;
  }
  .search-parent {
    width: 95%;
  }
  .search-resault,
  .recommend-child {
    width: 70% !important;
  }
  .search-resault-child img,
  .recommend img {
    width: 50px;
    height: 50px;
  }
}
</style>

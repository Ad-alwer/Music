<template>
  <div id="parent">
    <ul class="d-flex flex-column justify-content-start mt-3">
      <li class="menu-title d-flex justify-content-start">menu</li>
      <li
        @click.prevent="change('users')"
        :class="
          component == 'users'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <i :class="component =='users' ? 'fas fa-users color-blue' : 'fas fa-users text-secondary'"></i>

        <a href="">users</a>
      </li>
      <li
        @click.prevent="change('requests')"
        :class="
          component == 'requests'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <i :class="component =='requests' ? 'fas fa-question color-blue' : 'fas fa-question text-secondary'"></i>

        <a href="">requests</a>
      </li>
      <li
        @click.prevent="change('verify')"
        :class="
          component == 'verify'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <i :class="component =='verify' ? 'fa-solid fa-check-to-slot color-blue' : 'fa-solid fa-check-to-slot text-secondary'"></i>
        <a href="">verify</a>
      </li>
      <li
        @click.prevent="change('home')"
        :class="
          component == 'home'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          class=""
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.34709 0.128396C8.14736 -0.0427988 7.85264 -0.0427988 7.65291 0.128396L0 6.68804V14.4C0 15.2837 0.716344 16 1.6 16H5.86667C6.16122 16 6.4 15.7612 6.4 15.4667V12.2667C6.4 11.383 7.11634 10.6667 8 10.6667C8.88366 10.6667 9.6 11.383 9.6 12.2667V15.4667C9.6 15.7612 9.83878 16 10.1333 16H14.4C15.2837 16 16 15.2837 16 14.4V6.68804L8.34709 0.128396Z"
            :fill="component == 'home' ? '#4343ef':'#787887'"
          />
        </svg>
        <a href="" class="pt-1">home</a>
      </li>

      <li
        class="menu-title py-2 text-capitalize d-flex justify-content-start align-items-center gap-3"
      >
        analyze
      </li>
      <li
        @click.prevent="change('analyzeTopArtist')"
        :class="
          component == 'analyzeTopArtist'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
      <img
          v-if="component == 'analyzeTopArtist'"
          src="../../assets/icons/upload-blue.png"
          class="img-fluid upload-img"
          alt=""
        />
        <img
          v-else
          src="../../assets/icons/upload.png"
          class="img-fluid upload-img"
          alt=""
        />
        <a href="">top artist</a>
      </li>
      <li
        @click.prevent="change('analyzeTopMusic')"
        :class="
          component == 'analyzeTopMusic'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 0.592676V10.9568C16.0011 11.5523 15.7872 12.131 15.3923 12.6009C14.9973 13.0709 14.444 13.405 13.8204 13.5504C13.1967 13.6957 12.5385 13.6437 11.9504 13.4028C11.3623 13.1619 10.878 12.7459 10.5747 12.2209C10.2713 11.6958 10.1662 11.0919 10.2761 10.5052C10.3859 9.91853 10.7045 9.38268 11.1811 8.9829C11.6577 8.58312 12.265 8.34235 12.9064 8.29888C13.5477 8.25542 14.1864 8.41175 14.7208 8.74301V4.31206L5.76634 6.38488V13.3257C5.76746 13.9212 5.55354 14.4999 5.1586 14.9698C4.76366 15.4398 4.21038 15.774 3.58673 15.9193C2.96308 16.0646 2.30487 16.0127 1.71676 15.7718C1.12865 15.5309 0.644396 15.1148 0.34101 14.5898C0.0376244 14.0648 -0.0674803 13.4609 0.0424085 12.8742C0.152297 12.2875 0.470871 11.7516 0.947473 11.3518C1.42408 10.9521 2.03134 10.7113 2.67272 10.6678C3.31409 10.6244 3.95275 10.7807 4.48714 11.112V2.96162C4.48717 2.82954 4.53489 2.70126 4.62273 2.59719C4.71057 2.49312 4.83347 2.41924 4.97188 2.3873L15.2055 0.0183566C15.2997 -0.00402868 15.3982 -0.00596793 15.4933 0.0126901C15.5884 0.0313482 15.6776 0.0700992 15.7539 0.125921C15.8305 0.18135 15.8924 0.252176 15.935 0.333041C15.9777 0.413906 15.9999 0.50269 16 0.592676Z"
            :fill="component == 'analyzeTopMusic' ? '#4343ef':'#787887'"
          />
        </svg>
        <a href="">top music</a>
      </li>
      <li
        @click.prevent="change('analyzeTopPodcast')"
        :class="
          component == 'analyzeTopPodcast'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <img
          v-if="component == 'analyzeTopPodcast'"
          class="podcast-img"
          src="../../assets/icons/podcast-blue.png"
          alt=""
        />
        <img
          v-else
          class="podcast-img"
          src="../../assets/icons/podcast.png"
          alt=""
        />

        <a href="" class="podcast-a">top podcast</a>
      </li>
      <li
        @click.prevent="change('analyzeTopAlbum')"
        :class="
          component == 'analyzeTopAlbum'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8 0H3.4C2.4352 0 1 0.6392 1 2.4V13.6C1 15.3608 2.4352 16 3.4 16H15.4V14.4H3.4096C3.04 14.3904 2.6 14.2448 2.6 13.6C2.6 13.5192 2.6072 13.4472 2.6192 13.3816C2.7088 12.9208 3.0864 12.808 3.4096 12.8H15.4V1.6C15.4 1.17565 15.2314 0.768687 14.9314 0.468629C14.6313 0.168571 14.2243 0 13.8 0ZM13.8 7.2L12.2 6.4L10.6 7.2V1.6H13.8V7.2Z"
            :fill="component == 'analyzeTopAlbum' ? '#4343ef':'#787887'"
          />
        </svg>
        <a href=""> top album</a>
      </li>
      <li
        @click.prevent="change('analyzeTopPlaylist')"
        :class="
          component == 'analyzeTopPlaylist'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
        >
          <path
            d="M0 0 C15.18 0 30.36 0 46 0 C46 10.56 46 21.12 46 32 C30.82 32 15.64 32 0 32 C0 21.44 0 10.88 0 0 Z M19 11 C19 14.3 19 17.6 19 21 C21.64 19.68 24.28 18.36 27 17 C27 16.34 27 15.68 27 15 C24.36 13.68 21.72 12.36 19 11 Z "
            :fill="component == 'analyzeTopPlaylist' ? '#4343ef':'#787887'"
            transform="translate(2,13)"
          />
          <path
            d="M0 0 C12.21 0 24.42 0 37 0 C37 0.66 37 1.32 37 2 C24.79 2 12.58 2 0 2 C0 1.34 0 0.68 0 0 Z "
            :fill="component == 'analyzeTopPlaylist' ? '#4343ef':'#787887'"
            transform="translate(6,9)"
          />
          <path
            d="M0 0 C8.91 0 17.82 0 27 0 C27 0.66 27 1.32 27 2 C18.09 2 9.18 2 0 2 C0 1.34 0 0.68 0 0 Z "
            :fill="component == 'analyzeTopPlaylist' ? '#4343ef':'#787887'"
            transform="translate(11,5)"
          />
        </svg>
        <a href="">top playlists</a>
      </li>
      <li class="menu-title my-2">others</li>
      <li
        @click.prevent="goto('/')"
        class="py-2 text-capitalize d-flex justify-content-start align-items-center gap-3"
      >
        <i class="fas fa-arrow-left text-secondary"></i>
        <a href="">back</a>
      </li>

      <li
        @click.prevent="goto('/login')"
        class="py-2 text-capitalize d-flex justify-content-start align-items-center gap-3"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 3.90146V12.6282C0 13.4317 0.334784 14.1459 0.870439 14.7038C1.40609 15.2395 2.09798 15.5296 2.90146 15.5296H7.27598V13.7218H2.90146C2.29885 13.7218 1.83015 13.2308 1.83015 12.6282V3.90146C1.83015 3.29885 2.29885 2.83015 2.90146 2.83015H7.27598V1H2.90146C2.09798 1 1.40609 1.31247 0.870439 1.84812C0.334784 2.40609 0 3.09798 0 3.90146ZM4.79857 6.5351V10.0169C4.79857 10.4186 5.15568 10.7534 5.55742 10.7534H9.59715V13.4986C9.59715 13.7441 9.73106 13.945 9.95425 14.0566C10.0435 14.0789 10.1328 14.0789 10.1774 14.0789C10.3337 14.0789 10.4676 14.0343 10.5792 13.9227L15.8241 8.67772C16.0696 8.47685 16.0473 8.07511 15.8241 7.85192L10.5792 2.62928C10.2667 2.2945 9.59715 2.49537 9.59715 3.03102V5.79857H5.55742C5.15568 5.79857 4.79857 6.13336 4.79857 6.5351Z"
            fill="#787887"
          />
        </svg>
        <a href="/login">logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "hmmenu",
  data() {
    return {};
  },
  methods: {
    change: function (e) {
      this.$emit("change", e);
    },
    goto: function (e) {
      location.href = `${e}`;
    },
  },
  component: {},
  props: ["component"],
};
</script>
<style scoped>

li {
  cursor: pointer;
  margin-left: 32%;
}
#parent {
  overflow: hidden;
}
.menu-title {
  margin-top: 2%;
  font-weight: 600;
  text-transform: uppercase;
}

a {
  text-decoration: none;
  font-weight: 800;

  color: var(--gray-main);
}
svg {
  width: 16px;
  height: 16px;
}
img {
  fill: #787887 !important;
}
.podcast-img {
  width: 20px;
  height: 20px;
}
a {
  cursor: pointer;
  margin-left: -2px;
}

.active {
  border-right: 4px solid var(--blue-main);
}
.active a {
  color: var(--blue-main);
}
.podcast-a{
  position: relative;
  left: -5px;
}
</style>

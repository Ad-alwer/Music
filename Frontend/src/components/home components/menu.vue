<template>
  <div id="parent">
    <ul class="d-flex flex-column justify-content-start mt-1">
      <li class="menu-close mt-4 mb-3 ps- d-none">
        <i
          class="fas fa-solid fa-close text-secondary pointer fs-5"
          @click="sidemenu"
        ></i>
      </li>

      <li class="menu-title d-flex justify-content-start">menu</li>
      <li
        @click.prevent="change('discover')"
        :class="
          component == 'discover'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 '
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
            d="M8.34709 0.128396C8.14736 -0.0427988 7.85264 -0.0427988 7.65291 0.128396L0 6.68804V14.4C0 15.2837 0.716344 16 1.6 16H5.86667C6.16122 16 6.4 15.7612 6.4 15.4667V12.2667C6.4 11.383 7.11634 10.6667 8 10.6667C8.88366 10.6667 9.6 11.383 9.6 12.2667V15.4667C9.6 15.7612 9.83878 16 10.1333 16H14.4C15.2837 16 16 15.2837 16 14.4V6.68804L8.34709 0.128396Z"
            :fill="component == 'discover' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">discover</a>
      </li>
      <li
        @click.prevent="change('explore')"
        :class="
          component == 'explore'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 '
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 0C3.5816 0 0 3.5816 0 8C0 12.4184 3.5816 16 8 16C12.4184 16 16 12.4184 16 8C16 3.5816 12.4184 0 8 0ZM12.1528 4.8592C12.1998 4.71824 12.2066 4.56698 12.1725 4.42236C12.1384 4.27775 12.0646 4.14549 11.9596 4.04043C11.8545 3.93536 11.7223 3.86163 11.5776 3.8275C11.433 3.79337 11.2818 3.80019 11.1408 3.8472L6.0496 5.544C5.93188 5.58329 5.82492 5.64942 5.73717 5.73717C5.64942 5.82492 5.58329 5.93188 5.544 6.0496L3.8472 11.1408C3.80019 11.2818 3.79337 11.433 3.8275 11.5776C3.86163 11.7223 3.93536 11.8545 4.04043 11.9596C4.14549 12.0646 4.27775 12.1384 4.42236 12.1725C4.56698 12.2066 4.71824 12.1998 4.8592 12.1528L9.9504 10.456C10.0682 10.4166 10.1752 10.3504 10.263 10.2625C10.3507 10.1746 10.4168 10.0675 10.456 9.9496L12.1528 4.8592ZM8 8.8C8.21217 8.8 8.41566 8.71571 8.56569 8.56569C8.71571 8.41566 8.8 8.21217 8.8 8C8.8 7.78783 8.71571 7.58434 8.56569 7.43431C8.41566 7.28429 8.21217 7.2 8 7.2C7.78783 7.2 7.58434 7.28429 7.43431 7.43431C7.28429 7.58434 7.2 7.78783 7.2 8C7.2 8.21217 7.28429 8.41566 7.43431 8.56569C7.58434 8.71571 7.78783 8.8 8 8.8Z"
            :fill="component == 'explore' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">explore</a>
      </li>
      <li
        @click.prevent="change('search')"
        :class="
          component == 'search'
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
            d="M15 15L11 11M7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 10.3137 10.3137 13 7 13Z"
            :stroke="component == 'search' ? '#4343ef' : '#787887'"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <a href="">search</a>
      </li>
      <li
        class="menu:-title component == 'search' ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active' :'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'"
      >
        library
      </li>
      <li
        @click.prevent="change('laibrarytrack')"
        :class="
          component == 'laibrarytrack'
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
            :fill="component == 'laibrarytrack' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">track</a>
      </li>

      <li
        @click.prevent="change('laibraryalbum')"
        :class="
          component == 'laibraryalbum'
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
            :fill="component == 'laibraryalbum' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">albums</a>
      </li>
      <li
        @click.prevent="change('laibraryplaylist')"
        :class="
          component == 'laibraryplaylist'
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
            :fill="component == 'laibraryplaylist' ? '#4343ef' : '#787887'"
            transform="translate(2,13)"
          />
          <path
            d="M0 0 C12.21 0 24.42 0 37 0 C37 0.66 37 1.32 37 2 C24.79 2 12.58 2 0 2 C0 1.34 0 0.68 0 0 Z "
            :fill="component == 'laibraryplaylist' ? '#4343ef' : '#787887'"
            transform="translate(6,9)"
          />
          <path
            d="M0 0 C8.91 0 17.82 0 27 0 C27 0.66 27 1.32 27 2 C18.09 2 9.18 2 0 2 C0 1.34 0 0.68 0 0 Z "
            :fill="component == 'laibraryplaylist' ? '#4343ef' : '#787887'"
            transform="translate(11,5)"
          />
        </svg>
        <a href="">playlists</a>
      </li>
      <li
        @click.prevent="change('laibraryartist')"
        :class="
          component == 'laibraryartist'
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
            d="M8 8C10.2094 8 12 6.20937 12 4C12 1.79063 10.2094 0 8 0C5.79063 0 4 1.79063 4 4C4 6.20937 5.79063 8 8 8ZM10.8 9H10.2781C9.58437 9.31875 8.8125 9.5 8 9.5C7.1875 9.5 6.41875 9.31875 5.72188 9H5.2C2.88125 9 1 10.8813 1 13.2V14.5C1 15.3281 1.67188 16 2.5 16H13.5C14.3281 16 15 15.3281 15 14.5V13.2C15 10.8813 13.1187 9 10.8 9Z"
            :fill="component == 'laibraryartist' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">artists</a>
      </li>

      <li
        class="menu:-title component == 'search' ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active' :'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'"
      >
        publish
      </li>
      <li
        @click.prevent="change('upload')"
        :class="
          component == 'upload'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <img
          v-if="component == 'upload'"
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
        <a href="">Upload</a>
      </li>
      <li
        @click.prevent="change('publishmusic')"
        :class="
          component == 'publishmusic'
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
            :fill="component == 'publishmusic' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">music</a>
      </li>
      <li
        @click.prevent="change('publishpodcast')"
        :class="
          component == 'publishpodcast'
            ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active'
            : 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'
        "
      >
        <img
          v-if="component == 'publishpodcast'"
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

        <a href="">podcast</a>
      </li>
      <li
        @click.prevent="change('publishalbum')"
        :class="
          component == 'publishalbum'
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
            :fill="component == 'publishalbum' ? '#4343ef' : '#787887'"
          />
        </svg>
        <a href="">album</a>
      </li>
      <li
        @click.prevent="change('publishplaylist')"
        :class="
          component == 'publishplaylist'
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
            :fill="component == 'publishplaylist' ? '#4343ef' : '#787887'"
            transform="translate(2,13)"
          />
          <path
            d="M0 0 C12.21 0 24.42 0 37 0 C37 0.66 37 1.32 37 2 C24.79 2 12.58 2 0 2 C0 1.34 0 0.68 0 0 Z "
            :fill="component == 'publishplaylist' ? '#4343ef' : '#787887'"
            transform="translate(6,9)"
          />
          <path
            d="M0 0 C8.91 0 17.82 0 27 0 C27 0.66 27 1.32 27 2 C18.09 2 9.18 2 0 2 C0 1.34 0 0.68 0 0 Z "
            :fill="component == 'publishplaylist' ? '#4343ef' : '#787887'"
            transform="translate(11,5)"
          />
        </svg>
        <a href="">playlists</a>
      </li>

      <li
        class="menu:-title component == 'search' ? 'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3 active' :'py-2 text-capitalize d-flex justify-content-start align-items-center gap-3'"
      >
        others
      </li>
      <li
        @click.prevent="change('settings')"
        :class="
          component == 'settings'
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
            d="M8.00334 9.19561C8.66609 9.19561 9.20334 8.65861 9.20334 7.99618C9.20334 7.33376 8.66609 6.79675 8.00334 6.79675C7.3406 6.79675 6.80334 7.33376 6.80334 7.99618C6.80334 8.65861 7.3406 9.19561 8.00334 9.19561Z"
            :fill="component == 'discover' ? '#4343ef' : '#787887'"
          />
          <path
            d="M15.9153 6.65283L15.2833 4.63779C15.2151 4.40491 15.1006 4.18814 14.9468 4.00043C14.7929 3.81272 14.6028 3.65791 14.3878 3.54522C14.1728 3.43254 13.9372 3.3643 13.6953 3.34456C13.4533 3.32483 13.2098 3.35401 12.9793 3.43037L12.7073 3.51832C12.4943 3.58873 12.2673 3.60659 12.0458 3.57039C11.8243 3.53419 11.6149 3.445 11.4353 3.31042L11.3473 3.24645C11.1721 3.11242 11.0309 2.9391 10.935 2.74048C10.8391 2.54186 10.7913 2.32349 10.7953 2.103V1.8791C10.7992 1.37696 10.6036 0.893807 10.2513 0.535745C10.0838 0.366587 9.88448 0.232179 9.66482 0.14024C9.44516 0.0483004 9.20949 0.000641448 8.97135 0H6.93135C6.44189 0.006322 5.97475 0.205656 5.63163 0.554602C5.28851 0.903548 5.0972 1.37385 5.09935 1.86311V2.05502C5.09858 2.28713 5.04571 2.5161 4.94464 2.72507C4.84356 2.93404 4.69686 3.11768 4.51535 3.26245L4.41135 3.34241C4.21082 3.49403 3.97628 3.59441 3.72811 3.63483C3.47994 3.67524 3.22566 3.65446 2.98735 3.5743C2.76848 3.49859 2.53652 3.46806 2.30551 3.48456C2.07449 3.50105 1.84923 3.56422 1.64335 3.67025C1.42899 3.77659 1.23882 3.92588 1.08468 4.10885C0.930531 4.29181 0.815706 4.50452 0.747348 4.73374L0.0913481 6.81275C-0.0607781 7.28149 -0.0217651 7.79128 0.199915 8.23144C0.421596 8.67159 0.808045 9.00657 1.27535 9.16363H1.40335C1.61891 9.24438 1.81239 9.37479 1.96807 9.54429C2.12376 9.7138 2.23725 9.9176 2.29935 10.1392L2.34735 10.2671C2.43653 10.5119 2.46635 10.7743 2.43437 11.0329C2.40238 11.2914 2.3095 11.5387 2.16335 11.7544C1.86752 12.1571 1.74274 12.6602 1.81615 13.1544C1.88956 13.6486 2.15522 14.0938 2.55535 14.3931L4.21135 15.6485C4.52491 15.8764 4.9037 15.997 5.29135 15.9924C5.3951 16.0025 5.4996 16.0025 5.60335 15.9924C5.84343 15.9459 6.07153 15.8511 6.27372 15.7136C6.47591 15.5761 6.64795 15.3989 6.77935 15.1928L6.96335 14.9289C7.09242 14.7438 7.2632 14.5917 7.46192 14.4847C7.66064 14.3778 7.88173 14.319 8.10735 14.3132C8.34379 14.3074 8.57786 14.3615 8.7877 14.4706C8.99754 14.5796 9.17632 14.7401 9.30735 14.9369L9.40335 15.0728C9.53975 15.2757 9.71626 15.4486 9.92201 15.5807C10.1278 15.7129 10.3584 15.8015 10.5997 15.8412C10.841 15.8809 11.0879 15.8708 11.3252 15.8116C11.5625 15.7523 11.7851 15.6451 11.9793 15.4966L13.6033 14.2812C13.9873 13.9831 14.2427 13.5495 14.317 13.0693C14.3914 12.5891 14.2792 12.0986 14.0033 11.6984L13.7953 11.3946C13.6703 11.2014 13.5884 10.9835 13.5552 10.7558C13.5221 10.5281 13.5385 10.296 13.6033 10.0752C13.6694 9.83886 13.7921 9.62217 13.9608 9.44384C14.1294 9.26551 14.339 9.13092 14.5713 9.05169L14.7313 8.99571C15.1943 8.83514 15.5767 8.50093 15.7976 8.06373C16.0186 7.62652 16.0608 7.12058 15.9153 6.65283ZM8.00335 10.7949C7.44956 10.7949 6.90821 10.6307 6.44775 10.3232C5.98729 10.0157 5.62841 9.57858 5.41648 9.06719C5.20456 8.5558 5.14911 7.99309 5.25715 7.4502C5.36519 6.90731 5.63186 6.40863 6.02345 6.01723C6.41504 5.62583 6.91395 5.35929 7.45709 5.2513C8.00024 5.14331 8.56323 5.19873 9.07486 5.41056C9.58649 5.62238 10.0238 5.9811 10.3315 6.44133C10.6391 6.90157 10.8033 7.44267 10.8033 7.99619C10.8033 8.73844 10.5083 9.45029 9.98325 9.97515C9.45815 10.5 8.74595 10.7949 8.00335 10.7949Z"
            fill="#787887"
          />
        </svg>
        <a href="">settings</a>
      </li>

      <li
        @click.prevent="logout"
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
    logout: function () {
      location.href = "/login";
    },
    sidemenu: function () {
      this.$emit("sidemenu", false);
    },
  },
  props: ["component"],
};
</script>
<style scoped>
li {
  cursor: pointer;
  margin-left: 32%;
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
  padding-top: 3px;
}
.active {
  border-right: 4px solid var(--blue-main);
}
.active a {
  color: var(--blue-main);
}
li {
  align-items: center !important;
}

@media screen and (max-width: 767px) {
  #parent {
    min-height: 100vh;
  }
  ul {
    padding-left: 0rem;
    background: white;
  }
  li {
    margin-left: 10%;
    padding: 3px 0px !important;
  }
  .menu-title {
    margin-top: 1% !important;
  }
  .menu-close {
    display: flex !important;
  }
}
</style>

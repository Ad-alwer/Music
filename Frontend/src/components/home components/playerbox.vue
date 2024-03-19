<template>
  <div id="parent">
    <section class="">
      <div  class="d-flex flex-column align-items-center px-4">
        <h4 class="text-center text-uppercase fw-semibold">now playing</h4>
        <img
          class="tumbnail rounded-4 img-fluid mt-1"
          src="../../assets/img/test/eminem.jpg"
          alt=""
        />
        <span class="text-capitalize color-dark mt-2 fs-5 fw-semibold"
          >track</span
        >
        <span class="text-capitalize color-gray artistname pointer">eminem</span>
        <div class="w-100 timeline">
          <audio src="">
            <source />
          </audio>
          <input
            type="range"
            class="input-range"
            ref="range"
            min="0"
            max="100"
            value="0"
          />
        </div>
        <div class="d-flex justify-content-between w-100">
          <span class="color-gray">02:18</span>
          <span class="color-gray">04:13</span>
        </div>
        <div class="d-flex align-items-center gap-4">
          <svg
            width="13"
            height="18"
            viewBox="0 0 13 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="backandskip"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.2353 -1.06964e-06C11.813 -1.03272e-06 11.4706 0.34237 11.4706 0.764705L11.4706 7.7456L0.929225 1.58413C0.835145 1.52915 0.728383 1.50014 0.619676 1.50004C0.510969 1.49993 0.404151 1.52872 0.309965 1.58352C0.215779 1.63832 0.137545 1.71719 0.0831332 1.8122C0.0287211 1.90722 4.87926e-05 2.01502 1.85753e-07 2.12477L1.38784e-06 15.875C1.40233e-06 16.0408 0.0652248 16.1998 0.181323 16.317C0.297421 16.4342 0.454884 16.5 0.619072 16.5C0.728017 16.5 0.835018 16.4709 0.929226 16.4157L11.4706 10.2542L11.4706 17.2353C11.4706 17.6576 11.813 18 12.2353 18C12.6576 18 13 17.6576 13 17.2353L13 9.00145C13 9.00093 13 9.00041 13 8.9999C13 8.99938 13 8.99886 13 8.99835L13 0.764706C13 0.34237 12.6576 -1.10656e-06 12.2353 -1.06964e-06Z"
              fill="#4343EF"
            />
          </svg>
          <div
            class="playandpause rounded-circle d-flex justify-content-center align-items-center"
          >
            <!-- <img src="../../assets/icons/play.png" class="play-icon img-fluid" alt=""> -->
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="6" height="18" rx="1.71429" fill="white" />
              <rect x="12" width="6" height="18" rx="1.71429" fill="white" />
            </svg>
          </div>
          <svg
            class="backandskip"
            width="13"
            height="18"
            viewBox="0 0 13 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.764644 18C1.18698 18 1.52935 17.6576 1.52935 17.2353L1.52935 10.2544L12.0708 16.4159C12.1649 16.4709 12.2716 16.4999 12.3803 16.5C12.489 16.5001 12.5958 16.4713 12.69 16.4165C12.7842 16.3617 12.8625 16.2828 12.9169 16.1878C12.9713 16.0928 13 15.985 13 15.8752L13 2.12499C13 1.95922 12.9348 1.80025 12.8187 1.68304C12.7026 1.56582 12.5451 1.49997 12.3809 1.49997C12.272 1.5 12.165 1.52911 12.0708 1.58435L1.52935 7.74585L1.52935 0.764705C1.52935 0.34237 1.18698 -8.74621e-07 0.764642 -8.377e-07C0.342306 -8.00778e-07 -6.44862e-05 0.342368 -6.44493e-05 0.764705L-6.30094e-05 17.2353C-6.29724e-05 17.6576 0.342308 18 0.764644 18Z"
              fill="#4343EF"
            />
          </svg>
        </div>
        <div
          class="mt-3 d-flex justify-content-center align-items-center flex-column gap-2 pointer"
        >
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7125 7.5C16.4122 7.50049 16.1212 7.41339 15.89 7.25383L9.00126 2.45896L2.09968 7.08259C1.96822 7.17149 1.81696 7.23788 1.65458 7.27795C1.49221 7.31801 1.32193 7.33095 1.15353 7.31603C0.985134 7.30111 0.821936 7.25863 0.673318 7.19101C0.524701 7.1234 0.393595 7.03199 0.287536 6.92204C0.180778 6.81257 0.101055 6.6866 0.0529475 6.55138C0.00483982 6.41616 -0.0107033 6.27436 0.0072115 6.13412C0.0251263 5.99388 0.0761457 5.85798 0.157337 5.73421C0.238529 5.61045 0.348292 5.50127 0.480317 5.41295L8.19158 0.243477C8.42155 0.0860575 8.71 0 9.00769 0C9.30538 0 9.59383 0.0860575 9.8238 0.243477L17.5351 5.59489C17.6652 5.68474 17.7728 5.79509 17.8516 5.91961C17.9305 6.04414 17.9791 6.18039 17.9946 6.32058C18.0101 6.46076 17.9923 6.60211 17.9421 6.73654C17.8919 6.87098 17.8104 6.99584 17.7021 7.10399C17.5825 7.22677 17.4318 7.32596 17.2607 7.39443C17.0896 7.4629 16.9024 7.49895 16.7125 7.5Z"
              fill="#B3B3BC"
            />
          </svg>

          <p class="text-capitalize color-gray tex-center fw-semibold">lyrics</p>
        </div>
      </div>
      <div v-if="x">
        <h4 class="text-capitalize fw-bold xolor-black text-center">track</h4>
        <p   class="px-4 lyric color-gray ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magni earum asperiores magnam voluptatum voluptatem necessitatibus aperiam saepe facilis ipsa ipsam, ex laborum debitis animi cumque soluta, expedita iure odit eligendi accusantium molestiae nam? Ullam, libero officia. Doloremque impedit nostrum odit. Quibusdam suscipit harum, voluptates culpa nobis doloribus debitis tenetur odio atque sequi dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magni earum asperiores magnam voluptatum voluptatem necessitatibus aperiam saepe facilis ipsa ipsam, ex laborum debitis animi cumque soluta, expedita iure odit eligendi accusantium molestiae nam? Ullam, libero officia. Doloremque impedit nostrum odit. Quibusdam suscipit harum, voluptates culpa nobis doloribus debitis tenetur odio atque sequi dolore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magni earum asperiores magnam voluptatum voluptatem necessitatibus aperiam saepe facilis ipsa ipsam, ex laborum debitis animi cumque soluta, expedita iure odit eligendi accusantium molestiae nam? Ullam, libero officia. Doloremque impedit nostrum odit. Quibusdam suscipit harum, voluptates culpa nobis doloribus debitis tenetur odio atque sequi dolore.</p>
        <div class="d-flex justify-content-center align-items-center pointer-event">
            <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7125 7.5C16.4122 7.50049 16.1212 7.41339 15.89 7.25383L9.00126 2.45896L2.09968 7.08259C1.96822 7.17149 1.81696 7.23788 1.65458 7.27795C1.49221 7.31801 1.32193 7.33095 1.15353 7.31603C0.985134 7.30111 0.821936 7.25863 0.673318 7.19101C0.524701 7.1234 0.393595 7.03199 0.287536 6.92204C0.180778 6.81257 0.101055 6.6866 0.0529475 6.55138C0.00483982 6.41616 -0.0107033 6.27436 0.0072115 6.13412C0.0251263 5.99388 0.0761457 5.85798 0.157337 5.73421C0.238529 5.61045 0.348292 5.50127 0.480317 5.41295L8.19158 0.243477C8.42155 0.0860575 8.71 0 9.00769 0C9.30538 0 9.59383 0.0860575 9.8238 0.243477L17.5351 5.59489C17.6652 5.68474 17.7728 5.79509 17.8516 5.91961C17.9305 6.04414 17.9791 6.18039 17.9946 6.32058C18.0101 6.46076 17.9923 6.60211 17.9421 6.73654C17.8919 6.87098 17.8104 6.99584 17.7021 7.10399C17.5825 7.22677 17.4318 7.32596 17.2607 7.39443C17.0896 7.4629 16.9024 7.49895 16.7125 7.5Z"
              fill="#B3B3BC"
            />
          </svg>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "playerbox",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.tumbnail {
  width: 140px;
  height: 100px;
}
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background: rgba(67, 67, 239, 0.5);
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
  /* box-shadow:inset 0 0 5px  rgba(0, 0, 0, 1); */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--blue-main);

  box-shadow: -408px 0 0 400px var(--blue-main);
  cursor: pointer;
}

.playandpause {
  width: 42px;
  height: 42px;
  background-color: var(--blue-main);
  cursor: pointer;
}
.backandskip {
  rotate: 180deg;
  cursor: pointer;
}
.play-icon {
  width: 28px;
  height: 28px;
  position: relative;
  left: 2px;
}
.lyric{
    
    height: 300px;
    overflow-y: auto;
}

</style>

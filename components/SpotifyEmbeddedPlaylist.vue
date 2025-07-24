<template>
  <div>
    <!-- Header -->
    <div class="flex justify-center mx-5">
      <h2
        class="text-stone-300 text-3xl sm:text-5xl font-semibold cursor-pointer"
      >
        Playlist
      </h2>
    </div>
    <div class="mt-3">
      <iframe
        data-testid="embed-iframe"
        style="border-radius: 12px"
        src="https://open.spotify.com/embed/playlist/72jgVJIoIkwDvhGcqgG9kL?utm_source=generator&theme=0"
        width="100%"
        height="450"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup></script>

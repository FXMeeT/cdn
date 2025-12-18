document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector('video');

  if (video) {
    // When metadata is loaded (so duration is known)
    video.addEventListener("loadedmetadata", () => {
      video.currentTime = video.duration;
    });

    // Also cover cases where video already loaded
    if (video.readyState >= 1) {
      video.currentTime = video.duration;
    }
  }
});

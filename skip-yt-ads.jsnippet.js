(function () {
  function seekToEnd(video) {
    if (video.dataset.seeked) return;
    video.dataset.seeked = "1";

    if (video.readyState >= 1) {
      video.currentTime = video.duration;
    } else {
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = video.duration;
      }, { once: true });
    }
  }

  // Existing videos
  document.querySelectorAll("video").forEach(seekToEnd);

  // Future videos (YouTube dynamically inserts them)
  new MutationObserver(() => {
    document.querySelectorAll("video").forEach(seekToEnd);
  }).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();

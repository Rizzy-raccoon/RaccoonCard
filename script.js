document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('player')
  const playBtn = document.getElementById('playBtn')
  const seekBar = document.getElementById('seekBar')
  const volumeBar = document.getElementById('volumeBar')
  const currentTimeEl = document.getElementById('currentTime')
  const durationEl = document.getElementById('duration')

  audio.volume = 0.25
  volumeBar.value = 0.25

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
      playBtn.textContent = 'Pause'
    } else {
      audio.pause()
      playBtn.textContent = 'Play'
    }
  })

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration)
  })

  audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0
    currentTimeEl.textContent = formatTime(audio.currentTime)
  })

  seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration
  })

  volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value
  })

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00'
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }
})

/**
 * Video Player Module
 * Handles the functionality for article video players
 */
export default function videoPlayer() {
  console.log('Video player module initialized');
  const videoContainers = document.querySelectorAll('.article__video-container');
  
  console.log('Found video containers:', videoContainers.length);
  
  if (videoContainers.length === 0) return;
  
  videoContainers.forEach((container, index) => {
    console.log(`Processing container ${index + 1}`);
    const playButton = container.querySelector('.article__video-play');
    const previewElement = container.querySelector('.article__video-preview');
    const playerElement = container.querySelector('.article__video-player');
    const videoUrl = playerElement?.dataset?.videoUrl;
    
    console.log('Elements found:', {
      playButton: !!playButton,
      previewElement: !!previewElement,
      playerElement: !!playerElement,
      videoUrl
    });
    
    function createYouTubeIframe(url) {
      console.log('Creating iframe for URL:', url);
      
      let videoId;
      
      if (url.includes('youtu.be')) {
        videoId = url.split('/').pop().split('?')[0];
        console.log('Extracted ID from youtu.be URL:', videoId);
      } else if (url.includes('youtube.com')) {
        const urlParams = new URLSearchParams(url.split('?')[1] || '');
        videoId = urlParams.get('v');
        if (!videoId) {
          const matches = url.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
          videoId = matches ? matches[1] : null;
        }
        console.log('Extracted ID from youtube.com URL:', videoId);
      }
      
      if (!videoId) {
        console.error('Could not extract video ID from URL:', url);
        return false;
      }
      
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      console.log('Created iframe with src:', iframe.src);
      
      return iframe;
    }
    
    if (playButton && previewElement && playerElement && videoUrl) {
      console.log('Adding click listener to play button');
      playButton.addEventListener('click', (event) => {
        console.log('Play button clicked');
        event.preventDefault();
        
        const iframe = createYouTubeIframe(videoUrl);
        
        if (iframe) {
          console.log('Appending iframe and showing player');
          playerElement.innerHTML = '';
          playerElement.appendChild(iframe);
          
          previewElement.style.display = 'none';
          playerElement.classList.add('active');
          
          const aspectRatio = 9/16; // YouTube's aspect ratio is 16:9
          const containerWidth = container.offsetWidth;
          container.style.height = `${containerWidth * aspectRatio}px`;
        } else {
          console.error('Failed to create iframe');
        }
      });
    } else {
      console.error('One or more required elements not found');
    }
  });
} 
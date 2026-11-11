import React from 'react';

function getYoutubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);
    let videoId = parsedUrl.searchParams.get('v');

    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.pathname.startsWith('/shorts/')) {
      videoId = parsedUrl.pathname.split('/')[2];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

function OrchidClip({ clip, orchidName = 'this orchid' }) {
  const embedUrl = getYoutubeEmbedUrl(clip);
  if (!clip) return null;

  return (
    <div className="orchid-clip">
      <div className="orchid-clip-heading">
        <span className="orchid-clip-eyebrow">WATCH & DISCOVER</span>
        <h2>Experience {orchidName} in motion</h2>
        <p>Discover the details, colors, and natural beauty of this orchid.</p>
      </div>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title="Orchid clip"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <a href={clip} target="_blank" rel="noreferrer">Watch orchid clip</a>
      )}
    </div>
  );
}

export default OrchidClip;

import React from 'react';

const Footer: React.FC = () => (
  <footer className="border-muted text-text-secondary mt-24 border-t pt-8 text-center">
    <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
      <a
        href="mailto:youremail@example.com"
        className="hover:text-text-default transition"
      >
        Email
      </a>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text-default transition"
      >
        GitHub
      </a>
      <a
        href="https://open.spotify.com/user/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-text-default transition"
      >
        Spotify
      </a>
    </div>
    <p className="mt-4 text-sm">
      &copy; {new Date().getFullYear()} Onath. All rights reserved.
    </p>
  </footer>
);

export default Footer;

import React from 'react';
import profilePic from '../assets/jonathan.jpeg';

/**
 * Reusable circular profile picture that can be imported anywhere.
 *
 * Props:
 *  - src  : optional custom image path (default = profilePic)
 *  - alt  : alt text for a11y (default = "Profile picture")
 *  - size : diameter in pixels (default = 128)
 */
export const ProfilePicture: React.FC<{
  src?: string;
  alt?: string;
  size?: number;
}> = ({ src = profilePic, alt = 'Profile picture', size = 128 }) => (
  <img
    src={src}
    alt={alt}
    className="rounded-full border-4 border-white object-cover shadow-lg"
    style={{ width: size, height: size }}
  />
);

export default ProfilePicture;

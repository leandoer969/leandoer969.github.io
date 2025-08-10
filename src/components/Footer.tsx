import React from 'react';
// SVGR (vite-plugin-svgr) import style:
import GithubIcon from '../assets/icons/github.svg?react';
import LinkedInIcon from '../assets/icons/linkedin.svg?react';

type LinkItem = {
  href: string;
  label: string;
  external?: boolean;
  ariaLabel?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const links: LinkItem[] = [
  // {
  //   href: 'mailto:jonathan.leathers@notmyemail.ch', //TODO: update
  //   label: 'Email',
  //   ariaLabel: 'Email Jonathan',
  //   Icon: EmailIcon,
  // },
  {
    href: 'https://github.com/leandoer969',
    label: 'GitHub',
    external: true,
    ariaLabel: 'Open GitHub profile',
    Icon: GithubIcon,
  },
  // {
  //   href: 'https://open.spotify.com/user/yourprofile', /insert profile
  //   label: 'Spotify',
  //   external: true,
  //   ariaLabel: 'Open Spotify',
  //   Icon: SpotifyIcon,
  // },
  {
    href: 'https://www.linkedin.com/in/jonathanleathers', // <-- swap to your real handle
    label: 'LinkedIn',
    external: true,
    ariaLabel: 'Open LinkedIn profile',
    Icon: LinkedInIcon,
  },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="border-default bg-bg pb-safe mt-24 border-t px-4 pt-8 text-center md:pb-12"
    >
      <nav aria-label="Footer" className="mx-auto max-w-4xl">
        <ul className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
          {links.map(({ href, label, external, ariaLabel, Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                aria-label={ariaLabel ?? label}
                className="focus-ring text-small text-muted hover:text-ink inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 font-medium transition"
                title={label}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-small text-muted mx-auto mt-4">
        <span className="text-ink">&copy; {year}</span> _onath__ All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;

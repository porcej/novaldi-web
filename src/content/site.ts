export const site = {
  name: 'Northern Virginia Fire & Rescue Leadership Development Institute',
  shortName: 'NVFR LDI',
  tagline: 'Leadership through Empowerment, Encouragement, and Excellence.',
  motto: 'Step up. Lead strong. Forge your legacy.',
  url: 'https://www.novaldi.us',
  email: 'info@novaldi.us',
  registerUrl: 'https://register.novaldi.us',
  nversUrl: 'https://www.nvers.org/fireems/LDI',
  nversHomeUrl: 'https://www.nvers.org/',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/NVFRLDI' },
    { label: 'X', href: 'https://x.com/nvfrldi1' },
  ],
  flyerUrl: 'https://www.nvers.org/sites/default/files/LDI%202026%20Flyer.pdf',
  programInfoUrl:
    'https://www.nvers.org/sites/default/files/2026%20LDI%20COLP%20COLMP%20Program%20Information_0.pdf',
  session: {
    year: 2026,
    dates: 'October 19–24, 2026',
    label: 'October 19–24, 2026',
    headline: 'Step up. Lead strong. Forge your legacy.',
    /** Flip to true when the next application window opens */
    applicationsOpen: false,
    applicationsOpened: 'June 1, 2026',
    applicationsStatusLabel: 'Closed',
    applicationsNote:
      'Applications for the 2026 session are closed. Contact us with questions, or check back for the next session.',
    companySessionNumber: 13,
    commandSessionNumber: 11,
  },
  nav: [
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

export const aboutCopy = {
  intro:
    'The Northern Virginia Fire and Rescue Leadership Development Institute (the LDI) was established in 2013 at the direction of the Northern Virginia Fire Chiefs Committee.',
  mission:
    'The LDI provides unique and essential leadership training for company-level and command officers. While many fire service programs focus on strategies and tactics, much of an officer’s time is spent with members and citizens in the firehouse—not on the incident scene. Leadership, management, and communication are both an art and a science that must be taught in the fire service, just as they are in the military.',
  approach:
    'The program combines the art and science of leadership and management techniques taught by national-level speakers from within and outside the fire service. Students gain education and knowledge—and specific methods to implement what they have learned—with opportunities to practice in a supportive setting and receive feedback from recognized fire and rescue leaders.',
  reach:
    'The LDI welcomes applications from career and volunteer fire/rescue personnel from jurisdictions inside and outside of the Metropolitan Washington Council of Governments (COG). Select admission beyond Northern Virginia continues to strengthen diversity of thought in the learning environment. Leaders with additional years of experience in their rank are also encouraged to apply.',
  parent:
    'NVFR LDI is part of the Northern Virginia Emergency Response System (NVERS) Fire/EMS regional training portfolio.',
} as const;

export const programsCopy = {
  overview:
    'The LDI offers two programs: the Company Officer Leadership Program (Company) and the Command Officer Leadership and Management Program (Command). Both are six-day residency programs where students stay on campus for the duration. Students are selected competitively by their department and recommended for the program by their chief.',
  experience:
    'Programs are designed to be challenging, with minimal downtime. Students attend all portions of the program and are engaged from early morning through late evening. The schedule mirrors firehouse life—PT, meals, education, networking, fatigue, and personnel issues—challenging normal routines and ways of thinking. The primary goal is cross-organizational communication and networking.',
  summary:
    'Both programs are intended to open and challenge participants’ minds: teach concepts and skills, allow practice, then send officers forth to mentor others.',
  company: {
    title: 'Company Officer Leadership Program',
    shortTitle: 'Company (COLP)',
    audience:
      'Future or acting company officers, as well as existing company officers preferably within one to two years of experience.',
    focus:
      'Direct leadership: work procedures, standards, group cohesion norms, individual motivation, and individual/small-group task-oriented perspectives and dynamics. Students reflect on junior leadership experience and apply LDI lessons to determine which methods fit them best.',
  },
  command: {
    title: 'Command Officer Leadership and Management Program',
    shortTitle: 'Command (COLMP)',
    audience:
      'Future or acting command officers, as well as existing command officers within one to two years of experience—typically charged with leading and managing multiple companies or organizational initiatives.',
    focus:
      'Organizational leadership: leadership climate, organizational culture, policies, changes, systems, and processes.',
  },
} as const;

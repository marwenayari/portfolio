import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Marwen",
  lastName: "Ayari",
  name: `Marwen Ayari`,
  role: "Entrepreneur, Senior Lead Developer",
  avatar: "/images/avatar.png",
  email: "marwenayarimail@gmail.com",
  location: "Africa/Tunis", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Arabic", "French"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My newsletter about software development and innovation</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/marwenayari",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/marwenayari/",
    essential: true,
  },
  // {
  //   name: "Instagram",
  //   icon: "instagram",
  //   link: "https://www.instagram.com/once_ui/",
  //   essential: false,
  // },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: true,
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building innovative software solutions </>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Salla Point (POS)</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/pos",
  },
  subline: (
    <>
      I'm Marwen, a dynamic and innovative software development professional
      with over 9 years of diverse experience, seeking to leverage my expertise
      in leading development teams and delivering high-quality software
      solutions. Currently Senior Engineer at Salla E-Commerce Platform and
      working in parallel as freelancer at my own Marven.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Marwen is a Tunis-based entrepreneur and senior lead developer with over
        9 years of diverse experience in software development. He excels in
        leading development teams, delivering high-quality solutions, and
        creating innovative digital products across mobile and web platforms.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Salla E-Commerce Platform",
        timeframe: "August 2024 - Present",
        role: "Senior Fullstack Engineer",
        achievements: [
          <>
            Working full-time on the famous Salla E-Commerce Platform using
            Next.js + TypeScript, React.js, React Native, Vue.js + JavaScript, and Ruby on Rails.
          </>,
          <>
            Design and develop compelling and reusable component-based user
            interfaces, develop new concepts and optimize existing solutions.
          </>,
          <>
            Collaborate with the team to identify software problems and design
            solutions.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/salla.com_.png",
            alt: "Salla Project",
            width: 16,
            height: 10,
          },
          {
            src: "/images/projects/project-01/salla.com-2.png",
            alt: "Salla Project",
            width: 16,
            height: 10,
          },
          {
            src: "/images/projects/project-01/salla-chat.png",
            alt: "Salla Project",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/pos.png",
            alt: "Salla Project",
            width: 16,
            height: 9,
          }
        ],
      },
      {
        company: "Septeo Tunisie",
        timeframe: "December 2022 - April 2024",
        role: "Lead Developer",
        achievements: [
          <>
            Support architectural reflections and environments, definitions of
            technical roadmaps, and furnish expertise on development practices.
          </>,
          <>
            Be a referent on code quality through code reviews, pull requests
            and increase skills of developers. Control production chain from
            development to delivery.
          </>,
          <>Technologies: Angular, RxJS, NgRx, Microsoft Azure.</>,
        ],
        images: [
          {
            src: "/images/projects/project-01/www.septeo.com_fr.png",
            alt: "Septeo Project",
            width: 16,
            height: 10,
          },
          {
            src: "/images/projects/project-01/www.septeo.com_fr-3.png",
            alt: "Septeo Project",
            width: 16,
            height: 10,
          },
        ],
      },
      {
        company: "Marven",
        timeframe: "August 2016 - Present",
        role: "Founder/Developer",
        achievements: [
          <>
            Founded own brand, launched mobile applications on Google Play with
            the first app released in the Store for iOS.
          </>,
          <>
            Launched successful recipe website lesavoureux.com with over 60k
            active users, expanded to offer digital products across MENA region.
          </>,
          <>
            Initiated Marven Academy for live programming courses and provided
            websites/digital products services in Saudi Arabia and beyond.
          </>,
        ],
        images: [],
      },
      {
        company: "Smart Team",
        timeframe: "October 2020 - October 2022",
        role: "Lead FrontEnd Developer",
        achievements: [
          <>
            Worked on complex business applications using Vue.js, Angular,
            Ionic, jQuery, Vanilla JavaScript, HTML5, SCSS, Bootstrap.
          </>,
          <>
            Led Totipot project: Design and development of reusable component
            interfaces, optimization of existing solutions.
          </>,
          <>
            Led AP Works mobile project: Scrum Master responsibilities, daily
            meetings, Jira management, hybrid mobile application development.
          </>,
        ],
        images: [],
      },
      {
        company: "Sclable",
        timeframe: "December 2018 - December 2019",
        role: "Frontend Developer",
        achievements: [
          <>
            Working full-time on complex business applications using Vue.js,
            TypeScript, and GraphQL.
          </>,
          <>
            Design and develop compelling and reusable component-based user
            interfaces.
          </>,
          <>
            Develop new concepts for user interfaces and optimize existing
            solutions.
          </>,
          <>
            Collaborate with the app development team—including Product Owner,
            Team Lead, Quality Assurance, and Senior Full-Stack developers—in
            identifying software problems, testing methods, and solution design
            while working in an Agile environment.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Indiana University - Kelley School of Business",
        description: (
          <>
            Certificate in Business Studies - Entrepreneurship (July-August
            2017).
          </>
        ),
      },
      {
        name: "High Institute of Computer Sciences in Tunis",
        description: (
          <>Bachelor in Computer Science (September 2012 - June 2015).</>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>
            Expert in modern frontend technologies and frameworks with 7+ years
            of experience in JavaScript, HTML5, CSS3, and responsive design.
          </>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "HTML5",
            icon: "html5",
          },
          {
            name: "CSS3",
            icon: "css3",
          },
          {
            name: "Bootstrap",
            icon: "bootstrap",
          },
          {
            name: "Tailwind CSS",
            icon: "",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Modern Frameworks",
        description: (
          <>
            Proficient in leading frontend frameworks. 5+ years Vue.js/Angular
            experience, 2+ years React.js development.
          </>
        ),
        tags: [
          {
            name: "Vue.js",
            icon: "vuejs",
          },
          {
            name: "Angular",
            icon: "angular",
          },
          {
            name: "React.js",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Nuxt.js",
            icon: "",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Mobile & Hybrid Apps",
        description: (
          <>
            Experience in cross-platform mobile development using Ionic
            framework and publishing apps on iOS App Store and Google Play.
          </>
        ),
        tags: [
          {
            name: "Ionic",
            icon: "ionic",
          },
          {
            name: "Android Studio",
            icon: "",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Backend & Tools",
        description: (
          <>
            Strong backend knowledge with Ruby on Rails. Version control with
            Git, containerization with Docker, testing with Cypress.io.
          </>
        ),
        tags: [
          {
            name: "Git",
            icon: "git",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "Cypress.io",
            icon: "",
          },
          {
            name: "Ruby on Rails",
            icon: "rails",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Design & Productivity",
        description: (
          <>
            Design expertise using Figma and Adobe Photoshop. Experienced in
            agile methodologies, project management, and team leadership.
          </>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
          {
            name: "Photoshop",
            icon: "photoshop",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Certifications & Courses",
        description: (
          <>
            AWS Cloud Technical Essentials, Become a Node.js Developer, Become a
            Vue.js Developer, Ultimate Angular 5 with TypeScript and Bootstrap
            4, Front End Developer from Udacity, and ES6/EcmaScript courses.
          </>
        ),
        tags: [
          {
            name: "AWS",
            icon: "",
          },
          {
            name: "Udacity",
            icon: "",
          },
          {
            name: "Node.js",
            icon: "",
          },
          {
            name: "Vue.js",
            icon: "",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/certifs/aws.png",
            alt: "AWS",
            width: 16,
            height: 9,
          },
          {
            src: "/images/certifs/udacitymena.png",
            alt: "Udacity",
            width: 16,
            height: 9,
          },
          {
            src: "/images/certifs/nodejs.png",
            alt: "Udacity",
            width: 16,
            height: 9,
          },
          {
            src: "/images/certifs/vuejs.png",
            alt: "Udacity",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about my experiences in life and work...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    // {
    //   src: "/images/gallery/vertical-2.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/horizontal-2.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/horizontal-4.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/vertical-3.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };

import type {
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
  role: "رائد أعمال، مهندس برمجيات أول",
  avatar: "/images/avatar.png",
  email: "marwenayarimail@gmail.com",
  location: "Africa/Tunis",
  languages: ["الإنجليزية", "العربية", "الفرنسية"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>اشترك في نشرة {person.firstName}</>,
  description: <>نشرتي عن تطوير البرمجيات والابتكار</>,
};

const social: Social = [
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
  {
    name: "البريد",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/marwenayari.png",
  label: "الرئيسية",
  title: `محفظة ${person.name}`,
  description: `موقع يعرض أعمالي كـ ${person.role}`,
  headline: <>أبني حلول برمجية مبتكرة </>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Salla Point (POS)</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          مشروع مميز
        </Text>
      </Row>
    ),
    href: "/work/pos",
  },
  subline: (
    <>
      أنا مروان، مهندس برمجيات ديناميكي ومبتكر مع أكثر من 9 سنوات من الخبرة المتنوعة. أعمل حالياً كمهندس أول في منصة سلة للتجارة الإلكترونية،
      وبالتوازي كمستقل ضمن علامتي Marven.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "من أنا",
  title: `من أنا – ${person.name}`,
  description: `تعرّف على ${person.name}، ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/marwenayari/30min?overlayCalendar=true",
  },
  intro: {
    display: true,
    title: "مقدمة",
    description: (
      <>
        مروان رائد أعمال ومطوّر رئيسي مقيم في تونس، مع أكثر من 9 سنوات في تطوير البرمجيات. يتقن قيادة فرق التطوير، تقديم حلول عالية الجودة،
        وبناء منتجات رقمية مبتكرة على المنصات المحمولة والويب.
      </>
    ),
  },
  work: {
    display: true,
    title: "الخبرة المهنية",
    experiences: [
      {
        company: "Salla E-Commerce Platform",
        timeframe: "أغسطس 2024 – الآن",
        role: "مهندس Fullstack أول",
        achievements: [
          <>
            العمل بدوام كامل على منصة سلة للتجارة الإلكترونية باستخدام Next.js وTypeScript وReact.js وReact Native وVue.js وJavaScript وRuby on
            Rails.
          </>,
          <>
            تصميم وتطوير واجهات مستخدم مكوّنة قابلة لإعادة الاستخدام، وابتكار مفاهيم جديدة وتحسين الحلول القائمة.
          </>,
          <>التعاون مع الفريق لتحديد مشكلات البرمجيات وتصميم الحلول.</>,
        ],
        images: [
          {
            src: "/images/projects/project-01/salla.com_.png",
            alt: "مشروع سلة",
            width: 5,
            height: 5,
          },
          {
            src: "/images/projects/project-01/salla.com-2.png",
            alt: "مشروع سلة",
            width: 5,
            height: 5,
          },
          {
            src: "/images/projects/project-01/salla-chat.png",
            alt: "مشروع سلة",
            width: 5,
            height: 5,
          },
          {
            src: "/images/projects/project-01/pos.png",
            alt: "مشروع سلة",
            width: 5,
            height: 5,
          },
        ],
      },
      {
        company: "Septeo Tunisie",
        timeframe: "ديسمبر 2022 – أبريل 2024",
        role: "مطوّر رئيسي",
        achievements: [
          <>
            دعم التفكير المعماري والبيئات، وتعريف خرائط الطريق التقنية، وتقديم خبرة في ممارسات التطوير.
          </>,
          <>
            مرجعية لجودة الكود عبر المراجعات وطلبات الدمج، ورفع مهارات المطورين. ضبط سلسلة الإنتاج من التطوير إلى التسليم.
          </>,
          <>التقنيات: Angular، RxJS، NgRx، Microsoft Azure.</>,
        ],
        images: [
          {
            src: "/images/projects/project-01/www.septeo.com_fr.png",
            alt: "مشروع Septeo",
            width: 5,
            height: 5,
          },
          {
            src: "/images/projects/project-01/www.septeo.com_fr-3.png",
            alt: "مشروع Septeo",
            width: 5,
            height: 5,
          },
        ],
      },
      {
        company: "Sclable",
        timeframe: "ديسمبر 2018 – ديسمبر 2019",
        role: "مطوّر واجهات",
        achievements: [
          <>
            العمل بدوام كامل على تطبيقات أعمال معقدة باستخدام Vue.js وTypeScript وGraphQL.
          </>,
          <>تصميم وتطوير واجهات مستخدم جذابة قابلة لإعادة الاستخدام.</>,
          <>
            ابتكار مفاهيم لواجهات المستخدم وتحسين الحلول القائمة.
          </>,
          <>
            التعاون مع فريق التطبيق—مالك المنتج، قائد الفريق، ضمان الجودة، ومطوري Full-Stack الأكفاء—في تحديد مشكلات البرمجيات وأساليب
            الاختبار وتصميم الحلول ضمن بيئة أجايل.
          </>,
        ],
        images: [
          {
            src: "/images/projects/sclable3.png",
            alt: "مشروع Sclable",
            width: 5,
            height: 5,
          },
          {
            src: "/images/projects/sclable2.png",
            alt: "مشروع Sclable",
            width: 5,
            height: 5,
          },
          {
            src: "/images/projects/sclable.png",
            alt: "مشروع Sclable",
            width: 5,
            height: 5,
          },
        ],
      },
      {
        company: "Smart Team",
        timeframe: "أكتوبر 2020 – أكتوبر 2022",
        role: "مطوّر واجهات رئيسي",
        achievements: [
          <>
            العمل على تطبيقات أعمال معقدة باستخدام Vue.js وAngular وIonic وجQuery وJavaScript الخام وHTML5 وSCSS وBootstrap.
          </>,
          <>
            قيادة مشروع Totipot: تصميم وتطوير واجهات مكوّنة قابلة لإعادة الاستخدام وتحسين الحلول القائمة.
          </>,
          <>
            قيادة مشروع AP Works المحمول: مسؤوليات سكرم ماستر، اجتماعات يومية، إدارة Jira، وتطوير تطبيق هجين.
          </>,
        ],
        images: [],
      },
      {
        company: "Marven",
        timeframe: "أغسطس 2016 – الآن",
        role: "مؤسس / مطوّر",
        achievements: [
          <>
            تأسيس علامة خاصة، وإطلاق تطبيقات على Google Play مع أول إصدار على متجر iOS.
          </>,
          <>
            إطلاق موقع وصفات lesavoureux.com بنجاح مع أكثر من 60 ألف مستخدم نشط، وتوسيع العرض ليشمل منتجات رقمية عبر منطقة الشرق الأوسط
            وشمال أفريقيا.
          </>,
          <>
            إنشاء Marven Academy لدورات برمجة مباشرة وتقديم مواقع ومنتجات رقمية في السعودية وخارجها.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "الدراسة",
    institutions: [
      {
        name: "Indiana University - Kelley School of Business",
        description: (
          <>شهادة في دراسات الأعمال – ريادة الأعمال (يوليو–أغسطس 2017).</>
        ),
      },
      {
        name: "المعهد العالي للعلوم الإعلامية بتونس",
        description: <>إجازة في علوم الحاسوب (سبتمبر 2012 – يونيو 2015).</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "المهارات التقنية",
    skills: [
      {
        title: "تطوير الواجهات",
        description: (
          <>
            خبير في تقنيات وأطر الواجهات الحديثة مع أكثر من 7 سنوات في JavaScript وHTML5 وCSS3 والتصميم المتجاوب.
          </>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "HTML5", icon: "html5" },
          { name: "CSS3", icon: "css3" },
          { name: "Bootstrap", icon: "bootstrap" },
          { name: "Tailwind CSS", icon: "" },
        ],
        images: [],
      },
      {
        title: "أطر عمل حديثة",
        description: (
          <>
            إتقان أطر الواجهة الرائدة: أكثر من 5 سنوات في Vue.js وAngular، وأكثر من سنتين في React.js.
          </>
        ),
        tags: [
          { name: "Vue.js", icon: "vuejs" },
          { name: "Angular", icon: "angular" },
          { name: "React.js", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Nuxt.js", icon: "" },
        ],
        images: [],
      },
      {
        title: "تطبيقات محمولة وهجينة",
        description: (
          <>
            خبرة في التطوير متعدد المنصات باستخدام Ionic ونشر التطبيقات على App Store وGoogle Play.
          </>
        ),
        tags: [
          { name: "Ionic", icon: "ionic" },
          { name: "Android Studio", icon: "" },
        ],
        images: [],
      },
      {
        title: "الخلفية والأدوات",
        description: (
          <>
            معرفة قوية بالخلفية مع Ruby on Rails. التحكم بالإصدارات بـ Git، الحاويات بـ Docker، والاختبار بـ Cypress.io.
          </>
        ),
        tags: [
          { name: "Git", icon: "git" },
          { name: "Docker", icon: "docker" },
          { name: "Cypress.io", icon: "" },
          { name: "Ruby on Rails", icon: "rails" },
        ],
        images: [],
      },
      {
        title: "التصميم والإنتاجية",
        description: (
          <>
            خبرة تصميم باستخدام Figma وAdobe Photoshop. خبرة في منهجيات أجايل وإدارة المشاريع وقيادة الفرق.
          </>
        ),
        tags: [
          { name: "Figma", icon: "figma" },
          { name: "Photoshop", icon: "photoshop" },
        ],
        images: [],
      },
      {
        title: "الشهادات والدورات",
        description: (
          <>
            أساسيات AWS السحابية، مطوّر Node.js، مطوّر Vue.js، Angular 5 مع TypeScript وBootstrap 4، مطوّر واجهات من Udacity، ودورات
            ES6/ECMAScript.
          </>
        ),
        tags: [
          { name: "AWS", icon: "" },
          { name: "Udacity", icon: "" },
          { name: "Node.js", icon: "" },
          { name: "Vue.js", icon: "" },
        ],
        images: [
          { src: "/images/certifs/aws.png", alt: "AWS", width: 5, height: 5 },
          { src: "/images/certifs/udacitymena.png", alt: "Udacity", width: 5, height: 5 },
          { src: "/images/certifs/nodejs.png", alt: "Udacity", width: 5, height: 5 },
          { src: "/images/certifs/vuejs.png", alt: "Udacity", width: 5, height: 5 },
          { src: "/images/certifs/kelly.png", alt: "Indiana University", width: 5, height: 5 },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "المدونة",
  title: "أكتب عن تجاربي في الحياة والعمل...",
  description: `اطلع على آخر ما يفعله ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "الأعمال",
  title: `المشاريع – ${person.name}`,
  description: `مشاريع تصميم وتطوير من ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "المعرض",
  title: `معرض صور – ${person.name}`,
  description: `مجموعة صور من ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "صورة",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "صورة",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "صورة",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "صورة",
      orientation: "vertical",
    },
  ],
};

export const siteBundleAr = {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
};

export { person, social, newsletter, home, about, blog, work, gallery };

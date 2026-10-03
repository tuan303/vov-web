// =============================================================================
// NỘI DUNG WEBSITE VOVSMART – SỬA CHỮ Ở FILE NÀY
// -----------------------------------------------------------------------------
// - Mỗi đoạn chữ có 2 bản: `en` (tiếng Anh, trang https://www.vovsmart.net/)
//   và `vi` (tiếng Việt, trang https://www.vovsmart.net/vi).
// - Sửa xong: đẩy lên GitHub, Vercel sẽ tự build lại toàn bộ trang.
// - Khi thay đổi nội dung đáng kể, cập nhật CONTENT_UPDATED để Google biết
//   trang đã đổi (ngày dạng YYYY-MM-DD).
// =============================================================================

export type Lang = 'en' | 'vi';
export const LANGS: Lang[] = ['en', 'vi'];

/** Ngày cập nhật nội dung gần nhất – dùng cho sitemap.xml */
export const CONTENT_UPDATED = '2026-10-02';

export const SITE = {
  origin: 'https://www.vovsmart.net',
  paths: { en: '/', vi: '/vi' } as Record<Lang, string>,
  brand: 'VOVSmart',
  legalName: 'VOV Smart Technology Joint Stock Company',
  legalNameUpper: 'VOV SMART TECHNOLOGY JOINT STOCK COMPANY',
  shortName: 'VOV Smart Technology JSC',
  taxId: '0111327434',
  email: 'admin@vovsmart.net',
  phoneE164: '+84904575302',
  phoneSchema: '+84 904 575 302',
  phoneDisplay: { en: '+84 904 575 302', vi: '0904 575 302' } as Record<Lang, string>,
  address: {
    en: '36 Nguyen Dong Chi, Tu Liem, Hanoi, Vietnam',
    vi: '36 Nguyễn Đổng Chi, Từ Liêm, Hà Nội',
  } as Record<Lang, string>,
  // Dữ liệu có cấu trúc (schema.org) dùng một dạng địa chỉ thống nhất
  schemaAddress: {
    streetAddress: '36 Nguyen Dong Chi, Tu Liem',
    addressLocality: 'Hanoi',
    addressCountry: 'VN',
  },
  themeColor: '#003B5C',
  images: {
    heroWidths: [640, 800, 960, 1280, 1825],
    heroWidth: 1825,
    heroHeight: 862,
    og: '/images/og-image.jpg',
    logoSchema: '/images/logo-vovsmart-832.png',
  },
};

export const pageUrl = (lang: Lang) => SITE.origin + SITE.paths[lang];

export interface ServiceGroup { title: string; icon: IconKey; items: string[] }
export interface ProjectRef { category: string; name: string; client: string; scope: string }
export interface Member { initial: string; role: string; bio: string }
export type IconKey =
  | 'factory' | 'apartment' | 'precision_manufacturing' | 'router' | 'security' | 'monitoring'
  | 'settings_input_component' | 'domain' | 'architecture' | 'arrow_forward' | 'assignment'
  | 'mail' | 'call' | 'location_on' | 'visibility' | 'rocket_launch' | 'language';

export interface Dictionary {
  meta: { title: string; description: string; ogLocale: string; ogImageAlt: string };
  skipLink: string;
  nav: {
    label: string; homeLabel: string; logoAlt: string;
    items: { id: string; label: string }[];
    contact: string; switchLabel: string; switchShort: string;
  };
  hero: { title: string; lead: string; imageAlt: string; ctaServices: string; ctaProjects: string };
  overview: {
    eyebrow: string; title: string; paragraphs: string[];
    facts: { label: string; value: string }[];
    quote: string;
  };
  mission: { visionTitle: string; vision: string; missionTitle: string; missions: string[] };
  services: {
    eyebrow: string; title: string; groups: ServiceGroup[];
    complianceTitle: string; compliance: string; tags: string[];
  };
  projects: {
    eyebrow: string; title: string; intro: string; clientLabel: string;
    items: ProjectRef[]; vendorsTitle: string;
  };
  team: { eyebrow: string; title: string; contactLabel: string; members: Member[] };
  contact: {
    title: string; taxLabel: string;
    emailLabel: string; phoneLabel: string; addressLabel: string;
    form: {
      name: string; namePlaceholder: string; email: string; emailPlaceholder: string;
      message: string; messagePlaceholder: string; honeypot: string;
      submit: string; sending: string; success: string; error: string;
    };
  };
  footer: { rights: string; tags: string[] };
}

const vendors = [
  { name: 'Yokogawa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Yokogawa_logo.svg/1280px-Yokogawa_logo.svg.png', h: 'h-6 md:h-8 lg:h-9' },
  { name: 'Siemens', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg', h: 'h-6 md:h-8 lg:h-9' },
  { name: 'Emerson', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/EmersonElectricLogo.png/1280px-EmersonElectricLogo.png', h: 'h-7 md:h-9 lg:h-10' },
  { name: 'ABB', url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/ABB_logo.svg', h: 'h-6 md:h-8 lg:h-9' },
  { name: 'Bosch', url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg', h: 'h-6 md:h-8 lg:h-9' },
  { name: 'Thales', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Thales_Logo.svg/1280px-Thales_Logo.svg.png', h: 'h-5 md:h-7 lg:h-8' },
];
export const VENDORS = vendors;

export const content: Record<Lang, Dictionary> = {
  // ---------------------------------------------------------------------------
  // TIẾNG ANH
  // ---------------------------------------------------------------------------
  en: {
    meta: {
      title: 'VOVSmart | Automation, Smart Building & Smart Factory',
      description:
        'VOV Smart Technology JSC integrates industrial automation, process control (DCS, PLC, SCADA), smart building (BMS) and smart factory systems in Vietnam.',
      ogLocale: 'en_US',
      ogImageAlt: 'Smart building, digitalization and smart factory systems by VOVSmart',
    },
    skipLink: 'Skip to main content',
    nav: {
      label: 'Main navigation',
      homeLabel: 'VOV Smart home',
      logoAlt: 'VOV Smart logo',
      items: [
        { id: 'overview', label: 'Overview' },
        { id: 'services', label: 'Services' },
        { id: 'projects', label: 'Projects' },
        { id: 'management', label: 'Management' },
      ],
      contact: 'Contact Us',
      switchLabel: 'Xem bằng tiếng Việt',
      switchShort: 'VI',
    },
    hero: {
      title: 'System integration for automation, smart buildings and smart factories',
      lead:
        'VOV Smart Technology JSC is a Vietnam-based engineering company connecting operational technology (OT) with information technology (IT) for industrial and commercial facilities.',
      imageAlt:
        'Illustration of smart building, digitalization (IIoT, AI, analytics) and smart factory systems, with control and safety systems, field instrumentation, IIoT software, consulting services and automation controllers',
      ctaServices: 'Our Services',
      ctaProjects: 'Project References',
    },
    overview: {
      eyebrow: 'Company Overview',
      title: 'Automation, Smart Building & Digitalization Excellence',
      paragraphs: [
        'VOV Smart Technology JSC is a Vietnam-based technology and engineering company specializing in industrial automation, process control system integration, smart buildings, home building systems, smart factories, and facility control systems.',
        'We deliver end-to-end engineering and integration services that connect Operational Technology (OT) with Information Technology (IT), enabling safe, reliable, efficient operation and practical digitalization for industrial and commercial facilities.',
      ],
      facts: [
        { label: 'Tax Code', value: SITE.taxId },
        { label: 'Address', value: SITE.address.en },
        { label: 'Website', value: 'www.vovsmart.net' },
      ],
      quote: 'Connecting OT and IT for a smarter future',
    },
    mission: {
      visionTitle: 'Vision',
      vision:
        'To become a trusted regional partner in automation, smart facilities, and digital transformation, delivering sustainable and standards-compliant engineering solutions for industrial and commercial customers.',
      missionTitle: 'Mission',
      missions: [
        'Provide reliable and practical automation and facility solutions based on international engineering standards',
        'Bridge plant engineering know-how with modern digital technologies',
        'Support clients throughout the full project lifecycle, from concept to operation',
      ],
    },
    services: {
      eyebrow: 'Our Core Services',
      title: 'Professional Automation & Smart Building Solutions',
      groups: [
        {
          title: 'Industrial Automation & Process Control',
          icon: 'settings_input_component',
          items: [
            'DCS, PLC, SCADA, SIS, ICSS',
            'Process control platform engineering experience',
            'Process instrumentation and control',
            'Plant-wide monitoring, control, and safety systems',
            'Simulator systems (OTS)',
          ],
        },
        {
          title: 'Smart Factory Solutions',
          icon: 'precision_manufacturing',
          items: [
            'Manufacturing execution systems (MES)',
            'Plant information management (PIMS)',
            'Utilities and process automation',
            'OT-IT integration, data platforms and digitalization',
          ],
        },
        {
          title: 'Smart Building, Home Building & Facility Systems',
          icon: 'domain',
          items: [
            'Building Management Systems (BMS)',
            'Home building automation and facility control',
            'Facility Management (FMCS)',
            'Electrical power monitoring (ECMS)',
            'ELV: CCTV, Access Control, PA/VA, Fire Alarm',
          ],
        },
        {
          title: 'Engineering & Project Management',
          icon: 'architecture',
          items: [
            'Conceptual design, FEED, detailed engineering',
            'Engineering calculations & specifications',
            'Project management (PMP-oriented)',
            'EPC/EPCM and PMC support',
          ],
        },
      ],
      complianceTitle: 'Engineering Capability & Compliance',
      compliance: 'Executing projects in compliance with TCVN, IEC, ISA, IEEE, API, NFPA, DIN, ISO.',
      tags: ['HAZOP', 'QA/QC', 'Cost Control'],
    },
    projects: {
      eyebrow: 'Project References',
      title: 'Automation & Smart Factory Track Record',
      intro:
        'Our team experience covers Oil & Gas, Power, Chemicals, Manufacturing, smart building, home building, automation and digitalization projects.',
      clientLabel: 'Client',
      items: [
        { category: 'Railway & Transportation', name: 'Hanoi Metro Line 3', client: 'MRB | Thales / Alstom JV', scope: 'Telecom systems, ICS, ATS/SCADA, Power & BMS SCADA' },
        { category: 'Smart Office', name: 'Bosch Smart Lockers & Facility Management', client: 'Bosch Global Software Company', scope: '6000 smart lockers, HVAC, smart meeting room, security' },
        { category: 'Industrial & Energy', name: 'VietsovPetro CCP Offshore Platforms', client: 'VietsovPetro', scope: 'DCS and SIS upgrade and replacement for process control systems' },
        { category: 'Manufacturing', name: 'Nestle Route 66 Factory Expansion', client: 'Nestle', scope: 'Electrical automation, smart factory installation and commissioning' },
      ],
      vendorsTitle: 'Trusted by global technology vendors',
    },
    team: {
      eyebrow: 'Management Team',
      title: 'Experienced Leadership',
      contactLabel: 'Contact',
      members: [
        { initial: 'P', role: 'Chairman', bio: 'Senior automation professional with 20+ years of international experience in industrial automation and EPC projects.' },
        { initial: 'B', role: 'Director', bio: 'Responsible for corporate management, legal representation, and business operations.' },
        { initial: 'P', role: 'Engineering Manager', bio: 'Manages engineering execution, technical quality, and project delivery.' },
        { initial: 'N', role: 'Sales Manager', bio: 'Leads sales strategy, customer engagement, and partner development.' },
      ],
    },
    contact: {
      title: 'Get in Touch',
      taxLabel: 'Tax code',
      emailLabel: 'Email us',
      phoneLabel: 'Call us',
      addressLabel: 'Visit us',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'How can we help?',
        honeypot: 'Leave this field empty',
        submit: 'Send Inquiry',
        sending: 'Sending…',
        success: 'Your inquiry has been sent. We will contact you soon.',
        error: 'We could not send your inquiry. Please try again later or email admin@vovsmart.net.',
      },
    },
    footer: {
      rights: '© 2026 VOV Smart Technology JSC. All rights reserved.',
      tags: ['Digitalization', 'Automation', 'Smart Factory'],
    },
  },

  // ---------------------------------------------------------------------------
  // TIẾNG VIỆT
  // ---------------------------------------------------------------------------
  vi: {
    meta: {
      title: 'VOVSmart | Tự động hóa, tòa nhà & nhà máy thông minh',
      description:
        'VOV Smart Technology JSC tích hợp hệ thống tự động hóa công nghiệp, điều khiển quá trình (DCS, PLC, SCADA), tòa nhà thông minh (BMS) và nhà máy thông minh.',
      ogLocale: 'vi_VN',
      ogImageAlt: 'Hệ thống tòa nhà thông minh, chuyển đổi số và nhà máy thông minh của VOVSmart',
    },
    skipLink: 'Bỏ qua, đến nội dung chính',
    nav: {
      label: 'Điều hướng chính',
      homeLabel: 'Trang chủ VOV Smart',
      logoAlt: 'Logo VOV Smart',
      items: [
        { id: 'overview', label: 'Tổng quan' },
        { id: 'services', label: 'Dịch vụ' },
        { id: 'projects', label: 'Dự án' },
        { id: 'management', label: 'Ban lãnh đạo' },
      ],
      contact: 'Liên hệ',
      switchLabel: 'View in English',
      switchShort: 'EN',
    },
    hero: {
      title: 'Tích hợp hệ thống tự động hóa, tòa nhà thông minh và nhà máy thông minh',
      lead:
        'VOV Smart Technology JSC là công ty kỹ thuật tại Việt Nam, kết nối công nghệ vận hành (OT) với công nghệ thông tin (IT) cho nhà máy và công trình thương mại.',
      imageAlt:
        'Minh họa hệ thống tòa nhà thông minh, chuyển đổi số (IIoT, AI, phân tích dữ liệu) và nhà máy thông minh, cùng hệ thống điều khiển và an toàn, thiết bị đo lường hiện trường, phần mềm IIoT, dịch vụ tư vấn và bộ điều khiển tự động hóa',
      ctaServices: 'Dịch vụ của chúng tôi',
      ctaProjects: 'Dự án tiêu biểu',
    },
    overview: {
      eyebrow: 'Tổng quan công ty',
      title: 'Chuyên sâu về tự động hóa, tòa nhà thông minh và chuyển đổi số',
      paragraphs: [
        'VOV Smart Technology JSC là công ty công nghệ và kỹ thuật tại Việt Nam, chuyên về tự động hóa công nghiệp, tích hợp hệ thống điều khiển quá trình, tòa nhà thông minh, hệ thống tự động hóa nhà ở, nhà máy thông minh và hệ thống điều khiển công trình.',
        'Chúng tôi cung cấp dịch vụ kỹ thuật và tích hợp trọn gói, kết nối Công nghệ vận hành (OT) với Công nghệ thông tin (IT), giúp nhà máy và công trình thương mại vận hành an toàn, tin cậy, hiệu quả và chuyển đổi số một cách thiết thực.',
      ],
      facts: [
        { label: 'Mã số thuế', value: SITE.taxId },
        { label: 'Địa chỉ', value: SITE.address.vi },
        { label: 'Website', value: 'www.vovsmart.net' },
      ],
      quote: 'Kết nối OT và IT vì một tương lai thông minh hơn',
    },
    mission: {
      visionTitle: 'Tầm nhìn',
      vision:
        'Trở thành đối tác tin cậy trong khu vực về tự động hóa, công trình thông minh và chuyển đổi số, mang đến các giải pháp kỹ thuật bền vững, tuân thủ tiêu chuẩn cho khách hàng công nghiệp và thương mại.',
      missionTitle: 'Sứ mệnh',
      missions: [
        'Cung cấp giải pháp tự động hóa và hệ thống công trình tin cậy, thiết thực, dựa trên các tiêu chuẩn kỹ thuật quốc tế',
        'Kết hợp kinh nghiệm kỹ thuật nhà máy với công nghệ số hiện đại',
        'Đồng hành cùng khách hàng trong suốt vòng đời dự án, từ ý tưởng đến vận hành',
      ],
    },
    services: {
      eyebrow: 'Dịch vụ cốt lõi',
      title: 'Giải pháp tự động hóa và tòa nhà thông minh chuyên nghiệp',
      groups: [
        {
          title: 'Tự động hóa công nghiệp và điều khiển quá trình',
          icon: 'settings_input_component',
          items: [
            'DCS, PLC, SCADA, SIS, ICSS',
            'Kinh nghiệm kỹ thuật trên các nền tảng điều khiển quá trình',
            'Đo lường và điều khiển quá trình',
            'Hệ thống giám sát, điều khiển và an toàn toàn nhà máy',
            'Hệ thống mô phỏng huấn luyện vận hành (OTS)',
          ],
        },
        {
          title: 'Giải pháp nhà máy thông minh',
          icon: 'precision_manufacturing',
          items: [
            'Hệ thống điều hành sản xuất (MES)',
            'Hệ thống quản lý thông tin nhà máy (PIMS)',
            'Tự động hóa hệ thống phụ trợ và quá trình',
            'Tích hợp OT-IT, nền tảng dữ liệu và số hóa',
          ],
        },
        {
          title: 'Tòa nhà thông minh, nhà ở thông minh và hệ thống công trình',
          icon: 'domain',
          items: [
            'Hệ thống quản lý tòa nhà (BMS)',
            'Tự động hóa nhà ở và điều khiển công trình',
            'Quản lý công trình (FMCS)',
            'Giám sát điện năng (ECMS)',
            'Điện nhẹ (ELV): camera giám sát (CCTV), kiểm soát ra vào, âm thanh công cộng (PA/VA), báo cháy',
          ],
        },
        {
          title: 'Kỹ thuật và quản lý dự án',
          icon: 'architecture',
          items: [
            'Thiết kế ý tưởng, thiết kế FEED, thiết kế chi tiết',
            'Tính toán kỹ thuật và lập tiêu chí kỹ thuật',
            'Quản lý dự án (theo định hướng PMP)',
            'Hỗ trợ EPC/EPCM và PMC',
          ],
        },
      ],
      complianceTitle: 'Năng lực kỹ thuật và tuân thủ tiêu chuẩn',
      compliance: 'Thực hiện dự án tuân thủ các tiêu chuẩn TCVN, IEC, ISA, IEEE, API, NFPA, DIN, ISO.',
      tags: ['HAZOP', 'QA/QC', 'Kiểm soát chi phí'],
    },
    projects: {
      eyebrow: 'Dự án tham khảo',
      title: 'Kinh nghiệm dự án tự động hóa và nhà máy thông minh',
      intro:
        'Kinh nghiệm của đội ngũ trải rộng các dự án dầu khí, điện, hóa chất, sản xuất, tòa nhà thông minh, nhà ở thông minh, tự động hóa và số hóa.',
      clientLabel: 'Khách hàng',
      items: [
        { category: 'Đường sắt và giao thông', name: 'Tuyến đường sắt đô thị số 3 Hà Nội (Metro Line 3)', client: 'MRB | Liên danh Thales / Alstom', scope: 'Hệ thống viễn thông, ICS, ATS/SCADA, SCADA điện và BMS' },
        { category: 'Văn phòng thông minh', name: 'Tủ khóa thông minh và quản lý cơ sở vật chất Bosch', client: 'Bosch Global Software Company', scope: '6.000 tủ khóa thông minh, HVAC, phòng họp thông minh, an ninh' },
        { category: 'Công nghiệp và năng lượng', name: 'Giàn khai thác ngoài khơi CCP – VietsovPetro', client: 'VietsovPetro', scope: 'Nâng cấp, thay thế DCS và SIS cho hệ thống điều khiển quá trình' },
        { category: 'Sản xuất', name: 'Mở rộng nhà máy Nestle (Route 66)', client: 'Nestle', scope: 'Tự động hóa điện, lắp đặt và chạy thử nhà máy thông minh' },
      ],
      vendorsTitle: 'Được các hãng công nghệ toàn cầu tin tưởng',
    },
    team: {
      eyebrow: 'Ban lãnh đạo',
      title: 'Đội ngũ lãnh đạo giàu kinh nghiệm',
      contactLabel: 'Liên hệ',
      members: [
        { initial: 'P', role: 'Chủ tịch HĐQT', bio: 'Chuyên gia tự động hóa với hơn 20 năm kinh nghiệm quốc tế trong lĩnh vực tự động hóa công nghiệp và các dự án EPC.' },
        { initial: 'B', role: 'Giám đốc', bio: 'Phụ trách quản lý doanh nghiệp, đại diện theo pháp luật và điều hành hoạt động kinh doanh.' },
        { initial: 'P', role: 'Trưởng phòng Kỹ thuật', bio: 'Quản lý triển khai kỹ thuật, chất lượng kỹ thuật và bàn giao dự án.' },
        { initial: 'N', role: 'Trưởng phòng Kinh doanh', bio: 'Dẫn dắt chiến lược kinh doanh, chăm sóc khách hàng và phát triển đối tác.' },
      ],
    },
    contact: {
      title: 'Liên hệ với chúng tôi',
      taxLabel: 'Mã số thuế',
      emailLabel: 'Email',
      phoneLabel: 'Điện thoại',
      addressLabel: 'Địa chỉ',
      form: {
        name: 'Họ và tên',
        namePlaceholder: 'Họ và tên của bạn',
        email: 'Email',
        emailPlaceholder: 'email@congty.com',
        message: 'Nội dung',
        messagePlaceholder: 'Chúng tôi có thể hỗ trợ gì cho bạn?',
        honeypot: 'Để trống ô này',
        submit: 'Gửi yêu cầu',
        sending: 'Đang gửi…',
        success: 'Yêu cầu của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm.',
        error: 'Chưa gửi được yêu cầu. Vui lòng thử lại sau hoặc gửi email tới admin@vovsmart.net.',
      },
    },
    footer: {
      rights: '© 2026 VOV Smart Technology JSC. Bảo lưu mọi quyền.',
      tags: ['Chuyển đổi số', 'Tự động hóa', 'Nhà máy thông minh'],
    },
  },
};

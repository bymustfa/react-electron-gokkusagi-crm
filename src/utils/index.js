export const menus = [
  {
    id: Math.floor(Math.random() * 9999),
    icon: <i className="fas fa-chart-line" />,
    title: "Dashboard",
    href: "/",
  },
  {
    id: Math.floor(Math.random() * 9999),
    icon: <i className="fas fa-suitcase" />,
    title: "CRM",
    open: false,
    child: [
      {
        id: Math.floor(Math.random() * 9999),
        href: "/customers",
        title: "Müşteri Listesi",
      },

      {
        id: Math.floor(Math.random() * 9999),
        href: "/activities",
        title: "Aktivite Listesi",
      },
      {
        id: Math.floor(Math.random() * 9999),
        href: "/actions",
        title: "Faaliyet Listesi",
      },

      {
        id: Math.floor(Math.random() * 9999),
        href: "/calendar",
        title: "Takvim",
      },
    ],
  },

  {
    id: Math.floor(Math.random() * 9999),
    icon: <i className="fas fa-box" />,
    title: "Satış Yönetim",
    open: false,
    child: [
      {
        id: Math.floor(Math.random() * 9999),
        href: "/offers",
        title: "Teklif Listesi",
      },
      {
        id: Math.floor(Math.random() * 9999),
        href: "/orders",
        title: "Sipariş Listesi",
      },
    ],
  },

  {
    id: Math.floor(Math.random() * 9999),
    icon: <i className="far fa-list-alt" />,
    open: false,
    title: "Yönetim",
    child: [
      {
        id: Math.floor(Math.random() * 9999),
        href: "/users",
        title: "Kullanıcı Listesi",
      },
      {
        id: Math.floor(Math.random() * 9999),
        href: "/parameters",
        title: "Parametre Listesi",
      },

      {
        id: Math.floor(Math.random() * 9999),
        href: "/santral",
        title: "Santral",
      },
    ],
  },
];

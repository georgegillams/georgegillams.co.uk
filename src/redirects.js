const redirects = [
  { from: "/design", to: "/design/privacy-policy" },
  { from: "/wp-admin", to: "/admin/login" },
  { from: "/about/degree", to: "/work/degree" },
  { from: "/articles/tough-mudder", to: "/blog/tough-mudder" },
  { from: "/articles/net-neutrality", to: "/blog/net-neutrality" },
  { from: "/articles/vim", to: "/blog/vim" },
  { from: "/articles/uk-bank-security", to: "/blog/uk-bank-security" },
  { from: "/articles/week-of-rust", to: "/blog/week-of-rust" },
  {
    from: "/articles/react-http-response-codes",
    to: "/blog/react-http-response-codes"
  },
  { from: "/articles/list", to: "/blog" },
  { from: "/articles", to: "/blog" },
  { from: "/net-neutrality", to: "/blog/net-neutrality" },

  { to: "/blog", from: "/blog/view" },
  { to: "/travel", from: "/travel/view" },
  { to: "/blog/tough-mudder", from: "/blog/view?id=tg5x7po9" },
  { to: "/blog/lightroom-workflow", from: "/blog/view?id=lqngy" },
  { to: "/blog/net-neutrality", from: "/blog/view?id=w85aht" },
  { to: "/blog/vim", from: "/blog/view?id=azcpjh" },
  { to: "/blog/uk-bank-security", from: "/blog/view?id=y77dnh" },
  { from: "/travel/list", to: "/travel" },
  { to: "/travel/serre-chevalier-2017", from: "/travel/view?id=kzm87" },
  { to: "/travel/disneyland-2017", from: "/travel/view?id=m4noe" },
  { to: "/travel/munich-2017", from: "/travel/view?id=e0muz1" },
  { to: "/travel/longleat-2017", from: "/travel/view?id=evrd8w" },
  { to: "/travel/iceland-2018", from: "/travel/view?id=q03ms" },
  { from: "/art", to: "/photography" },
  { from: "/photoshop", to: "/photography" },
  { from: "/phot", to: "/photography" },
  { from: "/photo", to: "/photography" },
  { from: "/payment", to: "/payments" }
];

export default redirects;
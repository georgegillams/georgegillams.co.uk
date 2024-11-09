import { CONTACT_FORM, CONTRASTER_FEEDBACK_FORM } from 'client-utils/common/typeformConstants';
import appConfig from './appConfig';

const redirects = [
  {
    from: '/codebase',
    to: appConfig.githubRepoUrl,
  },
  { from: '/copyright', to: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  { from: '/flickr', to: 'https://www.flickr.com/photos/georgegillams' },
  { from: '/youtube', to: 'https://www.youtube.com/channel/UCT42ju8eCIWexjzT2whVOgQ' },
  { from: '/typeform', to: CONTACT_FORM },
  { from: '/monzo', to: 'https://join.monzo.com/r/vjd3d74' },
  { from: '/github', to: 'https://github.com/georgegillams' },
  { from: '/dotfiles', to: 'https://github.com/georgegillams/dotfiles' },
  { from: '/stackoverflow', to: 'https://stackoverflow.com/users/14463713/georgegillams' },
  { from: '/gurushots', to: 'https://gurushots.com/georgegillams/photos' },
  { from: '/unsplash', to: 'https://unsplash.com/@georgegillams/' },
  { from: '/strava', to: 'https://www.strava.com/athletes/7221483' },
  {
    from: '/linkedin',
    to: 'https://www.linkedin.com/in/george-gillams-37537077',
  },
  { from: '/twitter', to: 'https://twitter.com/georgegillams' },
  { from: '/facebook', to: 'https://www.facebook.com/profile.php?id=100073681786600' },
  { from: '/instagram', to: 'https://www.instagram.com/georgegillams/' },
  { from: '/spartan', to: 'https://uk.spartan.com/en/race/profile/3661120' },
  { from: '/linktree', to: 'https://linktr.ee/georgegillams' },

  { from: '/wp-admin', to: '/admin' },
  { from: '/about', to: '/' },
  { from: '/site-map', to: '/sitemap' },
  { from: '/about/degree', to: '/work/degree' },
  { from: '/articles/tough-mudder', to: '/blog/tough-mudder' },
  { from: '/articles/net-neutrality', to: '/blog/net-neutrality' },
  { from: '/articles/vim', to: '/blog/vim' },
  { from: '/articles/list', to: '/blog' },
  { from: '/articles', to: '/blog' },
  { from: '/net-neutrality', to: '/blog/net-neutrality' },
  { from: '/work/side-projects', to: '/work' },

  { from: '/blog/view', to: '/blog' },
  { from: '/travel', to: '/blog' },
  { from: '/travel/list', to: '/blog' },
  { from: '/blog/view?id=tg5x7po9', to: '/blog/tough-mudder' },
  { from: '/blog/view?id=lqngy', to: '/blog/lightroom-workflow' },
  { from: '/blog/view?id=w85aht', to: '/blog/net-neutrality' },
  { from: '/blog/view?id=azcpjh', to: '/blog/vim' },
  { from: '/blog/view?id=y77dnh', to: '/blog/uk-bank-security' },
  { from: '/art', to: '/photography' },
  { from: '/photoshop', to: '/photography' },
  { from: '/phot', to: '/photography' },
  { from: '/photo', to: '/photography' },
  { from: '/book', to: '/reading-list' },
  { from: '/books', to: '/reading-list' },
  { from: '/reading', to: '/reading-list' },
  { from: '/medals', to: '/races' },

  { from: '/contraster-feedback', to: CONTRASTER_FEEDBACK_FORM },
];

export default redirects;

import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import {
  citation,
  References,
  REFERENCE_STYLES,
} from 'react-component-academic-reference';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import Tag, { TAG_TYPES } from '../../components/Tag';
import netflixDownloads from './images/netflixDownloads.png';
import ArticleDate from '../../components/ArticleDate';
import LicenseInfo from '../../components/LicenseInfo';
import Comments from '../../components/Comments';
// import GoogleAds from '../../components/GoogleAds';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ScrollIndicator from '../../components/ScrollIndicator';
import scrollIntoView from 'scroll-into-view';

const bibtexParse = require('bibtex-parse-js');

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);
const DATE_WRITTEN = new Date(2017, 11, 8, 7, 1, 0);
const PAGE_ID = 957261;

// const myReferences = [
//   {
//     citationKey: 'SAMPLE1',
//     entryType: 'ARTICLE',
//     entryTags: { title: 'sample title', author: 'sample author' },
//   },
//   {
//     citationKey: 'SAMPLE2',
//     entryType: 'ARTICLE',
//     entryTags: { title: 'sample title', author: 'sample author' },
//   },
//   {
//     citationKey: 'SAMPLE3',
//     entryType: 'ARTICLE',
//     entryTags: { title: 'sample title', author: 'sample author' },
//   },
// ];

const myReferences = bibtexParse.toJSON(`
@book{wu2010master,
author = {Wu, Tim},
title = {The Master Switch: The Rise and Fall of Information Empires},
publisher = {Alfred A. Knopf},
year = {2010},
series = {Borzoi Books},
pmid = {2010004137},
isbn = {9780307269935},
rating = {0},
date-added = {2017-11-20T17:57:27GMT},
date-modified = {2017-11-21T11:18:46GMT},
url = {https://books.google.co.uk/books?id=tKr0QwAACAAJ},
uri = {url{papers3://publication/uuid/4AE35FBC-F32D-4073-ACBC-D2042A78A51A}}
}

@article{Wu:2006fm,
author = {Wu, Tim},
title = {Network Neutrality: Competition, Innovation, and Nondiscriminatory Access},
journal = {SSRN Electronic Journal},
year = {2006},
doi = {10.2139/ssrn.903118},
language = {English},
rating = {0},
date-added = {2017-11-20T17:26:30GMT},
date-modified = {2017-11-20T17:26:31GMT},
url = {http://www.ssrn.com/abstract=903118},
uri = {url{papers3://publication/doi/10.2139/ssrn.903118}}
}

@techreport{OECD:2016bt,
author = {OECD},
title = {Economic and Social Benefits of Internet Openness},
year = {2016},
month = jun,
publisher = {OECD Publishing},
doi = {10.1787/5jlwqf2r97g5-en},
issn = {2071-6826},
language = {English},
rating = {0},
date-added = {2017-11-14T10:00:07GMT},
date-modified = {2017-11-15T13:50:57GMT},
url = {http://www.oecd-ilibrary.org/science-and-technology/economic-and-social-benefits-of-internet-openness_5jlwqf2r97g5-en},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/A0/A053FD2C-746D-4FEE-AB03-AB74B4763138.pdf},
uri = {url{papers3://publication/doi/10.1787/5jlwqf2r97g5-en}}
}

@book{Anonymous:2016tl,
title = {Net Neutrality Compendium: Human Rights, Free Competition and the Future of the Internet},
publisher = {Springer International Publishing},
year = {2016},
address = {Cham},
isbn = {978-3-319-26425-7},
rating = {0},
date-added = {2017-11-21T20:18:28GMT},
date-modified = {2017-11-21T20:18:49GMT},
uri = {url{papers3://publication/uuid/08184EFF-970D-457A-9824-40A2D22F19C8}}
}

@techreport{Cisco:2017,
title = {Cisco Visual Networking Index: Forecast and Methodology, 2016-2021},
year = {2017},
month = jun,
publisher = {Cisco},
rating = {0},
date-added = {2017-11-21T09:50:53GMT},
date-modified = {2017-11-21T11:18:09GMT},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/EE/EE3C19BF-7E39-46A3-8691-407D6EDB9F73.pdf},
uri = {url{papers3://publication/uuid/66623391-5D3B-4E1F-AE38-C9DB104BE3BA}}
}

@article{Wu:2006fm,
author = {Wu, Tim},
title = {Network Neutrality: Competition, Innovation, and Nondiscriminatory Access}},
journal = {SSRN Electronic Journal},
year = {2006},
doi = {10.2139/ssrn.903118},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-15T14:29:43GMT},
date-modified = {2017-11-21T11:37:12GMT},
url = {http://www.ssrn.com/abstract=903118},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/B4/B4970815-E030-4F98-A230-337E18F25F58.pdf},
uri = {url{papers3://publication/doi/10.2139/ssrn.903118}}
}

@techreport{ComcastCFO,
title = {Edited Transcript: CMCSA - Comcast Corp at UBS Global Media and Communications Conference}},
year = {2016},
month = dec,
publisher = {Comminication Conference},
rating = {0},
date-added = {2017-11-23T17:19:27GMT},
date-modified = {2017-11-23T17:21:05GMT},
uri = {url{papers3://publication/uuid/9B7CF3CD-AC04-4DAD-A09A-837939744BAE}}
}

@book{Belli:2016fca,
editor = {Belli, Luca and De Filippi, Primavera},
title = {Net Neutrality Compendium}},
publisher = {Springer International Publishing},
year = {2016},
address = {Cham},
doi = {10.1007/978-3-319-26425-7},
isbn = {978-3-319-26424-0},
rating = {0},
date-added = {2017-11-20T18:00:04GMT},
date-modified = {2017-11-20T18:01:19GMT},
url = {http://link.springer.com/10.1007/978-3-319-26425-7},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7}}
}

@incollection{McDiarmid2016,
author = {McDiarmid, Andrew and Shears, Matthew},
title = {The Importance of Internet Neutrality to Protecting Human Rights Online}},
booktitle = {Net Neutrality Compendium},
year = {2016},
editor = {Belli, Luca and De Filippi, Primavera},
pages = {31--41},
publisher = {Springer International Publishing},
address = {Cham},
doi = {10.1007/978-3-319-26425-7_3},
isbn = {978-3-319-26425-7},
read = {Yes},
rating = {0},
date-added = {2017-11-20T18:00:04GMT},
date-modified = {2017-11-21T20:12:53GMT},
url = {https://doi.org/10.1007/978-3-319-26425-7_3},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7_3}}
}

@article{Lessig:2001ge,
author = {Lessig, Lawrence},
title = {The Internet under Siege}},
journal = {Foreign Policy},
year = {2001},
number = {127},
pages = {56},
month = nov,
doi = {10.2307/3183294},
read = {Yes},
rating = {0},
date-added = {2017-11-20T18:17:48GMT},
date-modified = {2017-11-21T11:37:12GMT},
url = {http://www.jstor.org/stable/3183294?origin=crossref},
uri = {url{papers3://publication/doi/10.2307/3183294}}
}

@article{Lessig:1997jn,
author = {Lessig, Lawrence},
title = {What Things Regulate Speech}},
journal = {SSRN Electronic Journal},
year = {1997},
doi = {10.2139/ssrn.33067},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-20T18:22:58GMT},
date-modified = {2017-11-21T11:37:12GMT},
url = {http://www.ssrn.com/abstract=33067},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/B9/B95A737F-7EA1-4F14-8E14-755E12EB619D.pdf},
uri = {url{papers3://publication/doi/10.2139/ssrn.33067}}
}

@incollection{Musiani2016,
author = {Musiani, Francesca and L{\"o}blich, Maria},
title = {Net Neutrality from a Public Sphere Perspective}},
booktitle = {Net Neutrality Compendium: Human Rights, Free Competition and the Future of the Internet},
year = {2016},
editor = {Belli, Luca and De Filippi, Primavera},
pages = {43--52},
publisher = {Springer International Publishing},
address = {Cham},
doi = {10.1007/978-3-319-26425-7_4},
isbn = {978-3-319-26425-7},
rating = {0},
date-added = {2017-11-21T20:18:28GMT},
date-modified = {2017-11-21T20:18:28GMT},
url = {https://doi.org/10.1007/978-3-319-26425-7_4},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7_4}}
}

@article{Loideain:2015ii,
author = {Loideain, Nora Ni},
title = {EU Law and Mass Internet Metadata Surveillance in the Post-Snowden Era}},
journal = {Media and Communication},
year = {2015},
volume = {3},
number = {2},
pages = {53--62},
month = sep,
doi = {10.17645/mac.v3i2.297},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-21T21:41:59GMT},
date-modified = {2017-11-23T21:05:08GMT},
url = {http://www.cogitatiopress.com/ojs/index.php/mediaandcommunication/article/view/297},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/C9/C9B68E0B-2E8E-4F6E-A265-F6708D0822CD.pdf},
uri = {url{papers3://publication/doi/10.17645/mac.v3i2.297}}
}

@book{Belli:2016fc,
editor = {Belli, Luca and De Filippi, Primavera},
title = {Net Neutrality Compendium}},
publisher = {Springer International Publishing},
year = {2016},
address = {Cham},
doi = {10.1007/978-3-319-26425-7},
isbn = {978-3-319-26424-0},
read = {Yes},
rating = {0},
date-added = {2017-11-14T10:35:20GMT},
date-modified = {2017-11-15T13:53:27GMT},
url = {http://link.springer.com/10.1007/978-3-319-26425-7},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7}}
}

@article{ReiffersMasson:2015wu,
author = {Reiffers-Masson, Alexandre and Hayel, Yezekael and Altman, Eitan},
title = {Pricing Agreement between Service and Content Providers: A Net Neutrality Issue}},
journal = {arXiv.org},
year = {2015},
eprint = {1505.03555v1},
eprinttype = {arxiv},
eprintclass = {cs.CY},
month = may,
read = {Yes},
rating = {0},
date-added = {2017-11-14T10:34:09GMT},
date-modified = {2017-11-23T21:04:53GMT},
url = {http://arxiv.org/abs/1505.03555v1},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/AB/AB56120A-D674-4D08-9648-CCA0D43F5840.pdf},
uri = {url{papers3://publication/uuid/B0A78EF9-4A62-4A34-8ABD-8EA8CA040DE6}}
}

@article{Foditsch:2016kk,
author = {Foditsch, Nathalia},
title = {Zero Rating: Evil or Savior? Data Access and Competition Aspects}},
journal = {SSRN Electronic Journal},
year = {2016},
doi = {10.2139/ssrn.2856003},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-23T21:21:33GMT},
date-modified = {2017-11-23T21:36:35GMT},
url = {https://www.ssrn.com/abstract=2856003},
uri = {url{papers3://publication/doi/10.2139/ssrn.2856003}}
}

@article{Taylor:2016ei,
author = {Taylor, Linnet},
title = {From Zero to Hero: How Zero-Rating Became a Debate about Human Rights}},
journal = {IEEE Internet Computing},
year = {2016},
volume = {20},
number = {4},
pages = {79--83},
doi = {10.1109/MIC.2016.88},
read = {Yes},
rating = {0},
date-added = {2017-11-23T21:21:20GMT},
date-modified = {2017-11-23T21:36:35GMT},
url = {http://ieeexplore.ieee.org/document/7529037/},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/80/80D88170-744C-47E3-95F1-36A43DA03D52.pdf},
uri = {url{papers3://publication/doi/10.1109/MIC.2016.88}}
}

@article{Lemley:2000fn,
author = {Lemley, Mark A and Lessig, Lawrence},
title = {The End of End-to-End: Preserving the Architecture of the Internet in the Broadband Era}},
journal = {SSRN Electronic Journal},
year = {2000},
doi = {10.2139/ssrn.247737},
language = {English},
rating = {0},
date-added = {2017-11-15T14:32:23GMT},
date-modified = {2017-11-15T18:13:22GMT},
url = {http://www.ssrn.com/abstract=247737},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/3E/3E18B3E1-62AC-44FD-8C8F-67D02C0AAEC7.pdf},
uri = {url{papers3://publication/doi/10.2139/ssrn.247737}}
}

@incollection{McDiarmid2016,
author = {McDiarmid, Andrew and Shears, Matthew},
title = {The Importance of Internet Neutrality to Protecting Human Rights Online}},
booktitle = {Net Neutrality Compendium},
year = {2016},
editor = {Belli, Luca and De Filippi, Primavera},
pages = {31--41},
publisher = {Springer International Publishing},
address = {Cham},
doi = {10.1007/978-3-319-26425-7_3},
isbn = {978-3-319-26424-0},
language = {English},
rating = {0},
date-added = {2017-11-20T18:00:04GMT},
date-modified = {2017-11-21T20:13:21GMT},
url = {http://link.springer.com/10.1007/978-3-319-26425-7_3},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7_3}}
}

@incollection{Belli:2015kl,
author = {Belli, Luca},
title = {End-to-End, Net Neutrality and Human Rights},
booktitle = {Net Neutrality Compendium},
year = {2015},
pages = {13--29},
publisher = {Springer International Publishing},
address = {Cham},
month = nov,
doi = {10.1007/978-3-319-26425-7_2},
isbn = {978-3-319-26424-0},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-14T10:35:19GMT},
date-modified = {2017-11-15T14:33:31GMT},
url = {http://link.springer.com/10.1007/978-3-319-26425-7_2},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/8E/8E541BDB-E080-4255-92DE-099EE82EC099.pdf},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7_2}}
}

@article{Lee:2009dc,
author = {Lee, Robin S and Wu, Tim},
title = {Subsidizing Creativity through Network Design: Zero-Pricing and Net Neutrality},
journal = {Journal of Economic Perspectives},
year = {2009},
volume = {23},
number = {3},
pages = {61--76},
month = aug,
annote = {Two-sided nature makes it subject to "network-effect" (the more users, the more valuable the resource)

This does not mean  that both sides should be charged equally - just like credit cards, th intermediary can charge vendors and not users




Consumers fund it difficult to know whether they want to use something until they have tried it. They tend, instead of paying up front, to not engage at all},
doi = {10.1257/jep.23.3.61},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-15T14:29:24GMT},
date-modified = {2017-11-21T11:37:12GMT},
url = {http://pubs.aeaweb.org/doi/10.1257/jep.23.3.61},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/46/46E4909F-34D7-4516-89D9-86B52017404A.pdf},
uri = {url{papers3://publication/doi/10.1257/jep.23.3.61}}
}

@book{Belli:2016fcb,
editor = {Belli, Luca and De Filippi, Primavera},
title = {Net Neutrality Compendium},
publisher = {Springer International Publishing},
year = {2016},
address = {Cham},
doi = {10.1007/978-3-319-26425-7},
isbn = {978-3-319-26424-0},
read = {Yes},
rating = {0},
date-added = {2017-11-21T20:14:49GMT},
date-modified = {2017-11-21T21:04:51GMT},
url = {http://link.springer.com/10.1007/978-3-319-26425-7},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/56/56ECD1D5-6EF2-4563-BC90-256029A51DE7.pdf},
uri = {url{papers3://publication/doi/10.1007/978-3-319-26425-7}}
}

@article{Cho:2016dn,
author = {Cho, Soohyun and Qiu, Liangfei},
title = {Less Than Zero? The Economic Impact of Zero Rating on Content Competition},
journal = {SSRN Electronic Journal},
year = {2016},
doi = {10.2139/ssrn.2844930},
language = {English},
read = {Yes},
rating = {0},
date-added = {2017-11-23T21:36:04GMT},
date-modified = {2017-11-23T21:36:19GMT},
url = {http://www.ssrn.com/abstract=2844930},
local-url = {file://localhost/Users/georgegillams/Dropbox/Library.papers3/Files/26/2612081E-14ED-4FB2-BE31-25976BA1CA06.pdf},
uri = {url{papers3://publication/doi/10.2139/ssrn.2844930}}
}

@webpage{Economist:2013,
author = {Economist, The},
title = {An ad-block shock: France V Google},
year = {2013},
month = jan,
url = {https://www.economist.com/news/business/21569414-xavier-niel-playing-rough-internet-giant-france-v-google},
rating = {0},
date-added = {2017-11-21T20:11:03GMT},
date-modified = {2017-11-21T20:11:03GMT},
uri = {url{papers3://publication/uuid/FB9A1668-C666-454F-A4BB-B5EEEF7731CF}}
}
`);

const onSelection = (event, identifier) => {
  const reference = document.getElementById(identifier);
  if (!reference) return;

  scrollIntoView(reference, {
    time: 1000,
  });
};

const Cite = citation(myReferences, onSelection);

const NetNeutrality = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <PageSwitchScroller />
      {/* <GoogleA ds /> */}
      <Section name="My Take on Net Neutrality">
        <ArticleDate date={DATE_WRITTEN} />
        {/* <SubSection >
          TODO
        </SubSection> */}
        <Tag type={TAG_TYPES.tech} link style={{ marginBottom: '0.5rem' }} />
        <SubSection name="Introduction">
          The Internet’s unique architecture has enabled it to rapidly expand
          its influence on our world. Within a relatively short period of time
          it has become a vast network which gives every user instant access to
          a wealth of knowledge, opinion, debate, innovation, and choice. It has
          been able to foster ideas and drive innovation thanks to its unique
          open and decentralised nature <Cite identifier="Lessig:2001ge" /> - a
          model which differs greatly from the architectures of traditional
          telecommunication networks <Cite identifier="Belli:2015kl" />. It has
          changed the way in which many industries and businesses operate, and
          the way consumers live. Net Neutrality (NN) has played an important
          part in allowing this change to come about by maintaining the
          Internet’s openness at a time when Internet Service Providers (ISPs)
          could controll everything at the network-level.
          <br />
          <br />
          The Internet’s impact on the World Wide Web (WWW) itself has been no
          exception. Since its invention, the WWW has changed beyond
          recognition. Once a system for accessing simple documents, the web now
          allows us to access a wide range of media types. We can stream all our
          music and video entertainment. We have continual access to photos of
          our friends on Facebook, and we can create various &quot;streams&quot;
          of our own lives through Snapchat and Strava. By 2019, it is forecast
          that 80% of all traffic on the Internet will be some form of video
          content <Cite identifier="Cisco:2017" />.
        </SubSection>
        <SubSection name="The effects of NN">
          An on-line service which uses these new high-data-rate formats may
          have significantly greater traffic demands than another. Due to the
          principle of NN, ISPs are unable to discriminate between services in
          response to the resulting imbalance of network traffic. They must, by
          law<sup>1</sup>, treat all (legal) content equally regardless of its
          source and destination. That’s not to say that ISPs are getting a bad
          deal from high-bandwidth services, as they are allowed to charge
          Content Providers (CPs) based on the bandwidth they use. The simple
          principle of NN makes the Internet a strangely level playing field
          which, according to Wu, makes it a platform where money can have a
          limited influence on speech <Cite identifier="Wu:2006fm" />.
          <br />
          <br />
          This simple principle makes the Internet fundamentally democratic. It
          empowers individuals to act free of governments and organisations{' '}
          <Cite identifier="Lessig:2001ge" />. If NN laws were to be relaxed,
          ISPs and governments would be able to control traffic on the Internet,
          becoming gatekeepers to the knowledge and services we access. ISPs
          would benefit financially from such a change. Governments and those
          who influence government decisions would benefit politically. Of
          course, the parties interested in destroying NN tell us that they just
          want to make the Internet safer by allowing a handful of organisations
          to hold complete guardianship over traffic on the net. In recent
          debates, Ajit Pai has also claimed that American ISPs cannot afford to
          invest in the infrastructure they provide without changes to NN. This
          is a surprising claim, given that Comcast’s Chief Financial Officer
          (CFO) informed investors in December 2016 that the ISP had no concerns
          with Title II (which contains the Net Neutrality legislation){' '}
          <Cite identifier="ComcastCFO" />.
          <br />
          <br />
          As the Internet has matured, it has become more centralised in many
          ways. The early Internet’s End to End (E2E) principle suggested that
          functionality should be implemented at endpoints wherever possible,
          and at network level wherever absolutely necessary [1]. ISPs have
          disregarded this principle in order to build connecting
          infrastructure, charging users and CPs as much as they can for access.
          This has allowed them to make vast profits and has facilitated the use
          of Internet Traffic Management (ITM) techniques. Many of these are
          necessary in order to maintain the network, such as protecting against
          Denial of Service (DOS) attacks and performing protocol-agnostic
          routing of traffic to keep congestion down. Thanks to the principle of
          NN, ISPs have not been able to abuse the shift towards centralisation
          in order to interfere with end-users’ enjoyment{' '}
          <Cite identifier="Belli:2015kl" />. If NN legislation were relaxed,
          they could capitalise on their new capabilities by charging users to
          access specific services whilst also invoicing CPs for access or
          priority access to their customer-base{' '}
          <Cite identifier="Lee:2009dc" />.
          <br />
          <br />
          <BpkText textStyle="xs">
            <sup>1</sup> EU law requires NN to be respected except for a few
            specific circumstances. US laws have protected NN since 2010, but
            Ajit Pai seeks to repeal the rules set down in the Federal
            Communications Commission (FCC)’s Open Internet Order.
          </BpkText>
        </SubSection>
        <SubSection name="The impact of changing NN legislation">
          According to the models analysed by Reiffers-Masson, Hayel, and
          Altman, allowing &quot;pricing agreements&quot; between CPs and ISPs
          would benefit Internet users in providing a better-perceived cost of
          service <Cite identifier="ReiffersMasson:2015wu" />. However, they
          also accept that this would come at a detriment to CPs.
          Reiffers-Masson, Hayel, and Altman claim that the charging of the
          two-sided market would reach an equilibrium, but also accept that they
          have not considered the effects of ISPs interfering with Quality of
          Service (QOS). They also, in my view, consider an unrealistic model in
          which users and CPs are exclusive groups. As far as Lee and Wu are
          concerned, users act as CPs in the sense that all media is
          &quot;content&quot; <Cite identifier="Lee:2009dc" />. I also feel it
          is wrong to ignore the detriment that the additional costs would bring
          to CPs. After-all, it is the absence of payments from content creators
          which has facilitated the entry of many content creators in the first
          place <Cite identifier="Lee:2009dc" />. Destroying NN would lead to
          reduced competition and innovation, and ultimately will negatively
          affect all those who thrive on the open platform.
          <br />
          <br />
          We must also remember that the Internet is a two-sided market, which
          means it is subject to ’network effects’ - by which an on-line service
          is more useful to users the more users there are. If users must pay to
          access specific services, the network-effects are more damaging to
          start-ups as users are often more likely to avoid a service completely
          than pay an upfront cost to evaluate its quality{' '}
          <Cite identifier="Lee:2009dc" />. If start-ups are held back from
          gaining users in this way, then their chances of disrupting an
          existing market through innovation could be crushed. This can already
          be seen in some countries where certain on-line services fall under a
          &quot;zero-rating&quot; category. Users can access websites in this
          category without using or paying for data towards them. This is often
          considered a grey-area in the NN debate. Although some countries allow
          this under NN laws, several have banned the practice on competition
          and freedom of expression grounds <Cite identifier="Cho:2016dn" />.
        </SubSection>
        <SubSection name="Conflict of Interest">
          ISPs all have some conflict of interest when it comes to the NN
          debate. They provide traditional telecommunication products with which
          modern Internet applications compete. For example, many individuals
          now use WhatsApp in place of Multimedia Message Service (MMS). If
          Verizon in the United States (US) were able to degrade user’s WhatsApp
          experience, then more MMS messages would be sent over their network
          and phone bills would rise.
          <br />
          Similarly, ISPs often have an interest in prioritising one 3rd-party
          service over another. This could be simply down to which service pays
          them more, or could relate to complicated political matters
          surrounding the companies. Ajit Pai strenuously denies that any ISP
          would ever carry out targeted, deliberate degradation of traffic to
          support their own interests, but it is done even with NN legislation
          in place. From May 2013, the download speeds for Americans accessing
          Netflix steadily fell on a number of networks, with several users
          reporting greater speeds when accessing the service via a Virtual
          Private Network (VPN)<sup>2</sup>. In February 2014 when Netflix
          resolved a dispute with Comcast, their speed was suddenly restored.
          This can be seen in Appendix A. Evidence of similar conduct by Free -
          an ISP in France - was seen during negotiations with Google{' '}
          <Cite identifier="Economist:2013" />.
          <br />
          <br />
          As well as providing millions of people with opportunities to reach
          large audiences, freedom on the Internet has broken down barriers to
          the free flow of information. This has enabled many to enjoy free
          expression, and democratic participation that would otherwise be
          impossible <Cite identifier="McDiarmid2016" />.
          <br />
          The openness of the Internet has enabled millions of people around the
          world to become owners in the political process of their country. The
          damaging effects of ending NN would not only harm the future of the
          technology itself, but also the freedoms that have been won by many{' '}
          <Cite identifier="Musiani2016" />.
          <br />
          <br />
          <BpkText textStyle="xs">
            <sup>2</sup> Using a VPN prevents ISPs from seeing the true source
            and destination of a user’s packets, which prevents them from
            treating traffic differently based on which service is being
            accessed.
          </BpkText>
        </SubSection>
        <SubSection name="Conclusion">
          Throughout history, whenever a new communication technology has been
          invented, it has always become less open during a process of
          consolidation by organisations who want power over the industry{' '}
          <Cite identifier="wu2010master" />. In many countries, governments
          have greatly enjoyed these monopolies is it provides them
          opportunities for mass intervention <Cite identifier="wu2010master" />.
          This is evident from the nature of illegal mass-surveillance
          operations that the US and United Kingdom (UK) carried out with the
          help of a number of large companies including Google, Facebook, and
          Apple <Cite identifier="Loideain:2015ii" />.
          <br />
          <br />
          If we allow ISPs to become gatekeepers of traffic and content on the
          Internet, they will be able to corrupt a system which currently allows
          users to freely connect with vast audiences. In doing so, they will
          gain total control over our communication, resulting in ISPs having
          unprecedented economical, social and political influence. It is
          important to protect NN globall, as the Internet is a global resource.
          Failing to protect NN in one country would have a huge knock-on effect
          for the rest of the world. For this reason, Canadian Prime Minister
          Justin Tradeau has condemned the attack on NN.
          <br />
          <br />
          The Internet is not currently broken. It fosters free-speech and
          creativity. Fundamental changes to the architecture of the Internet
          would risk damage to healthcare advances, trade, innovation and social
          well-being. Furthermore, abandoning NN could deny millions of
          individuals basic rights enjoyed by Internet-users around the world.
        </SubSection>
        <SubSection name="References">
          <References
            className={getClassName('pages__references')}
            referenceStyle={REFERENCE_STYLES.harvard}
            references={myReferences}
          />
        </SubSection>
        <SubSection name="Appendix A - Netflix download speeds on a number of American ISPs">
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            altText="Netflix download speeds on a number of American ISPs"
            width={987}
            height={575}
            src={netflixDownloads}
          />
        </SubSection>
      </Section>
      <LicenseInfo />
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

NetNeutrality.propTypes = {
  className: PropTypes.string,
};

NetNeutrality.defaultProps = {
  className: null,
};

export default NetNeutrality;

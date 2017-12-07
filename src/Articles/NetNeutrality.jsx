import React from 'react';
import Section from './../Section';
import SubSection from './../SubSection';

import STYLES from './../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const MainContent = () => (
  <main className={getClassName('main-content__main')}>
    <Section name="My Take on Net Neutrality">
      {/* <SubSection name="Abstract">
        TODO
      </SubSection> */}
      <SubSection name="Introduction">
        The Internet’s unique architecture has enabled it to rapidly expand its influence on our world. Within a relatively short period of time it has become a vast network which gives every user instant access to a wealth of knowledge, opinion, debate, innovation, and choice. It has been able to foster ideas and drive innovation thanks to its unique open and decentralised nature [7] - a model which differs greatly from the architectures of traditional telecommunication networks [1]. It has changed the way in which many industries and businesses operate, and the way consumers live. Net Neutrality (NN) has played an important part in allowing this change to come about by maintaining the Internet’s openness at a time when Internet Service Providers (ISPs) could controll everything at the network-level.
        <br />
        <br />
        The Internet’s impact on the World Wide Web (WWW) itself has been no exception. Since its invention, the WWW has changed beyond recognition. Once a system for accessing simple documents, the web now allows us to access a wide range of media types. We can stream all our music and video entertainment. We have continual access to photos of our friends on Facebook, and we can create various &quot;streams&quot; of our own lives through Snapchat and Strava. By 2019, it is forecast that 80% of all traffic on the Internet will be some form of video content [3].
      </SubSection>
      <SubSection name="Fact Analysis">
        An on-line service which uses these new high-data-rate formats may have significantly greater traffic demands than another. Due to the principle of NN, ISPs are unable to discriminate between services in response to the resulting imbalance of network traffic. They must, by law1, treat all (legal) content equally regardless of its source and destination. That’s not to say that ISPs are getting a bad deal from high-bandwidth services, as they are allowed to charge Content Providers (CPs) based on the bandwidth they use.
        The simple principle of NN makes the Internet a strangely level playing field which, according to Wu, makes it a platform where money can have a limited influence on speech [12].
        <br />
        <br />
        This simple principle makes the Internet fundamentally democratic. It empowers individuals to act free of governments and organisations [7]. If NN laws were to be relaxed, ISPs and governments would be able to control traffic on the Internet, becoming gatekeepers to the knowledge and services we access. ISPs would benefit financially from such a change. Governments and those who influence government decisions would benefit politically. Of course, the parties interested in destroying NN tell us that they just want to make the Internet safer by allowing a handful of organisations to hold complete guardianship over traffic on the net. In recent debates, Ajit Pai has also claimed that American ISPs cannot afford to invest in the infrastructure they provide without changes to NN. This is a surprising claim, given that Comcast’s Chief Financial Officer (CFO) informed investors in December 2016 that the ISP had no concerns with Title II (which contains the Net Neutrality legislation) [5].
        <br />
        <br />
        As the Internet has matured, it has become more centralised in many ways. The early Internet’s End to End (E2E) principle suggested that functionality should be implemented at endpoints wherever possible, and at network level wherever absolutely necessary [1]. ISPs have disregarded this principle in order to build connecting infrastructure, charging users and CPs as much as they can for access. This has allowed them to make vast profits and has facilitated the use of Internet Traffic Management (ITM) techniques. Many of these are necessary in order to maintain the network, such as protecting against Denial of Service (DOS) attacks and performing protocol-agnostic routing of traffic to keep congestion down. Thanks to the principle of NN, ISPs have not been able to abuse the shift towards centralisation in order to interfere with end-users’ enjoyment [1]. If NN legislation were relaxed, they could capitalise on their new capabilities by charging users to access specific services whilst also invoicing CPs for access or priority access to their customer-base [6].
      </SubSection>
      <SubSection name="Logical Consistency">
        According to the models analysed by Reiffers-Masson, Hayel, and Altman, allowing &quot;pricing agreements&quot; between CPs and ISPs would benefit Internet users in providing a better-perceived cost of service [11]. However, they also accept that this would come at a detriment to CPs. Reiffers-Masson, Hayel, and Altman claim that the charging of the two-sided market would reach an equilibrium, but also accept that they have not considered the effects of ISPs interfering with Quality of Service (QOS). They also, in my view, consider an unrealistic model in which users and CPs are exclusive groups. As far as Lee and Wu are concerned, users act as CPs in the sense that all media is &quot;content&quot; [6]. I also feel it is wrong to ignore the detriment that the additional costs would bring to CPs. After-all, it is the absence of payments from content creators which has facilitated the entry of many content creators in the first place [6]. Destroying NN would lead to reduced competition and innovation, and ultimately will negatively affect all those who thrive on the open platform.
        <br />
        <br />
        We must also remember that the Internet is a two-sided market, which means it is subject to ’network effects’ - by which an on-line service is more useful to users the more users there are. If users must pay to access specific services, the network-effects are more damaging to start-ups as users are often more likely to avoid a service completely than pay an upfront cost to evaluate its quality [6]. If start-ups are held back from gaining users in this way, then their chances of disrupting an existing market through innovation could be crushed. This can already be seen in some countries where certain on-line services fall under a &quot;zero-rating&quot; category. Users can access websites in this category without using or paying for data towards them. This is often considered a grey-area in the NN debate. Although some countries allow this under NN laws, several have banned the practice on competition and freedom of expression grounds [2].
      </SubSection>
      <SubSection name="Conflict of Interest">
        ISPs all have some conflict of interest when it comes to the NN debate. They provide traditional telecommunication products with which modern Internet applications compete. For example, many individuals now use WhatsApp in place of Multimedia Message Service (MMS). If Verizon in the United States (US) were able to degrade user’s WhatsApp experience, then more MMS messages would be sent over their network and phone bills would rise.
        <br />
        Similarly, ISPs often have an interest in prioritising one 3rd-party service over another. This could be simply down to which service pays them more, or could relate to complicated political matters surrounding the companies. Ajit Pai strenuously denies that any ISP would ever carry out targeted, deliberate degradation of traffic to support their own interests, but it is done even with NN legislation in place. From May 2013, the download speeds for Americans accessing Netflix steadily fell on a number of networks, with several users reporting greater speeds when accessing the service via a Virtual Private Network (VPN)2. In February 2014 when Netflix resolved a dispute with Comcast, their speed was suddenly restored. This can be seen in Appendix A. Evidence of similar conduct by Free - an ISP in France - was seen during negotiations with Google [4].
        <br />
        <br />
        As well as providing millions of people with opportunities to reach large audiences, freedom on the Internet has broken down barriers to the free flow of information. This has enabled many to enjoy free expression, and democratic participation that would otherwise be impossible [9].
        <br />
        The openness of the Internet has enabled millions of people around the world to become owners in the political process of their country. The damaging effects of ending NN would not only harm the future of the technology itself, but also the freedoms that have been won by many [10].
      </SubSection>
      <SubSection name="Conclusion">
        Throughout history, whenever a new communication technology has been invented, it has always become less open during a process of consolidation by organisations who want power over the industry [13].
        In many countries, governments have greatly enjoyed these monopolies is it provides them opportunities for mass intervention [13]. This is evident from the nature of illegal mass-surveillance operations that the US and United Kingdom (UK) carried out with the help of a number of large companies including Google, Facebook, and Apple [8].
        <br />
        <br />
        If we allow ISPs to become gatekeepers of traffic and content on the Internet, they will be able to corrupt a system which currently allows users to freely connect with vast audiences. In doing so, they will gain total control over our communication, resulting in ISPs having unprecedented economical, social and political influence. It is important to protect NN globall, as the Internet is a global resource. Failing to protect NN in one country would have a huge knock-on effect for the rest of the world. For this reason, Canadian Prime Minister Justin Tradeau has condemned the attack on NN.
        <br />
        <br />
        The Internet is not currently broken. It fosters free-speech and creativity. Fundamental changes to the architecture of the Internet would risk damage to healthcare advances, trade, innovation and social well-being. Furthermore, abandoning NN could deny millions of individuals basic rights enjoyed by Internet-users around the world.
      </SubSection>
      <SubSection name="References">
        [1] Luca Belli. “End-to-End, Net Neutrality and Human Rights”. English. In: Net Neutrality Compendium. Cham: Springer International Publishing, Nov. 2015, pp. 13–29. ISBN: 978-3-319-26424-0. DOI: 10.1007/978-3-319-26425-7_2. URL: http:\/\/link. springer.com/10.1007/978-3-319-26425-7_2.
        <br />
        <br />
        [2] Soohyun Cho and Liangfei Qiu. “Less Than Zero? The Economic Impact of Zero Rating on Content Competition”. English. In: SSRN Electronic Journal (2016). DOI: 10.2139/ ssrn.2844930. URL: http:\/\/www.ssrn.com/abstract=2844930.
        <br />
        <br />
        [3] Cisco Visual Networking Index: Forecast and Methodology, 2016-2021. Tech. rep. June 2017.
        <br />
        <br />
        [4] The Economist. An ad-block shock: France V Google. Jan. 2013. URL: https : / / www . economist.com/news/business/21569414-xavier-niel-playing-rough-internet-giant-france-v-google.
        <br />
        <br />
        [5] Edited Transcript: CMCSA - Comcast Corp at UBS Global Media and Communications Conference. Tech. rep. Dec. 2016.
        <br />
        <br />
        [6] Robin S Lee and Tim Wu. “Subsidizing Creativity through Network Design: Zero-Pricing and Net Neutrality”. English. In: Journal of Economic Perspectives 23.3 (Aug. 2009), pp. 61– 76. DOI: 10.1257/jep.23.3.61. URL: http:\/\/pubs.aeaweb.org/doi/10.1257/ jep.23.3.61.
        <br />
        <br />
        [7] Lawrence Lessig. “The Internet under Siege”. In: Foreign Policy 127 (Nov. 2001), p. 56. DOI: 10.2307/3183294. URL: http:\/\/www.jstor.org/stable/3183294?origin= crossref.
        <br />
        <br />
        [8] Nora Ni Loideain. “EU Law and Mass Internet Metadata Surveillance in the Post-Snowden Era”. English. In: Media and Communication 3.2 (Sept. 2015), pp. 53–62. DOI: 10.17645/ mac.v3i2.297. URL: http:\/\/www.cogitatiopress.com/ojs/index.php/ mediaandcommunication/article/view/297.
        <br />
        <br />
        [9] Andrew McDiarmid and Matthew Shears. “The Importance of Internet Neutrality to Protecting Human Rights Online”. In: Net Neutrality Compendium. Ed. by Luca Belli and Primavera De Filippi. Cham: Springer International Publishing, 2016, pp. 31–41. ISBN: 978- 3-319-26425-7. DOI: 10.1007/978-3-319-26425-7_3. URL: https:\/\/doi.org/ 10.1007/978-3-319-26425-7_3.
        <br />
        <br />
        [10] Francesca Musiani and Maria Löblich. “Net Neutrality from a Public Sphere Perspective”. In: Net Neutrality Compendium: Human Rights, Free Competition and the Future of the Internet. Ed. by Luca Belli and Primavera De Filippi. Cham: Springer International Publishing, 2016, pp. 43–52. ISBN: 978-3-319-26425-7. DOI: 10.1007/978-3-319-26425- 7_4. URL: https:\/\/doi.org/10.1007/978-3-319-26425-7_4.
        <br />
        <br />
        [11] Alexandre Reiffers-Masson, Yezekael Hayel, and Eitan Altman. “Pricing Agreement between Service and Content Providers: A Net Neutrality Issue”. In: arXiv.org (May 2015). arXiv: 1505.03555v1 [cs.CY]. URL: http:\/\/arxiv.org/abs/1505.03555v1.
        <br />
        <br />
        [12] Tim Wu. “Network Neutrality: Competition, Innovation, and Nondiscriminatory Access”. English. In: SSRN Electronic Journal (2006). DOI: 10.2139/ssrn.903118. URL: http:\/\/www.ssrn.com/abstract=903118.
        <br />
        <br />
        [13] Tim Wu. The Master Switch: The Rise and Fall of Information Empires. Borzoi Books. Alfred A. Knopf, 2010. ISBN: 9780307269935. URL: https:\/\/books.google.co.uk/books? id=tKr0QwAACAAJ.
      </SubSection>
    </Section>
  </main>
);

export default MainContent;

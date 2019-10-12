const actionDefinitions = [
  {
    LOAD_LINKS: 'tbd',
    attributes: [],
  },
  {
    LOAD_LINKS_SUCCESS: 'tbd',
    attributes: ['links'],
  },
  {
    LOAD_LINKS_ERROR: 'tbd',
    attributes: ['loadLinksError'],
  },
  {
    ADD_LINK: 'tbd',
    attributes: ['linkDefinition'],
  },
  {
    ADD_LINK_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    ADD_LINK_ERROR: 'tbd',
    attributes: ['addLinkError'],
  },
  {
    DELETE_LINK: 'tbd',
    attributes: ['linkId'],
  },
  {
    DELETE_LINK_SUCCESS: 'tbd',
    attributes: [],
  },
  {
    DELETE_LINK_ERROR: 'tbd',
    attributes: ['deleteLinkError'],
  },
];

export default actionDefinitions;

import get from 'lodash.get';
import { toGlossaryKey } from '../../../detail/services/endpoint-parser/endpoint-parser';
import GLOSSARY from '../../../detail/services/glossary.constant';
import { routing } from '../../../app/routes';
import { VIEW_MODE } from '../../ducks/ui/ui';
import PARAMETERS from '../../../store/parameters';

export const mapDocumentTitle = (action, defaultTitle) => {
  let pageTitle = defaultTitle;
  const view = get(action, `meta.query[${PARAMETERS.VIEW}]`, '');
  const embed = get(action, `meta.query[${PARAMETERS.EMBED}]`, 'false');
  if (view === VIEW_MODE.MAP) {
    pageTitle = 'Grote kaart';
    if (embed === 'true') {
      pageTitle = `${pageTitle} | Embeded`;
    }
  }

  return pageTitle;
};

export const detailDocumentTitle = (action, defaultTitle = 'UNKNOWN') => {
  const glossaryKey = toGlossaryKey(action.payload.type, action.payload.subtype);
  const glossaryDefinition = GLOSSARY.DEFINITIONS[glossaryKey];
  const label = glossaryDefinition ? glossaryDefinition.label_singular : defaultTitle;

  return label;
};

const documentTitleRouteMapping = [
  {
    route: routing.data.type,
    getTitle: mapDocumentTitle
  },
  {
    route: routing.dataDetail.type,
    getTitle: detailDocumentTitle
  }
];

export default documentTitleRouteMapping;

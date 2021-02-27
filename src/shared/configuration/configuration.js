const applicationConfig = {
    head: {
      androidIcon: '/icon_192x192.png',
      backgroundColor: '#ffffff',
      favicon: '/favicon.png',
      iosIcon: '/icon_180x180.png',
      statusBarStyle: 'default',
      themeColor: '#ec0000',
    },
    logo: {
      url: 'https://www.denhaag.nl/static/denhaagrestylepresentation/images/DH-NL-Rgb-CS6.svg',
      width: 400,
      height: 150,
      smallWidth: 300,
      smallHeight: 100,
    },
    sentry: {
      dsn: 'https://3de59e3a93034a348089131aa565bdf4@sentry.data.amsterdam.nl/27',
    },
    matomo: {
      urlBase: 'https://analytics.data.amsterdam.nl/',
      siteId: 14,
    },
    language: {
      avgDisclaimer:
        "De gemeente Amsterdam verwerkt uw persoonsgegevens op een zorgvuldige en veilige manier in overeenstemming met de geldende wet- en regelgeving, waaronder de Algemene Verordening Gegevensbescherming. Lees meer hierover op <a href='##AVG_DISCLAIMER_URL##'>Privacyverklaring Meldingen openbare ruimte en overlast</a>.",
      consentToContactSharing:
        'Ja, ik geef de gemeente Amsterdam toestemming om mijn contactgegevens te delen met andere organisaties, als dat nodig is om mijn melding goed op te lossen.',
      footer1:
        "Bel het Gemeentelijk informatienummer: <a href='tel:##GENERAL_PHONE_NUMBER_FORMATTED##'>##GENERAL_PHONE_NUMBER##</a>",
      footer2: 'op werkdagen van 08.00 tot 18.00 uur.',
      headerTitle: '',
      phoneNumber: '14 020',
      shortTitle: 'SIA',
      siteTitle: 'SIA - Signalen Informatievoorziening Amsterdam',
      smallHeaderTitle: '',
      title: 'Signalen Informatievoorziening Amsterdam',
      urgentContactInfo: 'Voor spoedeisende zaken kunt u ook telefonisch contact opnemen met 14 020.',
    },
    links: {
      help: 'https://www.denhaag.nl/',
      home: 'http://localhost:3001',
      privacy: 'https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-wonen/meldingen-overlast-privacy/',
    },
    theme: {
      colors: {
        primary: {
          main: '#1D6B34',
          dark: '#155429',
        },
        secondary: {
          main: '#B38000',
          dark: '#CCA000',
        },
      },
    },
    map: {
      municipality: 'Hague',
      options: {
          center: [4.32272127841567, 52.08421239890297],
        maxBounds: [
          [4.3227212, 52.0842123],
          [4.2227212, 52.1842123],
        ],
        maxZoom: 16,
        minZoom: 8,
        zoom: 14,
      },
      optionsBackOffice: {
        maxZoom: 16,
        minZoom: 7,
        zoom: 7,
      },
      tiles: {
        args: ['https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png'],
        options: {
          attribution: 'Kaartgegevens CC-BY-4.0 Gemeente Amsterdam',
          subdomains: ['t1', 't2', 't3', 't4'],
          tms: true,
        },
      },
    },
    fetchQuestionsFromBackend: false,
    showVulaanControls: true,
    STATIC_MAP_SERVER_URL: 'https://map.data.amsterdam.nl/maps/topografie',
    AUTH_ME_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/me/',
    CATEGORIES_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/public/terms/categories/',
    CATEGORIES_PRIVATE_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/categories/',
    DEPARTMENTS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/departments/',
    FEEDBACK_FORMS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/public/feedback/forms/',
    FEEDBACK_STANDARD_ANSWERS_ENDPOINT:
      'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/public/feedback/standard_answers/',
    FILTERS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/me/filters/',
    GEOGRAPHY_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/signals/geography',
    IMAGE_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/signal/image/',
    INCIDENTS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/signals/',
    INCIDENT_PRIVATE_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/signals/',
    INCIDENT_PUBLIC_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/public/signals/',
    OIDC_AUTH_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:5556/auth',
    OIDC_CLIENT_ID: 'signals',
    OIDC_RESPONSE_TYPE: 'id_token',
    OIDC_SCOPE: 'openid+email+profile',
    OVL_KLOKKEN_LAYER:
      'https://map.data.amsterdam.nl/maps/openbare_verlichting?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=Klokken&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326',
    OVL_VERLICHTING_LAYER:
      'https://map.data.amsterdam.nl/maps/openbare_verlichting?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=Verlichting&version=1.1.0&srsname=urn:ogc:def:crs:EPSG::4326',
    PERMISSIONS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/permissions/',
    PREDICTION_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/category/prediction',
    QUESTIONS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/public/questions/',
    ROLES_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/roles/',
    SEARCH_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/search',
    TERMS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/terms/categories/',
    USERS_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/users/',
    STADSDEEL_ENDPOINT: 'http://ec2-52-200-189-81.compute-1.amazonaws.com:8000/signals/v1/private/get_stadsdeel/',
    GEOCODE_SERVICE_ENDPOINT: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json',
    default: 'Testing',
  };
  
  const configProxy = new Proxy(applicationConfig, {
    get(target, name, receiver) {
      if (!Reflect.has(target, name)) {
        return undefined;
      }
  
      return Reflect.get(target, name, receiver);
    },
  
    deleteProperty() {
      throw new Error('Props cannot be deleted');
    },
  });
  
  Object.preventExtensions(configProxy);
  
  export default configProxy;
  
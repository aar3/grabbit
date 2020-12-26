// IMPORTANT: all state properties are snake-cased because that's how the python
// api sends data over the wire
const defaultState = {
  user: {
    id: 1,
    created_at: '2020-12-06 16:21:33.521762-8',
    updated_at: null,
    deleted_at: null,
    email: 'ava@gmail.com',
    name: 'Ava Campo',
    username: 'ava',
    address_line_1: '5916 Bottoms Dairy Rd',
    address_line_2: 'Elm City, NC 27822',
    phone: '+1 555-555-5555',
    current_session_token: '319a80a21e02e87bb4c1d983f01c6097c0de9ddbd329a1a27cfa40b94a959eb8',
    qr_code_url: null,
  },
  rewards: {
    list: [
      {
        id: 1,
        description: '15% off purchase off select purchase of Nike Urban Fit',
        expiry: '1/12/2021',
        code: 'NIKE-CFX13M',
        qr_code_url:
          'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        merchant: {
          image_url: 'https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg',
          name: 'Nike',
          alternative_name: 'Nike Corporation',
          primary_color: '#00000',
        },
      },
      {
        id: 2,
        description: "10% off men's tops from with purchase of $50 or more",
        expiry: '2/21/2021',
        code: 'SUPR-AG78E',
        qr_code_url:
          'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        merchant: {
          image_url: 'https://ak.picdn.net/shutterstock/videos/1032859976/thumb/10.jpg',
          name: 'Supreme',
          primary_color: '#CF0F0F',
          alternative_name: 'Vivandi Group Intl.',
        },
      },
    ],
    focused: {
      id: 1,
      code: 'NIKE-CFX13M',
      description: '15% off purchase off select purchase of Nike Urban Fit',
      expiry: '1/12/2021',
      qr_code_url:
        'https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
      merchant: {
        image_url: 'https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg',
        name: 'Nike',
        alternative_name: 'Nike Corporation',
        primary_color: '#000',
      },
    },
  },
  plaid: {
    accounts: [],
  },
};

export default function (state = defaultState, action) {
  const {payload, stateKey, operation, key} = action;

  const checks = [!payload, !stateKey, !operation];

  if (checks.some((x) => x)) {
    console.log('Invalid state updated passed');
    return state;
  }

  let stateObject = state;
  const nodes = stateKey.split('.').slice(1);
  let i;
  for (i = 0; i < nodes.length - 1; i++) {
    stateObject = stateObject[nodes[i]];
  }

  let updated = stateObject;

  if (operation === 'replace') {
    updated = payload;
  } else {
    if (updated instanceof object && key.length) {
      updated[key] = payload;
    } else if (updated.isArray()) {
      updated.push(payload);
    } else {
      updated = payload;
    }
  }

  stateObject[nodes[i]] = updated;

  return state;
}

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
};

export default function (state = defaultState, action) {
  return;
}

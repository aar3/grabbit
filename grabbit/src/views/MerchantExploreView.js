import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import Emoji from 'react-native-emoji';
import Icon from 'react-native-vector-icons/Feather';

import BrokerProfileModal from 'grabbit/src/components/modals/BrokerProfile';
import {FakeImage, Color, MerchantExploreItem} from 'grabbit/src/const';
import {Actions} from 'react-native-router-flux';
// import {SearchTextInput} from 'grabbit/src/components/text-input';

// emoji list https://unicodey.com/emoji-data/table.htm
const data = [
  {
    id: '1',
    label: 'M',
    type: 'product',
    name: 'Lorem Ipsum – Generator, Origins and Meaning',
    image_url: FakeImage,
    rating: '+30%',
    emojiName: 'fire',
    metric: 'Engagement',
    period: 'Past 7 days',
  },
  {
    id: '2',
    type: 'broker',
    label: 'B',
    name: 'Garrison Gowens',
    image_url: FakeImage,
    metric: 'Views',
    rating: '+10%',
    period: 'Past 24 hours',
  },
  {
    id: '3',
    type: 'broker',
    label: 'B',
    name: 'Ava Turing',
    image_url: FakeImage,
    metric: 'Likes',
    rating: '+10%',
    period: 'Past 10 minutes',
  },
  {
    id: '4',
    type: 'product',
    label: 'P',
    name: 'Air Jordan IX - Limited LTE',
    emojiName: 'boom',
    image_url: FakeImage,
    metric: 'Likes',
    rating: '+1,183%',
    period: 'Past 3 days',
  },
  {
    id: '5',
    type: 'merchant',
    label: 'M',
    name: 'Collonia Diapers LLC',
    image_url: FakeImage,
    metric: 'Attribution',
    rating: '+10%',
    period: 'Past 3 days',
  },
  {
    id: '6',
    label: 'M',
    type: 'product',
    name: 'Lorem Ipsum – Generator, Origins and Meaning',
    emojiName: 'hot_pepper',
    image_url: FakeImage,
    rating: '+30%',
    metric: 'Engagement',
    period: 'Past 7 days',
  },
  {
    id: '7',
    type: 'broker',
    label: 'B',
    name: 'Garrison Gowens',
    image_url: FakeImage,
    metric: 'Views',
    rating: '+10%',
    period: 'Past 24 hours',
  },
  {
    id: '8',
    type: 'broker',
    label: 'B',
    name: 'Ava Turing',
    image_url: FakeImage,
    metric: 'Likes',
    rating: '+10%',
    period: 'Past 10 minutes',
  },
  {
    id: '9',
    type: 'merchant',
    label: 'M',
    name: 'Grabbit Inc of Los Angeles',
    image_url: FakeImage,
    metric: 'Engagement',
    rating: '+39%',
    period: 'Past 3 days',
  },
  {
    id: '10',
    type: 'merchant',
    label: 'M',
    name: 'Collonia Diapers LLC',
    image_url: FakeImage,
    metric: 'Attribution',
    rating: '+10%',
    period: 'Past 3 days',
  },
];

class FlatListRow extends React.Component {
  render() {
    const {data} = this.props;
    const emoji = data.emojiName ? <Emoji name={data.emojiName} style={{fontSize: 12}} /> : null;
    return (
      <View style={styles.FlatListRow__Container}>
        <View style={styles.FlatListRow__Container__Image}>
          <Image source={{uri: data.image_url}} style={{height: 70, width: 70}} />
        </View>
        <View style={styles.FlatListRow__Container__Info}>
          <Text style={{marginBottom: 5}}>{data.name}</Text>
          {/* <Text style={{marginBottom: 5, fontSize: 10, fontWeight: 'bold'}}>{data.label}</Text> */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginBottom: 5,
                color: Color.Pink2,
                marginRight: 20,
                fontSize: 12,
              }}>{`${data.metric}: ${data.rating}`}</Text>
            {emoji}
          </View>
          <Text style={{color: Color.GreyText, fontSize: 10}}>{data.period}</Text>
        </View>
      </View>
    );
  }
}

export default class MerchantExploreView extends React.Component {
  constructor(props) {
    super(props);
    this.brokerProfileModal = React.createRef();
  }

  render() {
    return (
      <View style={styles.MerchantExploreView}>
        <BrokerProfileModal ref={this.brokerProfileModal} />
        <FlatList
          style={styles.MerchantExploreView__FlatList}
          data={data}
          renderItem={({item, index}) => {
            if (item.label === MerchantExploreItem.Broker) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.brokerProfileModal.current.show();
                  }}>
                  <FlatListRow data={item} />
                </TouchableOpacity>
              );
            } else if (item.label === MerchantExploreItem.Product) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Actions.productInfo();
                  }}>
                  <FlatListRow data={item} />
                </TouchableOpacity>
              );
            }
            return <FlatListRow data={item} />;
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MerchantExploreView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListRow__Container: {
    // borderWidth: 1,
    // borderColor: 'blue',
    borderBottomWidth: 1,
    borderBottomColor: Color.LightGrey,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  FlatListRow__Container__Info: {
    // borderWidth: 1,
    // borderColor: 'red',
    padding: 5,
    marginLeft: 20,
    width: '70%',
  },
  MerchantExploreView__FlatList: {
    width: '100%',
  },
  FlatListRow__Container__Image: {
    borderRadius: 100,
    height: 70,
    width: 70,
    overflow: 'hidden',
  },
});

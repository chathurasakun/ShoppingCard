import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppImage from '../functions/image';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/Actions/CartAction';

class ItemCell extends PureComponent {

  removeItemFromCart = (item) => {
    Alert.alert(
      'Warning',
      'Are you sure?',
      [
        {
          text: 'Ok',
          onPress: () => { this.props.removeFromCart(item); },
        },
        {
          text: 'Cancel',
          onPress: () => { console.log('cancel') },
        }
      ],
    )
  }

  render = () => {
    return (
      <TouchableOpacity onPress={() => {
        if (!this.props.fromCardView)
          Actions.push('itemDetails', { 'itemDesc': this.props.listItem });
      }}
      >
        <View style={ItemCellStyle.MainContainer}>
          <Image
            style={ItemCellStyle.Image}
            source={{ uri: this.props.listItem.image }}
          />
          {(this.props.fromCardView) ?
            <View style={{ flexDirection: 'row' }}>
              <View style={ItemCellStyle.InnerContainer}>
                <Text style={ItemCellStyle.ItemName}>{this.props.listItem.name}</Text>
                <Text style={ItemCellStyle.ItemPrice}>Rs {this.props.listItem.price}.00</Text>
                <Text>Ordered Item Count: {this.props.listItem.count}</Text>
                <Text>Total Price: {this.props.listItem.count * this.props.listItem.price}</Text>
              </View>
              <TouchableOpacity onPress={() => this.removeItemFromCart(this.props.listItem)}>
                <Image source={AppImage.delete} style={{ width: 40, height: 40, marginLeft: 20 }} />
              </TouchableOpacity>
            </View>
            :
            <View style={ItemCellStyle.InnerContainer}>
              <Text style={ItemCellStyle.ItemName}>{this.props.listItem.name}</Text>
              <Text style={ItemCellStyle.ItemPrice}>Rs {this.props.listItem.price}.00</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => {
      dispatch(removeFromCart(item))
    }
  }
}

export default connect(null, mapDispatchToProps)(ItemCell);

const ItemCellStyle = StyleSheet.create({
  'MainContainer': {
    flexDirection: 'row',
    padding: 10,
    borderColor: '#9B9B9B',
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF'
  },
  'Image': {
    width: 100,
    height: 100
  },
  'InnerContainer': {
    flexDirection: 'column',
    paddingLeft: 10
  },
  'ItemName': {
    fontWeight: '800',
    fontSize: 17
  },
  ItemPrice: {
    fontWeight: '300',
    fontSize: 13
  }
});
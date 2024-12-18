import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const CleverTap = require('clevertap-react-native');

class Screendetailed extends Component {
    constructor(props: AppProps) {
        super(props);
        this.state = {
          image_url:'',
          event_name:'',
          section_title: 'Must Try',
        };
      }
  componentDidMount() {
    // Access the parameters from route.params in componentDidMount
    const { key1, key2 } = this.props.route.params;

    // Print the values in the console
    console.log(`Key1: ${key1}`);
    console.log(`Key2: ${key2}`);

    this.setState({
        event_name:key1,
        image_url:key2
    })
  }

  handleButtonClick = () => {
    // Print a message when the button is clicked
    console.log('event name is'+this.state.event_name);
    CleverTap.recordEvent(this.state.event_name);
  };

  render() {
    // Access the parameters to display in the UI
    const { key1, key2 } = this.props.route.params;

    return (
      <View style={styles.container}>


        {/* Image above the button */}
        <Image
          source={{ uri: this.state.image_url }} // Replace with your image URL or local path
          style={styles.image}
        />

        {/* Rounded Orange Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleButtonClick} // Handle button click
        >
          <Text style={styles.buttonText}>Check Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: 400, // Set the width of the image
    height: 400, // Set the height of the image
    marginBottom: 20, // Space between image and button
    borderRadius: 10, // Optional: makes the image corners rounded
  },
  button: {
    backgroundColor: '#FFA500', // Orange color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30, // Rounded corners
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
});

export default Screendetailed;

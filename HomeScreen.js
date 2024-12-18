import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Dimensions, ScrollView } from 'react-native';
const CleverTap = require('clevertap-react-native');

interface AppProps {
  // Define any props here if needed
}

interface AppState {
  inputText: string;
  imageSource: string | null; // State variable to hold image source URI
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      inputText: '',
      imageSource: 'https://example.com/default-image.jpg', // Initial image source
      campaign_id:''
      
    };
  }

  componentDidMount() {
    // Code to run on component load
    console.log('Component has been mounted');
    CleverTap.initializeInbox();
    console.log("CT ID  == ",CleverTap.getCleverTapID())
    CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (event) => {
      // this._handleCleverTapEvent(CleverTap.CleverTapPushNotificationClicked, event);

      // Handle notification click event here
    });


    //NATIVE DISPLAY - 
    CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (data) => {
      /* consume the event data */
      console.log("Native Display data",JSON.stringify(data))

      if (data){
      const customJson = JSON.parse(data.displayUnits[0].custom_kv.custom_json);
      const newImage = customJson.image_url;
      this.setState({ imageSource: newImage });
      this.setState({ campaign_id: data.displayUnits[0].wzrk_id });
      CleverTap.pushDisplayUnitViewedEventForID(data.displayUnits[0].wzrk_id);

      }

  });

  //INAPP CUSTOM CALLBACK - 
    CleverTap.addListener(CleverTap.CleverTapInAppNotificationButtonTapped, (event) => {
      this._handleCleverTapEvent(CleverTap.CleverTapInAppNotificationButtonTapped, event);
  });


    
    CleverTap.createNotificationChannel("111", "Clever Tap React Native Testing", "CT React Native Testing", 5, true); // The notification channel importance can have any value from 1 to 5. A higher value means a more interruptive notification.
  }


  handleInputChange = (text: string) => {
    this.setState({ inputText: text });
  };
  // componentWillUnmount() {
  //   // Remove the listener when component is unmounted
  //   CleverTap.removeListener(CleverTap.CleverTapInAppNotificationButtonTapped, this._handleCleverTapEvent);
  // }

   _handleCleverTapEvent(eventName, event) {
    console.log('CleverTap Event called - ', eventName, event);
    CleverTap.recordEvent(eventName, event);
  }
  showAlert = () => {
    console.log('Event Pushed - ', this.state.inputText);
    CleverTap.recordEvent(this.state.inputText);
  

    CleverTap.recordEvent(
      'TrainingPush', { 'Product Name': 'Dairy Milk', 'Category': 'Chocolate', 'Amount': 20.00, 'Date': '$D_1719748249' }
    );
  };

  // Function to change the image source
 




  //InApp
  showInapp = () => {
    CleverTap.recordEvent("TrainingInapp");

  }

  nativeclick = () => {
    CleverTap.pushDisplayUnitClickedEventForID(this.state.campaign_id);

  }

  showNativeDisplay = () => {
    CleverTap.recordEvent("Trainingnative");

  }

  showAppInbox = () => {
    CleverTap.showInbox({
      'tabs': ['Offers', 'Promotions'],
      'navBarTitle': 'My App Inbox',
      'navBarTitleColor': '#004080', // Soft blue for title
      'navBarColor': '#FFFFFF', // White for navigation bar
      'inboxBackgroundColor': '#FFFFFF', // Light blue background
      'backButtonColor': '#007BFF', // Green for back button
      'unselectedTabColor': '#6EB5FF', // Light blue for unselected tab
      'selectedTabColor': '#007BFF', // Blue for selected tab
      'selectedTabIndicatorColor': '#003366', // Dark blue for tab indicator
      'noMessageText': 'No message(s)',
      'noMessageTextColor': '#666666' // Gray for no message text
    });
    
  }
  render() {
    const { imageSource } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
       
        <View style={styles.container}>
          {/* Conditional rendering of Image based on state */}
          {imageSource && (
               <TouchableOpacity onPress={this.nativeclick}>
             <Image 
              style={styles.image}
              source={{ uri: imageSource }}
            /></TouchableOpacity>
          

          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              onChangeText={this.handleInputChange}
              value={this.state.inputText}
            />
          </View>

          {/* Buttons to change image source */}
   

          {/* Other buttons and components */}
          <TouchableOpacity style={styles.button} onPress={this.showAlert}>
            <Text style={styles.buttonText}>Push Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showInapp()}>
            <Text style={styles.buttonText}>Show Inapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.showAppInbox()}>
            <Text style={styles.buttonText}>Show App Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>this.showNativeDisplay()}>
            <Text style={styles.buttonText}>Show Native Display</Text>
          </TouchableOpacity>
           </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure content takes full width
    paddingHorizontal: 16,
  },
  image: {
    width: Dimensions.get('window').width - 32, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'cover', // Adjust image to cover the whole area
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderColor: '#E0E5EC',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffA500',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

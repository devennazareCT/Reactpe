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

class HomeScreen extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      inputText: '',
      imageSource: 'https://example.com/default-image.jpg', // Initial image source
      campaign_id: '',
      navigation: '',
      showAdds: '',
      nativedisplaydata: true,
      showImage: false,
      payload: '',
      lower_image: '',
      background_color: '#ff0000',
      banner_text:''

    };
    this.timeoutId = null;
    //  CleverTap.recordEvent("Trainingnative");

  }

  componentDidMount() {
    
    // Code to run on component load
//  CleverTap.recordEvent("apitest");
CleverTap.fetchVariables((err, success) => {
  console.log('fetchVariables result: ', success);
});
CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (data) => {
  console.log("native display data="+JSON.stringify(data))
});
CleverTap.initializeInbox()
// CleverTap.onVariablesChanged((variables) => {
//   console.log('onVariablesChanged: ', variables);
// });
// CleverTap.onValueChanged('theme', (variable) => {
//   console.log('onValueChanged: ', variable);
// });
    //INAPP CUSTOM CALLBACK - 
    CleverTap.addListener(CleverTap.CleverTapInAppNotificationButtonTapped, (event) => {
      this._handleCleverTapEvent(CleverTap.CleverTapInAppNotificationButtonTapped, event);
    });


    let variables = {
      'theme': 'christmas'
    };
   
CleverTap.defineVariables(variables);
CleverTap.syncVariables();

    CleverTap.createNotificationChannel("111", "Clever Tap React Native Testing", "CT React Native Testing", 5, true); // The notification channel importance can have any value from 1 to 5. A higher value means a more interruptive notification.
  }

  gotoProfile = () => {
    this.props.navigation.navigate('Profile');

  }
  handleInputChange = (text: string) => {
    this.setState({ inputText: text });
  };

  _handleCleverTapEvent(eventName, event) {
    console.log('CleverTap Event called = ', event);
    // CleverTap.recordEvent(eventName, event);
    const inappurl = event.navigationurl;


    this.props.navigation.navigate(event.navigationurl);



  }
  componentWillUnmount() {
    // Clear the timeout if the component is unmounted
    clearTimeout(this.timeout);
  }

  showAlert1 = () => {

    // CleverTap.recordEvent("purchase_success");


  }
  showAlert2 = () => {
    CleverTap.recordEvent("first_transaction_campaign");

  }


  showAlert = () => {
CleverTap.recordEvent(this.state.inputText);

    console.log('Event Pushed - ', this.state.inputText);
    // CleverTap.recordEvent("Trainingnative");

    this.props.navigation.navigate('abcd');

    CleverTap.pushInboxNotificationViewedEventForId('1689754480_1723018935');



    CleverTap.recordEvent(this.state.inputText);


    console.log("CT ID  == ", CleverTap.getCleverTapID())




    // CleverTap.recordEvent(
    //   'TrainingPush', { 'Product Name': 'Dairy Milk', 'Category': 'Chocolate', 'Amount': 20.00, 'Date': '$D_1719748249' }
    // );
  };

  // Function to change the image source





  //InApp
  showInapp = () => {
    CleverTap.recordEvent("TrainingInapp");

  }

  nativeclick = () => {
    CleverTap.pushDisplayUnitClickedEventForID(this.state.campaign_id);

    this.props.navigation.navigate(this.state.navigationUrl);


  }

  showNativeDisplay = () => {
 CleverTap.recordEvent("Helloworld");
    // CleverTap.recordEvent("JioNative");

  }
  gotoPE = () => {
    console.log("deven")
    this.props.navigation.navigate('Productexperience');


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

    const { showImage } = this.state;
    const { showAdds, nativedisplaydata } = this.state;


    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <View style={styles.container}>


          <TouchableOpacity onPress={this.nativeclick}>
            <Image
              style={styles.image}
              source={{ uri: this.state.payload }}
            />
         
          </TouchableOpacity>




          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              onChangeText={this.handleInputChange}
              value={this.state.inputText}
            />

            {this.state.lower_image !== '' ? (
              <View>
              <Image
                style={styles.lower_image}
                source={{ uri: this.state.lower_image }}resizeMode="contain" />
                <Text style={{textAlign:'center',color:this.state.background_color,fontWeight:800}}>{this.state.banner_text}</Text>
                </View>
            ) : null}

          </View>

          {/* Buttons to change image source */}


          {/* Other buttons and components */}
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={this.showAlert}>
            <Text style={styles.buttonText}>ABCD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={this.showAlert1}>
            <Text style={styles.buttonText}>Push Event1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={this.showAlert2}>
            <Text style={styles.buttonText}>Push Event2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={() => this.showInapp()}>
            <Text style={styles.buttonText}>Show Inapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={() => this.showAppInbox()}>
            <Text style={styles.buttonText}>Show App Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={() => this.showNativeDisplay()}>
            <Text style={styles.buttonText}>Show Native Display</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={() => this.gotoProfile()}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.background_color }]} onPress={() => this.gotoPE()}>
            <Text style={styles.buttonText}>Product Experience</Text>
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
    width: Dimensions.get('window').width - 30, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'cover', // Adjust image to cover the whole area
    marginBottom: 20,
    borderRadius: 20

  },
  lower_image: {
    width: Dimensions.get('window').width - 30, // Adjust width as needed
    height: 95, // Adjust height as needed
    marginBottom: 1,
    marginTop: 20,
    borderRadius: 20,
    
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

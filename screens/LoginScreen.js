import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ScrollView, Image ,Button} from 'react-native';
import LottieView from 'lottie-react-native';
import notifee from '@notifee/react-native';
import { AndroidColor } from '@notifee/react-native';

const CleverTap = require('clevertap-react-native');

interface LoginProps {
  navigation: any;
}

interface LoginState {
  email: string;
  identity: string;
  selectedOption: string;
}

class LoginScreen extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      identity: '',
      app_theme: '',
      section_visibility:true,
      selectedOption: 'Platinum', // Default selected option
      login_banner: 'https://static.vecteezy.com/system/resources/previews/017/218/014/non_2x/3d-business-idea-for-money-banking-financial-concept-free-png.png'
    };
  }

  componentDidMount() {
    // CleverTap related setup
    CleverTap.recordEvent("ctlogin");
    CleverTap.createNotificationChannelWithSound("111", "Clever Tap React Native Testing", "CT React Native Testing", 5, true, "bing.mp3");
    CleverTap.createNotificationChannelWithSound("222", "Clever Tap React Native Testing 2 ", "CT React Native Testing 2 ", 5, true, "bing2.mp3");

    CleverTap.setDebugLevel(3);
    let variables = { 'login_banner': 'reactnative_var_string_value' };
    let theme = { 'theme': 'default' };
    CleverTap.recordEvent("ctlogin", { "campaign_name": "first" });

    CleverTap.recordEvent("ctlogin", { "campaign_name": "second" });
    // 2000 milliseconds = 2 seconds
    CleverTap.recordEvent("abcd1", { "campaign_name": "second" });
    CleverTap.recordEvent("abcd2", { "campaign_name": "second" });

    CleverTap.recordEvent("abcd3", { "campaign_name": "second" });

    CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (data) => {
      JSON.stringify("STRING NATIVE"+data)
  });
    // CleverTap.getAllDisplayUnits((err, res) => {
    //   console.log('All Display Units: ', res, err);
    // });
    CleverTap.defineVariables(theme);
    CleverTap.getCleverTapID((err, res) => {
      if (err) console.error("Error getting CleverTap IDDD", err);
      else console.log("CT ID  == ", res);
    });
    // const props = {
    //   Identity: "22142421", "MSG-sms": true, active_task_names: "Task1,Task2,Task3,Task9",Name:"deven",customer_type:"gold"
    // };
    // CleverTap.onUserLogin(props);
    CleverTap.enableDeviceNetworkInfoReporting(true);
    CleverTap.syncVariables();
    // CleverTap.recordEvent("WebTesting");
    CleverTap.fetchVariables((err, success) => console.log('fetchVariables result: ', success, err));
    CleverTap.onValueChanged('login_banner', (variable) => this.setState({ login_banner: variable.login_banner }));
    // r
   


    CleverTap.onValueChanged('theme', (variable) => this.setState({ app_theme: variable.theme }));



    CleverTap.getVariable('icons', (err, variable) => {
      console.log("testabcd"+variable);
      console.log(""+err);

    });

    CleverTap.getVariable('section_visibility', (err, variable) => {
      console.log("Visibility is"+variable);
      console.log(""+err);

    });

    console.log("test")
//  CleverTap.recordEvent("apitest");
// CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (data) => {
//   console.log("native display data="+JSON.stringify(data))
// });
CleverTap.getAllDisplayUnits((err, res) => {
  console.log('All Display Units: --- UNITS', res, err);
});
  }
  


handleEmailChange = (text: string) => this.setState({ email: text });
handleIdentityChange = (text: string) => this.setState({ identity: text });
handleOptionSelect = (option: string) => this.setState({ selectedOption: option });
handleLogin = () => {
  const { email, identity, selectedOption } = this.state;
  const props = {
    Identity: identity, Email: email, customer_type: selectedOption, "MSG-sms": true, active_task_names: "Task1,Task2,Task3,Task9", Gender: "Male", signup30days:selectedOption
  };

  CleverTap.onUserLogin(props);
  CleverTap.recordEvent("ctlogin", { "campaign_name": "second" });

  CleverTap.onValueChanged('theme', (variable) => this.setState({ app_theme: variable.theme }));
  // CleverTap.onValueChanged('theme', (variable) => console.log("theme data is" + JSON.stringify(variable)));

  this.props.navigation.navigate('Home');
  console.log("USER IS "+selectedOption)
};


displayNotification = async () => {
  // Request permissions (iOS only)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: '111',
    name: 'Default Channel',
    importance: 4,
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Hello!',
    body: 'This is a test notification.',
    android: {
      channelId,
      // Set a notification sound, vibration, etc. here if needed
    },
  });
};

render() {
  const { selectedOption, app_theme } = this.state;

  return (
    <View style={styles.wrapper}>
      {/* Snowflake animation */}
      <Text>{this.state.app_theme}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>


          {app_theme === 'winter' ? (
            <LottieView
              source={require('./snow.json')}
              autoPlay
              loop
              style={styles.lottieBackground}
            />
          ) : app_theme === 'christmas' ? (
            <LottieView
              source={require('./christmas.json')}
              autoPlay
              loop
              style={styles.lottieBackground}
            />
          ) : null}
        <Button title="Show Notification" onPress={this.displayNotification} />


          <Image
            style={styles.image}
            source={{ uri: 'https://i.pinimg.com/originals/82/1a/16/821a16e9753b2b941954915b64ce2e1e.png' }}
          />
          <Text style={styles.title}>Welcome</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={this.handleEmailChange}
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Identity"
              onChangeText={this.handleIdentityChange}
              value={this.state.identity}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.option} onPress={() => this.handleOptionSelect('yes')}>
              <View style={[styles.checkbox, selectedOption === 'Yes' && styles.selectedCheckbox]}>
                {selectedOption === 'Yes' && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.optionText}>New User</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => this.handleOptionSelect('No')}>
              <View style={[styles.checkbox, selectedOption === 'No' && styles.selectedCheckbox]}>
                {selectedOption === 'No' && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.optionText}>Old User</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: this.state.login_banner }}
          style={styles.image}
        />
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  lottieBackground: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 1000,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Make it transparent to show the animation behind
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedCheckbox: {
    borderColor: '#ffA500',
  },
  innerCheckbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffA500',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EE4B2B',
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
  image: {
    width: Dimensions.get('window').width - 10,
    height: 180,
    marginBottom: 20,
  }
});

export default LoginScreen;

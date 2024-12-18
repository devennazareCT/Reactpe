import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
const CleverTap = require('clevertap-react-native');

interface LoginProps {
  navigation: any;
}

interface LoginState {
  email: string;
  identity: string;
  selectedOption: string;
}

class Profile extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      name:'',
      email: '',
      identity: '',
      selectedOption: 'Platinum', // Default selected option
    };
  }

  handleEmailChange = (text: string) => {
    this.setState({ email: text });
  };

  handleIdentityChange = (text: string) => {
    this.setState({ identity: text });
  };
  handleNamechange = (text: string) => {
    this.setState({ name: text });
  };

  componentDidMount() {

    var pname =   CleverTap.profileGetProperty("Name")


    CleverTap.getCleverTapID((err, res) => {
        if (err) {
          console.error("Error getting CleverTap IDDD", err);
        } else {
          console.log("CT ID  == ", res);
        }
      });

      CleverTap.profileGetProperty('Name', (err, res) => {
        console.log('CleverTap Profile Name: ', res, err);
        this.setState({ name: res });
      });
      CleverTap.profileGetProperty('Email', (err, res) => {
        console.log('CleverTap Profile Name: ', res, err);
        this.setState({ email: res });
      });
      CleverTap.profileGetProperty('Identity', (err, res) => {
        console.log('CleverTap Profile Name: ', res, err);
        this.setState({ identity: res });
      });
      CleverTap.profileGetProperty('Customer Type', (err, res) => {
        console.log('CleverTap Profile Name: ', res, err);
        this.setState({ selectedOption: res });
      });




  }

  handleLogin = () => {
    const { email, identity, selectedOption } = this.state;

    const myStuff = ['bag', 'shoes'];
    const props = {
      Name: this.state.name, // String
      Identity: identity, // String or number
      Email: email, // Email address of the user
      Gender: 'M', // Can be either M or F
      DOB: new Date('1992-12-22T06:35:31'), // Date of Birth. Set the Date object to the appropriate value first
      'MSG-email': true, // Disable email notifications
      'MSG-push': false, // Enable push notifications
      'MSG-sms': false, // Disable SMS notifications
      'MSG-whatsapp': true, // Enable WhatsApp notifications
      'Customer Type':this.state.selectedOption,
      'first_login':true,
      'MSG-push-all':false,
      Stuff: myStuff, // Array of Strings for user properties,
      'first_login':false
      
    };
    console.log("Details are "+this.state.name,identity,email)
    // Pass the object directly instead of stringifying it
    CleverTap.profileSet(props)

    Alert.alert("Profile Updated")


    // this.props.navigation.navigate('Home');
  };

  handleOptionSelect = (option: string) => {
    this.setState({ selectedOption: option }, () => {
      console.log('Selected option:', this.state.selectedOption);
    });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Profile</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Name'
              onChangeText={this.handleNamechange}
              value={this.state.name}
      
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={this.handleEmailChange}
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
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
            
            <TouchableOpacity style={styles.option} onPress={() => this.handleOptionSelect('Platinum')}>
              <View style={[styles.checkbox, selectedOption === 'Platinum' && styles.selectedCheckbox]}>
                {selectedOption === 'Platinum' && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.optionText}>Platinum</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => this.handleOptionSelect('Gold')}>
              <View style={[styles.checkbox, selectedOption === 'Gold' && styles.selectedCheckbox]}>
                {selectedOption === 'Gold' && <View style={styles.innerCheckbox} />}
              </View>
              <Text style={styles.optionText}>Gold</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Update Profile</Text>
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
});

export default Profile;

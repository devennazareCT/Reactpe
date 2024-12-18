import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity,Linking} from 'react-native';
const CleverTap = require('clevertap-react-native');

interface peprops {
  navigation: any;
}
const { width } = Dimensions.get('window');

export default class LayoutVariantB extends Component<peprops> {
  constructor(props: peprops) {
    super(props);
    this.state = {
      email: '',
      identity: '',
      banners: [],  // Store the banners data here
      icons: [],
      selectedOption: 'Platinum', // Default selected option,
      enable: false,  // Whether to show the text or not
      text: '',       // The text content
      color: '#000',  // Default color
      size: 14,
      buttons: [],  // Store the buttons data here
      flat_banner:''

    };
  }

  componentDidMount() {
    console.log("executed")
    let variables = {

      'Home Banner': {
        'banner1': {
          'image_url': 'https://png.pngtree.com/template/20220427/ourmid/pngtree-illustration-online-medicine-consultation-doctor-banner-image_1257098.jpg',
          'enable': true,
          'position': 1,
          'dimensions':"200px"
        },
        'banner2': {
          'image_url': 'https://png.pngtree.com/template/20220427/ourmid/pngtree-vector-illustration-online-consultation-doctor-banner-image_1257185.jpg',
          'enable': true,
          'position': 2
        },
        'banner3':
        {
          'image_url': 'https://png.pngtree.com/png-clipart/20220430/original/pngtree-atherosclerosis-is-treated-by-tiny-doctors-banner-png-image_7611524.png',
          'enable': true,
          'position': 3

        }

      },
      'Home Icons': {

        'icon1': {
          'icon_url': 'https://cdn.iconscout.com/icon/premium/png-512-thumb/url-3327383-2789932.png',
          'enable': true,
          'position': 1
        },
        'icon2': {
          'icon_url': 'https://cdn.iconscout.com/icon/free/png-512/free-call-icon-download-in-svg-png-gif-file-formats--logo-receive-phone-customer-support-pack-people-icons-415046.png',
          'enable': true,
          'position': 2
        },
        'icon3':
        {
          'icon_url': 'https://cdn.iconscout.com/icon/free/png-512/free-support-icon-download-in-svg-png-gif-file-formats--call-logo-service-help-ink-ecommerce-pack-e-commerce-shopping-icons-3112088.png',
          'enable': true,
          'position': 3

        },

        'icon4':
        {
          'icon_url': 'https://cdn.iconscout.com/icon/free/png-512/free-doctor-icon-download-in-svg-png-gif-file-formats--male-medical-staff-frontliner-avatar-frontliners-pack-people-icons-1955462.png',
          'enable': true,
          'position': 4

        },

        'icon5':
        {
          'icon_url': 'https://cdn.iconscout.com/icon/free/png-512/free-ambulance-emoji-icon-download-in-svg-png-gif-file-formats--emergency-vehicle-transportation-emoj-travel-places-twemoji-pack-holidays-icons-30711.png',
          'enable': true,
          'position': 5

        },
        'icon6':
        {
          'icon_url': 'https://cdn.iconscout.com/icon/premium/png-512-thumb/hospital-49-117386.png',
          'enable': true,
          'position': 6

        }


      },
      'Main Text': {
        'Text': 'Welcome',
        'Enable': false,
        'color': '#ffffff',
        'size': '30px'
      },
      'screen_banner': {
        'url': 'https://i.ibb.co/SdjZbcM/Screenshot-2024-11-05-at-12-52-59-PM.png',
        'Enable': false,
       
      },
      'Buttons': {
        'button1':
        {
          'text': 'Hello',
          'url': 'https://www.clevertap.com',
          'color': '#567871',
          'enable':false

        },
        'button2':
        {
          'text': 'Bye',
          'url': 'https://www.clevertap.com',
          'color': '#987651',
          'enable':false


        }
      },

    };
    CleverTap.defineVariables(variables);
    CleverTap.syncVariables();
    CleverTap.getVariable('Home Banner', (err, variable) => {
      // console.log("variable value for key " ,JSON.stringify(variable));
      if (err) {
        console.error("Error fetching variable:", err);
        return;
      }

      // Parse the banners
      const bannersArray = this.parseBanners(variable);

      // Set the state with filtered and sorted banners
      this.setState({ banners: bannersArray });
    });
    CleverTap.getVariable('Home Icons', (err, variable) => {
      // console.log("variable value for key ",err ,JSON.stringify(variable));
      const iconsArray = this.parseIcons(variable);

      // Set the state with filtered and sorted icons
      this.setState({ icons: iconsArray });
    });

    CleverTap.getVariable('Main Text', (err, variable) => {
      console.log("variable value for key ", err, JSON.stringify(variable));
      if (err) {
        console.error("Error fetching variable:", err);
        return;
      }

      // Update the state with the fetched variable
      this.parseTextVariable(variable);

    });
    CleverTap.getVariable('screen_banner', (err, variable) => {
      console.log("variable value for key ", err, JSON.stringify(variable.url));
      if (err) {
        console.error("Error fetching variable:", err);
        return;
      }

      // Update the state with the fetched variable
      this.setState({
        flat_banner:variable.url
      })

    });
    CleverTap.getVariable('Buttons', (err, variable) => {
      console.log("variable value for key ", err, JSON.stringify(variable));
      if (err) {
        console.error("Error fetching variable:", err);
        return;
      }

      // Parse and set the buttons
      this.parseButtons(variable);

    });
  }
  parseBanners = (variable) => {
    const banners = Object.values(variable)
      .filter(banner => banner.enable) // Filter enabled banners
      .sort((a, b) => a.position - b.position); // Sort by position

    return banners;
  }
  parseIcons = (variable) => {
    const icons = Object.values(variable)
      .filter(icon => icon.enable) // Filter enabled icons
      .sort((a, b) => a.position - b.position); // Sort by position

    return icons;
  }
  parseTextVariable = (variable) => {
    const { Enable, color, Text, size } = variable;

    // Set the state based on the payload values
    this.setState({
      enable: Enable,
      text: Text,
      color: color || '#000',   // Default to black if color is missing
      size: parseInt(size) || 14,  // Parse the size from string, default to 14px
    });
  }
  parseButtons = (variable) => {
    const buttonsArray = Object.values(variable)
      .filter(button => button.enable); // Filter only enabled buttons
    
    this.setState({ buttons: buttonsArray });
  }
  renderButton = (button, index) => {
    return (
      <TouchableOpacity
        key={`button-${index}`}
        style={[styles.button, { backgroundColor: button.color || '#000' }]} // Set background color
        onPress={() => Linking.openURL(button.url)} // Open URL on press
      >
        <Text style={styles.buttonText}>{button.text}</Text>
      </TouchableOpacity>
    );
  }
  renderBannerItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image_url }} // Using image_url to load the image
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }

  renderIconItem = ({ item }) => {
    return (
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: item.icon_url }} // Using icon_url to load the image
          style={styles.icon}
          resizeMode="cover"
        />
      </View>
    );
  }
  render() {
    const { enable, text, color, size } = this.state;
    const { buttons } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.carouselContainer}>
          <FlatList
            data={this.state.banners}
            renderItem={this.renderBannerItem}
            keyExtractor={(item, index) => `banner-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>


        <FlatList
          data={this.state.icons}
          renderItem={this.renderIconItem}
          keyExtractor={(item, index) => `icon-${index}`}
          numColumns={3} // 3 icons per row
          columnWrapperStyle={styles.row} // To style each row
        />



        <Text style={[styles.title, { color: color, fontSize: size }]}> {text}
        </Text>
       
          <View >
           <Image
        source={{ uri: this.state.flat_banner }}
        style={styles.image_banner}
      />
      </View>
        <Text style={styles.subtitle}>Curated Just for You</Text>
        <View>
        {buttons.map(this.renderButton)}</View> 
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
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 24,
    borderColor: '#eee',
    borderWidth: 2,
    padding: 20
  },
  circleImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
    borderWidth: 10,
    borderColor: '#000',

  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    marginTop: 16,

  },
  carouselContainer: {
    height: 200, // Adjust the height based on your design
  },
  imageContainer: {
    width: width, // Full-screen width for each image
    height: 200,  // Adjust the height to match carousel height
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    justifyContent: 'space-between', // Space between icons in each row
    marginBottom: 10, // Add some spacing between rows
  },
  iconContainer: {
    width: (width / 3) - 20, // One-third of the screen width minus padding
    height: 100, // Adjust based on your design
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50, // Make it round
    overflow: 'hidden', // To ensure the image is round
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make the icon round
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,  // Rounded corners
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  image_banner: {
    width: 500,
    height: 400,
    resizeMode: 'contain',
  },
});

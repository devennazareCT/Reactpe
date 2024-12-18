import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity, ScrollView, Linking
} from 'react-native';
const CleverTap = require('clevertap-react-native');
const screenWidth = Dimensions.get('window').width;

interface AppProps { }

interface AppState {
  images: any[]; // State variable to hold image objects
  section_title: string; // State variable to hold the section title
}

class Abcd extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      images: [],
      section_title: 'Must Try',
      banners: [],
      icons: [],
      bottom_banner: '',

      section_visibility: true

    };
  }

  componentDidMount() {
    CleverTap.fetchVariables((err, success) => {
      console.log('fetchVariables result: ', success);
  });
    console.log('Component Mounted');
    this.defineVariables();
    CleverTap.recordEvent('Logged in');

    CleverTap.getVariable('section_visibility', (err, variable) => {
      console.log("Visibility is" + variable);
      this.setState({ section_visibility: variable });
      console.log("" + err);

    });
    CleverTap.getVariable('section_name', (err, variable) => {
      this.setState({ section_title: variable });
    });



    CleverTap.onValueChanged('widgets', (variable) => {
      try {
        if (typeof variable === 'object' && variable !== null && variable.widgets) {
          const widgetsData = variable.widgets;
          const parsedData = JSON.parse(widgetsData);

          if (parsedData.images && Array.isArray(parsedData.images)) {
            this.setState({ images: parsedData.images }); // Store full objects
          }
        }
      } catch (error) {
        console.error('Error handling widgets variable:', error);
      }
    });
    CleverTap.onValueChanged('top_banners', (variable) => {


      if (variable && variable.top_banners) {
        const parsedData = JSON.parse(variable.top_banners);

        const enabledBanners = parsedData.images.filter((banner) => banner.enable === 1);
        this.setState({ banners: enabledBanners });

      }
    });
    CleverTap.onValueChanged('icons', (variable) => {

      try {
        const parsedPayload = JSON.parse(variable?.icons || '{}');
        const enabledIcons = parsedPayload.icons.filter((icon) => icon.enable === 1);
        this.setState({ icons: enabledIcons });
      } catch (error) {
        console.error('Error parsing payload: ', error);
      }
    });
    CleverTap.onValueChanged('bottom_banner', (variable) => {


      this.setState({ bottom_banner: variable.bottom_banner });
      console.log("bottom_banner"+this.state.bottom_banner)

    });
  }
  handleIconPress = (deeplink) => {
    Linking.openURL(deeplink).catch((err) => console.error("Failed to open deep link:", err));
  };
  defineVariables = () => {
    let variables = {
      section_name: 'Must Try',
      section_visibility: true,
      widgets: 'value',
      top_banners: 'default banner',
      icons: 'default icon',
      bottom_banner: 'default banner'
    };
    CleverTap.defineVariables(variables);
    CleverTap.syncVariables();
  };


  handleImagePress = (text: string, image_url: string) => {

    this.props.navigation.navigate('Buy Now', {
      key1: text,
      key2: image_url,
    });
  };

  renderImageItem = ({ item }: { item: { image_url: string; text: string } }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => this.handleImagePress(item.text, item.image_url)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );

  render() {
    const { images } = this.state;
    const { banners } = this.state;
    const { icons } = this.state;

    // Sort images by priority
    const sortedImages = images.sort((a, b) => a.priority - b.priority);

    if (images.length === 2) {
      // Render L-shaped layout
      const lShapeImage = sortedImages[0];
      const smallImage = sortedImages[1];

      return (
        <View style={styles.container}>
          <ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>

              {banners.map((banner, index) => (
                <TouchableOpacity key={index} onPress={() => this.handleBannerPress(banner.deeplink)}>
                  <Image source={{ uri: banner.image_url }} style={styles.bannerImage} resizeMode="contain" />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.centerContainer}>
              <ScrollView horizontal contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
                {icons.map((icon, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (icon.deeplink) {

                      }
                    }}
                  >
                    <View style={styles.iconWrapper}>
                      <Image
                        source={{ uri: icon.icon_url || icon.image_url }}
                        style={styles.iconStyle}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View>
            {this.state.section_visibility ? (
            <Text style={styles.headerText}>
           
              ──────────  {this.state.section_title}  ──────────
  
            </Text>):(<Text></Text>)}
                     
            </View>
            {this.state.section_visibility ? (

            <View style={styles.lShapeContainer}>
              <TouchableOpacity
                onPress={() => this.handleImagePress(lShapeImage.text, lShapeImage['l-shaped'])}
              >
                <Image
                  source={{ uri: lShapeImage['l-shaped'] }}
                  style={styles.lShapeImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.handleImagePress(smallImage.text, smallImage.image_url)}
              >
                <Image
                  source={{ uri: smallImage.image_url }}
                  style={styles.smallImage}
                />

              </TouchableOpacity>

            </View> ) : (
              <Text style={styles.placeholderText}>No offers available</Text>
            )}
            <View style={styles.bottom_container}>
              <Text style={styles.headerText}>
                ──────────   For you ──────────
              </Text>
              <Image
                source={{ uri: this.state.bottom_banner }}
                style={styles.banner}
                resizeMode="contain" // Ensures the image fully covers the area with correct aspect ratio
              />
            </View>
           
          </ScrollView>
        </View>

      );
    }

    // Render grid layout for 4 images
    return (
      <View style={styles.container}>
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>

            {banners.map((banner, index) => (
              <TouchableOpacity key={index} onPress={() => this.handleBannerPress(banner.deeplink)}>
                <Image source={{ uri: banner.image_url }} style={styles.bannerImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
            {icons.map((icon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (icon.deeplink) {
                    console.log('Navigating to deeplink:', icon.deeplink);
                  }
                }}
              >
                <View style={styles.iconWrapper}>
                  <Image
                    source={{ uri: icon.icon_url || icon.image_url }}
                    style={styles.iconStyle}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.headerText}>
            ─────── {this.state.section_title} ───────
          </Text>
          {images.length > 0 && this.state.section_visibility ? (
            <FlatList
              data={images}
              renderItem={this.renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={styles.gridContainer}
            />
          ) : (
            <Text style={styles.placeholderText}>No offers available</Text>
          )}
          <View style={styles.bottom_container}>
            <Text style={styles.headerText}>
              ──────────   For you  ──────────
            </Text>
            <Image
              source={{ uri: this.state.bottom_banner }}
              style={styles.banner}
              resizeMode="contain" // Ensures the image fully covers the area with correct aspect ratio
            />
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#f0f0f0',
    fontSize: 16,
  },
  gridContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 4

  },
  imageContainer: {
    width: 160,
    margin: 4,
    alignItems: 'center',
    overflow: 'hidden', borderRadius: 2

  },
  image: {
    width: '100%',
    height: 220, borderColor: "#12312", borderWidth: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  lShapeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16, height: 310,
    left: 50
  },
  lShapeImage: {
    width: (Dimensions.get('window').width * 2) / 3,
    height: 270,
    borderRadius: 10,
    overflow: 'hidden', shadowColor: '#000'
  },
  smallImage: {
    width: (Dimensions.get('window').width * 1) / 3 - 10,
    height: 210,
    marginLeft: 8,
    borderRadius: 10,
    top: -160,
    overflow: 'hidden',
  },
  bannerContainer: {
    height: 180,
    backgroundColor: '#ffffff',
  },
  bannerImage: {
    width: 380,
    height: 140,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  }, iconStyle: {
    width: 60,
    height: 60,
    borderRadius: 30, // Makes the icon rounded
    marginHorizontal: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18, // Adds padding inside the icon wrapper
    // Optional: background color for padding visibility
    borderRadius: 40, // Matches the shape of the rounded icon
  },
  iconStyle: {
    width: 50,
    height: 50,
    borderRadius: 30, // Makes the icon rounded
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, bottom_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Optional background color for better contrast
    borderRadius: 15
    // Ensures the image respects the rounded corners
  },
  banner: {
    width: screenWidth * 0.9, // 90% of screen width
    height: screenWidth * 0.5, // Adjust height proportionally
    borderRadius: 55, // Rounded corners for the image
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default Abcd;

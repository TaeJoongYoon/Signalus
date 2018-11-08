import React, { Component } from 'react';
// Elements
import {
  View, WebView
} from 'react-native';
// Strings
import {
  HeaderConsentTerms, HeaderConsentPrivate, HeaderConsentTermsofGeo, HeaderConsentMarketing
} from '../constants/string';
import { Terms, Private, TermsofGeo, Marketing } from '../constants/html'


class ConsentHTMLScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    let header;
    switch(navigation.getParam('item')){
      case "Terms":
        header = HeaderConsentTerms
        break;
      case "Private":
        header = HeaderConsentPrivate
        break;
      case "TermsofGeo":
        header = HeaderConsentTermsofGeo
        break;
      case "Marketing":
        header = HeaderConsentMarketing
        break;
    }
    return{
    title: header
  }};

  constructor(props){
    super(props)
    this.state= {
    }
  }

  // LifeCyle
  render(){
    const { navigation } = this.props;
    switch(navigation.getParam('item')){
      case "Terms":
        return(
          <WebView
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{html: Terms}}
            useWebKit={true}
          />
        );

      case "Private":
        return(
          <WebView
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{html: Private}}
            useWebKit={true}
          />
        );
     
      case "TermsofGeo":
        return(
          <WebView
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{html: TermsofGeo}}
            useWebKit={true}
          />
        );
      
      case "Marketing":
        return(
          <WebView
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{html: Marketing}}
            useWebKit={true}
          />
        );
    }
  }
}

export default ConsentHTMLScreen;
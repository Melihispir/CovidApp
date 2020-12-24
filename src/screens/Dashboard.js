import React from 'react'
import axios from 'axios';
import { Notifications, Permissions } from "expo";

import { StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView,Button } from 'react-native';
import { logoutUser } from "../api/auth-api";
export default class corona extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      country: '',
      deaths: '',
      countryflag: '',
      country: '',
      cases: '',
      active: '',
      recovered: '',
      todayCases: '',
      todayDeaths: ''
    }

  }
  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };
  sendNotificationImmediately = async () => {
      var vakaSayisi =" "+this.state.todayCases;
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: "günlük vaka sayısı",
      body: vakaSayisi
    });
    console.log(notificationId); 
  };

  setCountry(text) {
    this.setState({
      value: text
    })
  }

  componentDidMount() {
    this.COVID_19()
  }

  COVID_19 = (value) => {
    axios.get(`https://disease.sh/v3/covid-19/countries/${value}?yesterday=false&twoDaysAgo=false&strict=false`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          deaths: response.data.deaths,
          countryflag: response.data.countryInfo.flag,
          country: response.data.country,
          cases: response.data.cases,
          active: response.data.active,
          recovered: response.data.recovered,
          todayCases: response.data.todayCases,
          todayDeaths: response.data.todayDeaths
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
   
  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#3B318E' }}>
        <View style={styles.top}>
          <ScrollView>
            <View style={{ marginTop: 25, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.country}</Text>
                <Text style={styles.boxtext}>Country</Text>
              </View>

              <View style={styles.box}>
                <Image style={{ width: 100, height: 50 }}
                  source={{ uri: this.state.countryflag }} />
                <Text style={styles.boxtext}>Flag </Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.cases}</Text>
                <Text style={styles.boxtext}>Cases</Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.active}</Text>
                <Text style={styles.boxtext}>Active</Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.deaths}</Text>
                <Text style={styles.boxtext}>Deaths</Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.recovered}</Text>
                <Text style={styles.boxtext}>Recovered</Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.todayDeaths}</Text>
                <Text style={styles.boxtext}>Today Deaths</Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.boxtext_res}>{this.state.todayCases}</Text>
                <Text style={styles.boxtext}>Today Cases</Text>
              </View>
            </View>
          </ScrollView>
          <Button mode="outlined" title ="logout" onPress={() => logoutUser()}>
            
    </Button>
      <Button mode="outlined" title ="bildirim" onPress={() => this.sendNotificationImmediately()}>
      </Button>
        </View>

        <View style={styles.bottom}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setCountry(text)}
            placeholder="Country eg. India"
            placeholderTextColor="#ebe6e6"
          />
          <TouchableOpacity style={styles.btn} onPress={() => this.COVID_19(this.state.value)}>
            <Text style={{ color: "white", fontSize: 25 }}>Fetch Data</Text>
          </TouchableOpacity>
        

        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 2.5,
    backgroundColor: '#F6820D',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btn: {
    backgroundColor: '#F6820D',
    padding: 13,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  input: {
    width: 320,
    marginVertical: 15,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 25,
    borderStyle: 'solid',
    borderColor: '#F6820D',
    borderBottomWidth: 1
  },
  box: {
    backgroundColor: '#E0E2EB',
    width: 160,
    height: 100,
    marginBottom: 25,
    justifyContent: 'space-evenly',
    borderRadius: 5,
    alignItems: 'center',
  },
  boxtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d132c'
  },
  boxtext_res: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#464159'
  },
});
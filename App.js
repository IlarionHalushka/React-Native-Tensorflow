/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// // import tf from '@tensorflow/tfjs';
// // import mobilenet from '@tensorflow-models/mobilenet';
// import jpeg from 'jpeg-js';
// import antImage from './assets/ant.jpg';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// const NUMBER_OF_CHANNELS = 3;
//
// export default class App extends Component<Props> {
//   imageByteArray = (image, numChannels) => {
//     const pixels = image.data;
//     const numPixels = image.width * image.height;
//     const values = new Int32Array(numPixels * numChannels);
//
//     for (let i = 0; i < numPixels; i++) {
//       for (let channel = 0; channel < numChannels; ++channel) {
//         values[i * numChannels + channel] = pixels[i * 4 + channel];
//       }
//     }
//
//     return values;
//   }
//
//   imageToInput = (image, numChannels) => {
//     const values = this.imageByteArray(image, numChannels);
//     const outShape = [image.height, image.width, numChannels];
//     return tf.tensor3d(values, outShape, 'int32');
//   }
//
//   loadModel = async () => {
//     const mn = new mobilenet.MobileNet(1, 1);
//     mn.path = `file://assets/model.json`;
//     await mn.load();
//     return mn;
//   }
//
//   classify = async () => {
//     console.time();
//     const image = antImage;
//     const input = this.imageToInput(image, NUMBER_OF_CHANNELS);
//
//     const mn_model = await this.loadModel();
//
//     const predictions = await mn_model.classify(input);
//     console.timeEnd();
//
//     console.log('classification results:', predictions);
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity onPress={this.classify} placeholder="CLASSIFY"></TouchableOpacity>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Runtf from './src/components/run-tf';
import * as tf from '@tensorflow/tfjs';
import localModel from './src/tfmodel/model.json';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};
const path = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
const localPath = 'src/tfmodel/model.json';
export default class App extends Component<Props> {
  componentDidMount() {}

  async loadmodel(p) {
    const model = await this.loadHostedPretrainedModel(p);
    console.log(model);
  }

  async loadHostedPretrainedModel(p) {
    try {
      const loader = {
        load: async () => {
          return {
            modelTopology: localModel.modelTopology,
            weightSpecs: localModel.weightsManifest,
            weightData: localModel.weightsManifest,
            weightsManifest: localModel.weightsManifest,
          };
        }
      };

      const model = await tf.loadLayersModel(loader);
      // const model = await tf.loadModel(p);
      return model;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Runtf />
        <View style={styles.loadmodelbuttons}>
          <Button
            title="Load local Model"
            onPress={() => {
              this.loadmodel(localPath);
            }}
          />
          <Button
            title="Load url Model"
            onPress={() => {
              this.loadmodel(path);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  loadmodelbuttons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

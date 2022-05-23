/*
modification history
--------------------
01a,23may2022,deepankar created
*/

import React, { Component, createRef } from 'react';
import Dropdown from '../components/dropdown';
import Button from '../components/button';

export default class Covid19 extends Component {
  constructor(props){
    super(props);

    this.state = {
      stream:        null,
      videoDeviceId: null,
      cameraFacing:  'user',
      videoDevices:  [],
    };

    this.$video = createRef();
    this.isLandscape = false;

    this.listVideoDevices = this.listVideoDevices.bind(this);
    this.changeVideoCamera = this.changeVideoCamera.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.startCamera = this.startCamera.bind(this);
    this.stopCamera = this.stopCamera.bind(this);
  }

  async componentDidMount(){
    let videoDevices = await this.listVideoDevices();
    if (!videoDevices.some((d) => d.id)){
      await navigator.mediaDevices.getUserMedia({ video: true })
        .catch((err) => {
          if (err.message.includes('denied')){
            // show msg to user
            // to allow access to camera
            // return;
          }

          // show oops error message
        });
      videoDevices = await this.listVideoDevices();
    }

    this.isLandscape = window.innerHeight / window.innerWidth < 1;
    this.setState({ videoDevices, videoDeviceId: videoDevices[0].id });
  }

  // eslint-disable-next-line class-methods-use-this
  listVideoDevices(){
    return navigator.mediaDevices.enumerateDevices()
      .then((devices) => (
        devices
          .filter((d) => d.kind === 'videoinput')
          .map((d) => ({ label: d.label, id: d.deviceId }))
      ));
  }

  changeVideoCamera(e){
    this.setState({ videoDeviceId: e.currentTarget.dataset.id }, this.startCamera);
  }

  startCamera(){
    const { videoDeviceId, cameraFacing } = this.state;
    const constraints = {
      video: {
        deviceId:   videoDeviceId,
        facingMode: cameraFacing
      }
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (this.$video.current && stream.getVideoTracks().length){
        this.setState({ stream }, this.playVideo);
      }
    });
  }

  playVideo(){
    const { stream } = this.state;

    this.$video.current.srcObject = stream;
    this.$video.current.play();
  }

  stopCamera(){
    const { stream } = this.state;

    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  render(){
    const { videoDevices, videoDeviceId } = this.state;

    return (
      <main className="page page--camera dark dark-theme is-size-7-mobile">
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <header className="hero-head section">
            <h3 className="title is-4">Select a video device and use it as mirror</h3>
            <div className="buttons is-pulled-right">
              <Dropdown selectedItemId={videoDeviceId} items={videoDevices} className="mr-2" />
              <Button className="is-info" label="Open Camera" onClick={this.startCamera} />
              <Button className="is-warning" label="Close Camera" onClick={this.stopCamera} />
            </div>
          </header>
          <main className="hero-body is-align-items-baseline">
            <section className="container">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <figure className={`image has-background-black ${this.isLandscape ? 'is-16by9' : 'is-9by16'}`}>
                <video
                  id="video-cam-player"
                  className="video has-ratio"
                  ref={this.$video}
                  controls={false}
                  autoPlay
                  muted
                />
              </figure>
            </section>
          </main>
        </section>
      </main>
    );
  }
}

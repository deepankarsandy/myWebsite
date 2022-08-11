/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import EventEmitter from '../lib/event_emitter';

import Button from '../components/button';
import ChatService from '../helpers/chat_service';
import isEmpty from '../helpers/isEmpty';

export default class ChatRooms extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      msg:       '',
      channelId: '',
      name:      '',
      channel:   {},
    };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.send = this.send.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);

    EventEmitter.on('NEW_MESSAGE', this.onNewMessage);
    EventEmitter.on('CHANNEL_CREATED', (channel) => {
      this.setState({ channel });
    });
  }

  componentDidMount(){
    ChatService.init();
  }

  onNewMessage(){
    this.forceUpdate();
  }

  onKeyPress(e){
    const { key, shiftKey } = e;

    if ((key === 'Enter' && !shiftKey) || (key === 'Enter' && shiftKey)){
      e.preventDefault();
      this.send();
    }
  }

  send(){
    const { msg, channel } = this.state;

    ChatService.send(channel.id, msg);

    this.setState({ msg: '' });

    setTimeout(() => {
      this.forceUpdate();
    }, 1000);
  }

  joinChannel(){
    const { channelId, name } = this.state;

    ChatService.joinChannel(channelId, { name });
  }

  render(){
    const {
      msg, channel, channelId, name
    } = this.state;

    return (
      <main className="page page--chat-rooms">
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <main className="hero-body">
            {isEmpty(channel) ? (
              <div>
                <input
                  type="text"
                  className="text input field"
                  onChange={({ target: { value } }) => this.setState({ channelId: value })}
                  value={channelId}
                  placeholder="Channel ID"
                />
                <input
                  type="text"
                  className="text input field"
                  onChange={({ target: { value } }) => this.setState({ name: value })}
                  value={name}
                  placeholder="Name"
                />
                <Button
                  label="Create Channel"
                  className=""
                  onClick={this.joinChannel}
                  disabled={!channelId || !name}
                />
              </div>
            ) : (
              <section className="chat-box section">
                <div className="chats">
                  {ChatService.messages(channel.id).map((message, i) => (
                    <div key={i} className="content">
                      <div className="subtitle is-6 mb-1">{message.text}</div>
                      <div className="subtitle is-7 has-text-grey mr-4">
                        <span className="mr-4">{message.userName}</span>
                        <span>{dayjs(message.createdAt).format('hh:mmA')}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="is-flex is-vcentered">
                  <input
                    type="text"
                    className="text input field mr-2"
                    onChange={({ target: { value } }) => this.setState({ msg: value })}
                    value={msg}
                    placeholder="Type your message"
                    onKeyPress={this.onKeyPress}
                  />
                  <Button
                    label="Send"
                    className=""
                    onClick={this.send}
                    disabled={!msg}
                  />
                </div>
              </section>
            )}
          </main>
        </section>
      </main>
    );
  }
}
